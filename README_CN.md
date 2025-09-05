# VSCode 扩展下载器

简体中文 | [English](README.md)

一个用于下载 VSCode 扩展进行离线安装的网页工具。该工具允许您轻松从官方 Visual Studio Code 市场下载不同架构、版本的 `.vsix` 文件。

## ✨ 功能特性

- 🔍 **便捷搜索**：通过扩展 ID（如 `ms-python.python`）或市场 URL 搜索扩展
- 🏗️ **架构支持**：为特定架构下载扩展（Windows、macOS、Linux、Alpine、通用、Web）
- 📦 **版本选择**：从扩展的所有可用版本中选择
- 💾 **直接下载**：直接将 `.vsix` 文件下载到您的设备

## 🚀 快速开始

### 在线使用

访问在线演示：[VSCode Extension Downloader](https://github.com/crimson-gao/vscode-extension-downloader)

### 本地开发

1. **克隆仓库**
   ```bash
   git clone https://github.com/crimson-gao/vscode-extension-downloader.git
   cd vscode-extension-downloader
   ```

2. **安装依赖**
   ```bash
   yarn install
   ```

3. **启动开发服务器**
   ```bash
   yarn dev
   ```

4. **构建生产版本**
   ```bash
   yarn build
   ```

## 📖 使用方法

1. **搜索扩展**：
   - 输入扩展 ID（如 `ms-python.python`）
   - 或粘贴市场 URL（如 `https://marketplace.visualstudio.com/items?itemName=ms-python.python`）
   - 点击热门扩展标签快速访问

2. **选择架构**（如果可用）：
   - 为您的系统选择合适的架构
   - 通用扩展适用于所有平台

3. **选择版本**：
   - 从可用版本中选择
   - 默认选择最新版本

4. **下载**：
   - 点击下载按钮获取 `.vsix` 文件
   - 使用 `扩展：从 VSIX 安装...` 在 VSCode 中安装

## 📝 在 VSCode 中安装

下载 `.vsix` 文件后：

1. 打开 VSCode
2. 按 `Ctrl+Shift+P`（Mac 上按 `Cmd+Shift+P`）
3. 输入 "扩展：从 VSIX 安装..."
4. 选择下载的 `.vsix` 文件
5. 如有提示，重启 VSCode

## ⚠️ 免责声明

所有扩展资源均来源于官方 Visual Studio Code 市场。本工具仅作为下载便利工具，提供的下载地址来自官方市场。我们不托管、修改或对任何扩展内容、功能或潜在问题承担责任。用户自行承担下载扩展的风险。  

下载时请确保下载地址是 `ms-vscode.gallerycdn.vsassets.io` 官方域名。
