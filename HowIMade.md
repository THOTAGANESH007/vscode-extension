# Guide: Creating and Publishing a VS Code Sound Extension

This document outlines the workflow for developing, packaging, and publishing a Visual Studio Code extension that includes audio assets.

---

## Phase 1: Development Setup

### Step 1: Install Prerequisites

Ensure the following tools are installed and configured in your system PATH:

- **Node.js**
- **Git**
- **Visual Studio Code**

### Step 2: Scaffold the Extension

Use the Yeoman generator to create the project structure. Open your terminal and run:

```bash
npx yo code
```

_Choose **New Extension (TypeScript)** or **JavaScript** when prompted._

### Step 3: Add Assets

1. Create a folder named `assets` in the root of your project.
2. Place your sound files (e.g., `notification.wav`) into this folder.

### Step 4: Install the Audio Player Package

Install a library to handle audio playback through Node.js:

```bash
npm install play-sound
```

### Step 5: Update Metadata

Before publishing, you must configure the following files:

- **`package.json`**: Update the `publisher` name, `displayName`, `description`, and define your `activationEvents` and `contributes` (commands).
- **`README.md`**: Replace the default text with a description of what your extension does.
- **`LICENSE`**: Add a license file (e.g., MIT) to your root directory.
- **Repository**: Ensure your `package.json` includes a "repository" field pointing to a GitHub URL.

### Step 6: Write the Extension Logic

Open `src/extension.ts` (TypeScript) or `extension.js` (JavaScript). Use the `play-sound` library to reference the file path in your `assets` folder and trigger playback based on a VS Code command or event.

---

## Phase 2: Create a Publisher Account

### 1. Marketplace Registration

1. Visit the [Visual Studio Marketplace Management Portal](https://marketplace.visualstudio.com/manage).
2. Log in and create a unique **Publisher ID**.

### 2. Azure DevOps Personal Access Token (PAT)

1. Go to [Azure DevOps](https://aex.dev.azure.com).
2. Create an Organization if you do not have one.
3. Access **User Settings** (top-right) > **Personal Access Tokens**.
4. Select **New Token**:
   - **Organization**: "All accessible organizations".
   - **Scopes**: Choose "Custom defined".
   - **Permissions**: Click "Show all scopes" at the bottom, find **Marketplace**, and check **Manage**.
5. **Copy the PAT immediately** as it will not be shown again.

---

## Phase 3: Packaging and Publishing

### Step 1: Install VSCE

Install the Visual Studio Code Extension Manager globally:

```bash
npm install -g @vscode/vsce
```

### Step 2: Login to Publisher Account

Run the following command and paste your PAT when prompted:

```bash
vsce login your_publisher_name
```

### Step 3: Package the Extension

To verify everything is correct and create a local installer (`.vsix`), run:

```bash
vsce package
```

### Step 4: Publish!

Upload your extension to the public Marketplace:

```bash
vsce publish
```

_Note: It may take a few minutes for the extension to appear in the Marketplace search results._
