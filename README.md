# 🚀 VSCode Extension Downloader

一个现代化的 VSCode 扩展离线包下载器，支持通过扩展ID或商店URL下载扩展的历史版本。

![VSCode Extension Downloader](https://img.shields.io/badge/VSCode-Extension%20Downloader-blue?style=for-the-badge&logo=visual-studio-code)

## ✨ 特性

- 🔍 **智能搜索**: 支持扩展ID和完整商店URL两种搜索方式
- 📱 **响应式设计**: 现代化Material-UI界面，完美适配各种设备
- 🎯 **多架构支持**: 支持Windows、macOS、Linux等多种平台架构
- 📦 **版本管理**: 显示完整的版本历史，包括发布时间
- ⚡ **实时下载**: 带有进度条的实时下载体验
- 🎨 **流畅动画**: 使用Framer Motion提供丝滑的交互动画
- 🔄 **状态管理**: 基于Zustand的响应式状态管理

## 🛠️ 技术栈

- **前端框架**: React 18 + TypeScript
- **UI组件库**: Material-UI (MUI)
- **状态管理**: Zustand
- **动画库**: Framer Motion  
- **HTTP客户端**: Axios
- **构建工具**: Vite
- **样式方案**: Emotion + CSS-in-JS

## 🚀 快速开始

### 安装依赖

```bash
# 使用 yarn
yarn install

# 或使用 npm
npm install
```

### 启动开发服务器

```bash
# 使用 yarn
yarn dev

# 或使用 npm
npm run dev
```

应用将在 `http://localhost:5173` 启动

### 构建生产版本

```bash
# 使用 yarn
yarn build

# 或使用 npm
npm run build
```

## 📖 使用方法

### 1. 搜索扩展

支持两种输入方式：

- **扩展ID格式**: `ms-vscode.cpptools`
- **商店URL格式**: `https://marketplace.visualstudio.com/items?itemName=ms-vscode.cpptools`

### 2. 选择架构

支持的目标平台：
- Universal (通用版本)
- Windows (x64, x86, ARM64)
- macOS (x64, ARM64)
- Linux (x64, ARM64, ARM)
- Alpine Linux (x64, ARM64)
- Web 版本

### 3. 下载版本

- 查看完整的版本历史
- 选择目标架构
- 一键下载 `.vsix` 文件

## 🎯 API支持

应用使用 VSCode Marketplace 官方API：

```bash
curl 'https://marketplace.visualstudio.com/_apis/public/gallery/extensionquery' \
  -H 'accept: application/json;api-version=7.2-preview.1;excludeUrls=true' \
  -H 'content-type: application/json' \
  --data-raw '{
    "assetTypes": null,
    "filters": [{
      "criteria": [{
        "filterType": 7,
        "value": "ms-vscode.cpptools"
      }],
      "direction": 2,
      "pageSize": 100,
      "pageNumber": 1,
      "sortBy": 0,
      "sortOrder": 0,
      "pagingToken": null
    }],
    "flags": 2151
  }'
```

## 📁 项目结构

```
src/
├── components/          # React组件
│   ├── SearchBar.tsx   # 搜索栏组件
│   ├── ExtensionInfo.tsx # 扩展信息显示
│   ├── VersionList.tsx # 版本列表
│   ├── ArchitectureSelector.tsx # 架构选择器
│   ├── LoadingState.tsx # 加载状态
│   └── ErrorState.tsx  # 错误状态
├── services/           # 服务层
│   └── api.ts         # API调用封装
├── store/             # 状态管理
│   └── useExtensionStore.ts # Zustand store
├── types/             # TypeScript类型定义
│   └── index.ts       # 类型定义
├── utils/             # 工具函数
│   └── animations.ts  # 动画配置
└── app/               # 应用主入口
    └── app.tsx        # 主应用组件
```

## 🎨 设计特色

- **渐变背景**: 现代化的渐变色背景设计
- **卡片布局**: 清晰的信息层级和视觉分组
- **微交互**: 丰富的hover和点击反馈效果
- **响应式**: 完美适配桌面端和移动端
- **主题统一**: 一致的颜色系统和字体规范

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

MIT License

## 👨‍💻 作者

Created with ❤️ by [Crimson](https://github.com/crimson-gao)

---

⭐ 如果这个项目对你有帮助，请给它一个星标！