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
  // 处理URL格式：https://marketplace.visualstudio.com/items?itemName=ms-vscode.cpptools
  const urlMatch = input.match(/itemName=([^&]+)/);
  if (urlMatch) {
    const [publisherName, extensionName] = urlMatch[1].split('.');
    if (publisherName && extensionName) {
      return { publisherName, extensionName };
    }
  }

  // 处理扩展ID格式：ms-vscode.cpptools
  const idMatch = input.match(/^([^.]+)\.(.+)$/);
  if (idMatch) {
    const [, publisherName, extensionName] = idMatch;
    return { publisherName, extensionName };
  }

  return null;
}

/**
 * 搜索扩展
 */
export async function searchExtension(extensionId: string): Promise<Extension | null> {
  const parsedInput = parseExtensionInput(extensionId);
  if (!parsedInput) {
    throw new Error('Invalid extension ID or URL format');
  }

  const { publisherName, extensionName } = parsedInput;
  const fullExtensionId = `${publisherName}.${extensionName}`;

  const query: ExtensionQuery = {
    assetTypes: null,
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
    flags: 2151 // IncludeVersions | IncludeFiles | IncludeStatistics | IncludeVersionProperties
  };

  try {
    const response = await api.post<VSCodeMarketplaceResponse>(
      `${MARKETPLACE_API_BASE}/extensionquery`,
      query
    );

    const extensions = response.data.results?.[0]?.extensions;
    if (!extensions || extensions.length === 0) {
      return null;
    }

    return extensions[0];
  } catch (error) {
    console.error('Error searching extension:', error);
    throw new Error('Failed to search extension');
  }
}

export function hasSignature(version: ExtensionVersion): boolean {
  const signatureFile = version.files.find((file: ExtensionFile) =>
    file.assetType === 'Microsoft.VisualStudio.Services.VsixSignature'
  );
  return signatureFile !== undefined;
}

/**
 * 获取版本的签名信息
 */
export async function getSignatureInfo(version: ExtensionVersion): Promise<string | null> {
  const signatureFile = version.files.find((file: ExtensionFile) =>
    file.assetType === 'Microsoft.VisualStudio.Services.VsixSignature'
  );
  return signatureFile?.source || null;
}

/**
 * 获取扩展图标URL
 */
export function getExtensionIconUrl(version: ExtensionVersion): string | null {
  const iconFile = version.files.find((file: ExtensionFile) =>
    file.assetType === 'Microsoft.VisualStudio.Services.Icons.Default'
  );

  return iconFile?.source || null;
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
    { value: 'win32-arm64', label: 'Windows ARM64', icon: '🪟' },
    { value: 'darwin-x64', label: 'macOS x64', icon: '🍎' },
    { value: 'darwin-arm64', label: 'macOS ARM64', icon: '🍎' },
    { value: 'linux-x64', label: 'Linux x64', icon: '🐧' },
    { value: 'linux-arm64', label: 'Linux ARM64', icon: '🐧' },
    { value: 'linux-armhf', label: 'Linux ARM', icon: '🐧' },
    { value: 'alpine-x64', label: 'Alpine Linux x64', icon: '🏔️' },
    { value: 'alpine-arm64', label: 'Alpine Linux ARM64', icon: '🏔️' },
    { value: 'universal', label: 'Universal', icon: '🌐' },
    { value: 'web', label: 'Web', icon: '🌐' },
  ].map((arch) => [arch.value as Architecture, arch as ArchitectureOption]));
}


export async function downloadFile(url: string, fileName: string) {
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  // 把元素设置为不可见
  link.style.display = 'none';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}