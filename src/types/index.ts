export interface ExtensionVersion {
  version: string;
  targetPlatform?: string;
  flags: string;
  lastUpdated: string;
  files: ExtensionFile[];
  assetUri: string;
  fallbackAssetUri: string;
}

export interface ExtensionFile {
  assetType: string;
  source: string;
}

export interface Publisher {
  publisherId: string;
  publisherName: string;
  displayName: string;
  flags: string;
  domain?: string;
  isDomainVerified?: boolean;
}

export interface InstallationTarget {
  target: string;
  targetVersion: string;
}

export interface Extension {
  publisher: Publisher;
  extensionId: string;
  extensionName: string;
  displayName: string;
  flags: string;
  lastUpdated: string;
  publishedDate: string;
  releaseDate: string;
  shortDescription: string;
  versions: ExtensionVersion[];
  categories: string[];
  tags: string[];
  installationTargets: InstallationTarget[];
  deploymentType: number;
  statistics?: ExtensionStatistic[];
}

export interface ExtensionStatistic {
  statisticName: string;
  value: number;
}

export interface VSCodeMarketplaceResponse {
  results: Array<{
    extensions: Extension[];
    pagingToken?: string;
    resultMetadata: Array<{
      metadataType: string;
      metadataItems: Array<{
        name: string;
        count: number;
      }>;
    }>;
  }>;
}

export interface ExtensionQuery {
  assetTypes: string[] | null;
  filters: Array<{
    criteria: Array<{
      filterType: number;
      value: string;
    }>;
    direction: number;
    pageSize: number;
    pageNumber: number;
    sortBy: number;
    sortOrder: number;
    pagingToken?: string | null;
  }>;
  flags: number;
}

export type Architecture =
  | 'win32-x64'
  | 'win32-ia32'
  | 'win32-arm64'
  | 'linux-x64'
  | 'linux-arm64'
  | 'linux-armhf'
  | 'darwin-x64'
  | 'darwin-arm64'
  | 'alpine-x64'
  | 'alpine-arm64'
  | 'universal'
  | 'web';

export interface ArchitectureOption {
  value: Architecture;
  label: string;
  icon: string;
}

export interface DownloadInfo {
  version: string;
  architecture: Architecture;
  downloadUrl: string;
  fileName: string;
}

export interface AppState {
  extension: Extension | null;
  loading: boolean;
  error: string | null;
  searchInput: string;
  selectedArchitecture: Architecture;
  selectedVersion: string;
  availableArchitectures: Architecture[];
  availableVersions: Map<Architecture, ExtensionVersion[]>
}
