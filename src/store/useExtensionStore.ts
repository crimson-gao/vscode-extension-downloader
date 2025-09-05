import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { searchExtension } from '../services/api';
import { AppState, Architecture, ExtensionVersion } from '../types';
import { detectUserArchitecture } from '../utils/architectureDetector';

interface ExtensionStore extends AppState {
  // Actions
  setSearchInput: (input: string) => void;
  setSelectedArchitecture: (architecture: Architecture) => void;
  setSelectedVersion: (version: string) => void;
  searchExtensionById: (extensionId: string) => Promise<void>;
  clearError: () => void;
  reset: () => void;
}

const getMatchVersions = (versions: ExtensionVersion[], architecture: Architecture) => {
  if (architecture === 'universal') {
    return versions.filter(version =>
      !version.targetPlatform || version.targetPlatform === 'universal'
    );
  }
  return versions.filter(version =>
    version.targetPlatform === architecture
  );
};

const detectedArchitecture = await detectUserArchitecture();

export const useExtensionStore = create<ExtensionStore>()(
  devtools(
    (set) => ({
      // Initialize with default values, will be updated async
      extension: null,
      loading: false,
      error: null,
      searchInput: '',
      selectedArchitecture: 'universal', // Default fallback
      selectedVersion: '',
      availableArchitectures: [],
      availableVersions: new Map<Architecture, ExtensionVersion[]>(),

      setSearchInput: (input: string) => {
        set({ searchInput: input, error: null });
      },

      setSelectedArchitecture: (architecture: Architecture) => {
        set((state) => {
          // 当架构改变时，计算该架构的最新版本
          let newVersion = '';
          if (state.extension) {
            const filteredVersions = getMatchVersions(state.extension.versions, architecture);

            if (filteredVersions.length > 0) {
              newVersion = filteredVersions[0].version;
            }
          }

          return {
            selectedArchitecture: architecture,
            selectedVersion: newVersion
          };
        });
      },

      setSelectedVersion: (version: string) => {
        set({ selectedVersion: version });
      },

      searchExtensionById: async (extensionId: string) => {
        if (!extensionId.trim()) {
          set({ error: 'Please enter a valid extension ID or URL' });
          return;
        }

        set({ loading: true, error: null, extension: null });

        try {
          const extension = await searchExtension(extensionId.trim());

          if (!extension) {
            set({
              loading: false,
              error: 'Extension not found. Please check the extension ID or URL.'
            });
            return;
          }
          const availableVersions = new Map<Architecture, ExtensionVersion[]>();
          extension.versions.forEach(version => {
            const targetPlatform = (version.targetPlatform ?? 'universal') as Architecture;
            if (!availableVersions.has(targetPlatform)) {
              availableVersions.set(targetPlatform, []);
            }
            availableVersions.get(targetPlatform)?.push(version);
          });

          const archs = Array.from(availableVersions.keys());
          archs.sort((a, b) => {
            // Put universal first
            if (a === 'universal') return -1;
            if (b === 'universal') return 1;
            // Then sort alphabetically
            return a.localeCompare(b);
          });

          set(() => {
            const isdetectedArchAvaiable = archs.includes(detectedArchitecture);
            const initArchitecture = isdetectedArchAvaiable ? detectedArchitecture : (archs.length > 0 ? archs[0] : 'universal');
            let initialVersion = '';
            const filteredVersions = getMatchVersions(availableVersions.get(initArchitecture) ?? [], initArchitecture);

            if (filteredVersions.length > 0) {
              initialVersion = filteredVersions[0].version;
            }

            return {
              loading: false,
              extension: extension,
              searchInput: extensionId.trim(),
              selectedArchitecture: initArchitecture,
              selectedVersion: initialVersion,
              availableArchitectures: archs,
              availableVersions: availableVersions
            };
          });
        } catch (error) {
          console.error('Search error:', error);
          set({
            loading: false,
            error: error instanceof Error ? error.message : 'Failed to search extension'
          });
        }
      },


      clearError: () => {
        set({ error: null });
      },

      reset: () => {
        set({
          extension: null,
          loading: false,
          error: null,
          searchInput: '',
          selectedVersion: '',
          availableArchitectures: [],
          availableVersions: new Map<Architecture, ExtensionVersion[]>(),
        });
      },

    }),
    {
      name: 'extension-store',
    }
  )
);
