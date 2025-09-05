# VSCode Extension Downloader

[简体中文](README_CN.md) | English

A web-based tool for downloading VSCode extensions for offline installation. This tool allows you to easily download `.vsix` files from the official Visual Studio Code Marketplace for different cpu archs and versions.

## ✨ Features

- 🔍 **Easy Search**: Search extensions by ID (e.g., `ms-python.python`) or marketplace URL
- 🏗️ **Architecture Support**: Download extensions for specific architectures (Windows, macOS, Linux, Alpine, Universal, Web)
- 📦 **Version Selection**: Choose from all available versions of an extension
- 💾 **Direct Download**: Download `.vsix` files directly to your device

## 🚀 Quick Start

### Online Usage

Visit the live demo: [VSCode Extension Downloader](https://github.com/crimson-gao/vscode-extension-downloader)

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/crimson-gao/vscode-extension-downloader.git
   cd vscode-extension-downloader
   ```

2. **Install dependencies**
   ```bash
   yarn install
   ```

3. **Start development server**
   ```bash
   yarn dev
   ```

4. **Build for production**
   ```bash
   yarn build
   ```

## 📖 How to Use

1. **Search for an extension**:
   - Enter the extension ID (e.g., `ms-python.python`)
   - Or paste the marketplace URL (e.g., `https://marketplace.visualstudio.com/items?itemName=ms-python.python`)
   - Click popular extension tags for quick access

2. **Select architecture** (if available):
   - Choose the appropriate architecture for your system
   - Universal extensions work on all platforms

3. **Choose version**:
   - Select from available versions
   - Latest version is selected by default

4. **Download**:
   - Click the download button to get the `.vsix` file
   - Install in VSCode using command `Extensions: Install from VSIX...`

## 📝 Installation in VSCode

After downloading a `.vsix` file:

1. Open VSCode
2. Press `Ctrl+Shift+P` (or `Cmd+Shift+P` on Mac)
3. Type "Extensions: Install from VSIX..."
4. Select the downloaded `.vsix` file
5. Restart VSCode if prompted

## ⚠️ Disclaimer

All extension resources are sourced from the official Visual Studio Code Marketplace. This tool serves as a download facilitator only. We do not host, modify, or take responsibility for any extension content, functionality, or potential issues. Users download extensions at their own discretion and risk.

Make sure the url is trustable before you download from it.

