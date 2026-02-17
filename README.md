# RSC Companion by Akg

A desktop app for RuneScape Classic players, offering skill guides, calculators, and useful tools—all in one place.

## Features
- Skill guides
- Calculators
- World map
- Quick access to useful links
- Screenshot tool
- Update check

## Getting Started
1. Download the latest release from [GitHub Releases](https://github.com/Razgals/RSC-Companion/releases).
2. Run the `.exe` file. No installation required for portable version.

## Requirements & Dependencies

- **Node.js** (LTS recommended, e.g., 18.x or 20.x)
- **npm** (comes with Node.js)
- **Windows OS** (for .exe build)
- **Git** (optional, for cloning the repo)

All other dependencies are installed automatically with:

    npm install

### DevDependencies (auto-installed)
- electron
- electron-builder
- typescript
- ts-node
- @types/node
- rimraf
- concurrently
- nodemon

### Linux & macOS Support

- The app can be built and run on Linux and macOS as well as Windows.
- Install Node.js and npm for your OS.
- To run in development mode on any OS:

    npm install
    npm start

- To package for Linux or macOS, add the appropriate build targets to your package.json (see electron-builder docs).
- Example for Linux:

    npm run build && electron-builder --linux

- Example for macOS:

    npm run build && electron-builder --mac

- See https://www.electron.build/multi-platform-build for more details.

> **Note:** Building on macOS and Linux has not been tested.

## Screenshots



## Main Window
<img width="982" height="787" alt="Screenshot 2026-02-17 204413" src="https://github.com/user-attachments/assets/a47ec94d-df3a-4071-b505-1c4654740c84" />

## Skill Guide
<img width="990" height="789" alt="image" src="https://github.com/user-attachments/assets/48cc1d1b-4deb-4160-a98f-ea512361e5ad" />


## Calculator
<img width="989" height="789" alt="Screenshot 2026-02-17 204428" src="https://github.com/user-attachments/assets/fcdf09e7-c13a-4797-9951-d454b7169e5f" />

## License
MIT

---
Built by Akg.




