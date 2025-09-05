import axios from 'axios';
import { Architecture, Extension, ExtensionFile, ExtensionQuery, ExtensionVersion, VSCodeMarketplaceResponse } from '../types';
const MARKETPLACE_API_BASE = 'https://marketplace.visualstudio.com/_apis/public/gallery';

// 创建axios实例
const api = axios.create({
  timeout: 10000,
  headers: {
    'Accept': 'application/json;api-version=7.2-preview.1;excludeUrls=true',
    'Content-Type': 'application/json',
  },
});

/**
 * 从URL或扩展ID中提取扩展信息
 */
export function parseExtensionInput(input: string): { publisherName: string; extensionName: string } | null {
  if (!input || typeof input !== 'string') {
    return null;
  }

  const trimmedInput = input.trim();

   // 处理扩展ID格式：ms-vscode.cpptools
   const idMatch = trimmedInput.match(/^([a-zA-Z0-9-_]+)\.([a-zA-Z0-9-_]+)$/);
   if (idMatch) {
     const [, publisherName, extensionName] = idMatch;
     if (publisherName && extensionName) {
       return { publisherName, extensionName };
     }
   }
  
  // 处理URL格式：https://marketplace.visualstudio.com/items?itemName=ms-vscode.cpptools
  try {
    const urlObj = new URL(trimmedInput);
    console.log('urlObj', urlObj);
    if (urlObj.searchParams && urlObj.searchParams.get('itemName')) {
      const parts = urlObj.searchParams.get('itemName')!.split('.');
      if (parts.length >= 2) {
        const publisherName = parts[0];
        const extensionName = parts.slice(1).join('.');
        if (publisherName && extensionName) {
          return { publisherName, extensionName };
        }
      }
    }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-empty
  } catch (e) {}
  return null;
}

/**
 * 搜索扩展
 */
export async function searchExtension(extensionId: string): Promise<Extension | null> {

  const fullExtensionId = extensionId;

  const query: ExtensionQuery = {
    assetTypes: [
      'Microsoft.VisualStudio.Services.VSIXPackage',
      'Microsoft.VisualStudio.Services.Icons.Default'
    ],
    filters: [{
      criteria: [{
        filterType: 7, // ExtensionName
        value: fullExtensionId
      }],
      direction: 2,
      pageSize: 100,
      pageNumber: 1,
      sortBy: 0,
      sortOrder: 0,
      pagingToken: null
    }],
    flags: 2407,
    // flags: 2151 // IncludeVersions | IncludeFiles | IncludeStatistics | IncludeVersionProperties
  };

  try {
    const response = await api.post<VSCodeMarketplaceResponse>(
      `${MARKETPLACE_API_BASE}/extensionquery`,
      query
    );

    const extensions = response.data?.results?.[0]?.extensions;
    if (!extensions || extensions.length === 0) {
      return null;
    }

    return extensions[0];
  } catch (error) {
    console.error('Error searching extension:', error);
    
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404) {
        throw new Error('Extension not found in the marketplace.');
      }
      if (error.code === 'ECONNABORTED') {
        throw new Error('Request timeout. Please check your network connection.');
      }
      if (error.response?.status === 429) {
        throw new Error('Too many requests. Please try again later.');
      }
    }
    
    throw new Error('Failed to search extension. Please check your network connection.');
  }
}

/**
 * 获取扩展的下载URL (保留向后兼容)
 */
export function getDownloadUrl(
  version: ExtensionVersion
): string | null {
  const downloadFile = version.files.find((file: ExtensionFile) =>
    file.assetType === 'Microsoft.VisualStudio.Services.VSIXPackage'
  );
  return downloadFile?.source || null
}

export interface ArchitectureOption {
  value: Architecture;
  label: string;
  icon: string;
}

/**
 * 获取支持的架构列表
 */
export function getSupportedArchitectures(): Map<Architecture, ArchitectureOption> {
  return new Map([
    { value: 'win32-x64', label: 'Windows x64', icon: '🪟' },
    { value: 'win32-ia32', label: 'Windows x86', icon: '🪟' },
    { value: 'win32-arm64', label: 'Windows arm64', icon: '🪟' },
    { value: 'darwin-x64', label: 'macOS x64', icon: '🍎' },
    { value: 'darwin-arm64', label: 'macOS arm64', icon: '🍎' },
    { value: 'linux-x64', label: 'Linux x64', icon: '🐧' },
    { value: 'linux-arm64', label: 'Linux arm64', icon: '🐧' },
    { value: 'linux-armhf', label: 'Linux arm-hf', icon: '🐧' },
    { value: 'alpine-x64', label: 'Alpine Linux x64', icon: '🏔️' },
    { value: 'alpine-arm64', label: 'Alpine Linux arm64', icon: '🏔️' },
    { value: 'universal', label: 'Universal', icon: '🌐' },
    { value: 'web', label: 'Web', icon: '🌐' },
  ].map((arch) => [arch.value as Architecture, arch as ArchitectureOption]));
}


export async function downloadFile(url: string, fileName: string): Promise<void> {
  try {
    if (!url || !fileName) {
      throw new Error('Invalid download parameters');
    }

    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    link.style.display = 'none';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error('Download error:', error);
    throw new Error('Failed to download file. Please try again.');
  }
}