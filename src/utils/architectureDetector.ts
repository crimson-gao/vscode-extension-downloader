import { Architecture } from '../types';


function isAppleSilicon(): boolean {
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl');

    // Best guess if the device is an Apple Silicon
    // https://stackoverflow.com/a/65412357
    if (!gl) return false;
    
    const extensions = gl.getSupportedExtensions();
    return extensions ? extensions.indexOf('WEBGL_compressed_texture_etc') !== -1 : false;
  } catch {
    return false;
  }
}
/**
 * 检测用户机器的架构并返回最适合的VSCode扩展架构
 */
export async function detectUserArchitecture(): Promise<Architecture> {
  try {
    const userAgent = navigator.userAgent;
    const lowerUserAgent = userAgent.toLowerCase();
    
    // 检测操作系统
    const isWindows = lowerUserAgent.includes('win');
    const isMac = lowerUserAgent.includes('mac');
    const isLinux = lowerUserAgent.includes('linux');
    const is64Bit = lowerUserAgent.includes('x64') || lowerUserAgent.includes('wow64');

    // 检测架构
    const isARM = lowerUserAgent.includes('arm') || lowerUserAgent.includes('aarch64');

    if (isWindows) {
      if (isARM) {
        return 'win32-arm64';
      } else if (!is64Bit) {
        return 'win32-ia32'; // 32位Windows
      } else {
        return 'win32-x64';
      }
    } else if (isMac) {
      if (isAppleSilicon()) {
        return 'darwin-arm64'; // Apple Silicon
      } else {
        return 'darwin-x64'; // Intel Mac
      }
    } else if (isLinux) {
      if (isARM) {
        return 'linux-arm64';
      } else {
        return 'linux-x64';
      }
    }
    
    return 'universal';
  } catch (error) {
    console.warn('Error detecting architecture:', error);
    return 'universal';
  }
}

