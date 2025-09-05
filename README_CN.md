# VSCode Extension 离线下载

简体中文 | [English](README.md)

一个用于下载 VSCode 扩展进行离线安装的网页工具。  
该工具可从官方 Visual Studio Code 市场下载不同架构、版本的 `.vsix` 扩展文件。

## 🚀 快速开始

访问在线演示：[VSCode Extension Downloader](https://vscode-extension-downloader.pages.dev/)

1. **搜索扩展**：
   - 输入扩展 ID（如 `ms-python.python`）
   - 或粘贴市场 URL（如 `https://marketplace.visualstudio.com/items?itemName=ms-python.python`）

2. **选择要下载的架构**：
   - 为您的系统选择合适的架构，例如 `linux-x64`
   - `universal` 架构适用于所有平台

3. **选择版本**：
   - 从可用版本中选则，默认选择最新版本

4. **下载**：
   - 点击下载按钮获取 `.vsix` 文件

5. **离线安装**
   1. 打开 VSCode
   2. 按 `Ctrl+Shift+P`（Mac 上按 `Cmd+Shift+P`）
   3. 输入 "扩展：从 VSIX 安装..."
   4. 选择下载的 `.vsix` 文件
   5. 如有提示，重启 VSCode

## 本地部署

除了在线 demo，你也可以本地部署此项目

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

## ⚠️ 免责声明

所有扩展资源均来源于官方 Visual Studio Code 市场。本工具仅作为下载便利工具，提供的下载地址来自官方市场。我们不托管、修改或对任何扩展内容、功能或潜在问题承担责任。用户自行承担下载扩展的风险。  

下载时请确保下载地址是 `ms-vscode.gallerycdn.vsassets.io` 官方域名。
