import arch from 'arch';
import { Architecture } from '../types';


/**
 * 检测用户机器的架构并返回最适合的VSCode扩展架构
 */
export async function detectUserArchitecture(): Promise<Architecture> {
  const userAgent = navigator.userAgent;
  const lowerUserAgent = userAgent.toLowerCase();
  // 检测操作系统
  const isWindows = lowerUserAgent.includes('win');
  const isMac = lowerUserAgent.includes('mac');
  const isLinux = lowerUserAgent.includes('linux');
  const is64Bit = arch() === 'x64';

  // 检测架构
  const isARM = userAgent.includes('arm') || userAgent.includes('aarch64');

  if (isWindows) {
    if (isARM) {
      return 'win32-arm64';
    } else if (!is64Bit) {
      return 'win32-ia32'; // 32位Windows
    } else {
      return 'win32-x64';
    }
  } else if (isMac) {
    if (!isARM) {
      return 'darwin-x64'; // Intel Mac
    } else {
      return 'darwin-arm64'; // Apple Silicon
    }
  } else if (isLinux) {
    if (isARM) {
      return 'linux-arm64';
    } else {
      return 'linux-x64';
    }
  }
  return 'universal';
}

