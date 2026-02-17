import { net } from 'electron';
const LOCAL_VERSION = '1.0.0'; // Sync with package.json
const VERSION_URL = 'https://raw.githubusercontent.com/Razgals/RSC-Companion/main/version.json';

function checkForUpdates(win: BrowserWindow) {
  const request = net.request(VERSION_URL);
  request.on('response', (response) => {
    let data = '';
    response.on('data', chunk => { data += chunk; });
    response.on('end', () => {
      try {
        const remote = JSON.parse(data);
        if (remote.version && remote.version !== LOCAL_VERSION) {
          win.webContents.send('update-available', remote.version);
        }
      } catch {}
    });
  });
  request.end();
}
import { app, BrowserWindow, ipcMain, shell } from 'electron'
import * as path from 'path'
import * as fs from 'fs'


interface WindowState {
  x?: number;
  y?: number;
  width: number;
  height: number;
}

const stateFile = path.join(app.getPath('userData'), 'window-state.json');
function loadWindowState(defaults: WindowState): WindowState {
  try {
    if (fs.existsSync(stateFile)) {
      const data = fs.readFileSync(stateFile, 'utf-8');
      return { ...defaults, ...JSON.parse(data) };
    }
  } catch {}
  return defaults;
}
function saveWindowState(win: BrowserWindow) {
  if (!win) return;
  const bounds = win.getBounds();
  const state: WindowState = {
    x: bounds.x,
    y: bounds.y,
    width: bounds.width,
    height: bounds.height
  };
  try {
    fs.writeFileSync(stateFile, JSON.stringify(state));
  } catch {}
}

let mainWin: BrowserWindow | null = null;

function createChild(url: string, title?: string) {
  // Try to load last child window state, fallback to defaults
  const childDefaults: WindowState = { width: 900, height: 750 };
  let childState = loadWindowState(childDefaults);
  const win = new BrowserWindow({
    icon: path.join(__dirname, '..', 'renderer', 'assets', 'icon.png'),
    width: childState.width,
    height: childState.height,
    x: childState.x,
    y: childState.y,
    backgroundColor: '#0e0f11',
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: true
    },
    title: title || 'RSC Tool'
  });
  win.loadURL(url);
  // Enable zoom with ctrl+mousewheel and ctrl+plus/minus
  win.webContents.on('before-input-event', (event, input) => {
    if (input.control && input.type === 'keyDown' && (input.key === '+' || input.key === '-' || input.key === '=')) {
      let currentZoom = win.webContents.getZoomFactor();
      if (input.key === '+' || input.key === '=') {
        win.webContents.setZoomFactor(Math.min(currentZoom + 0.1, 3));
      } else if (input.key === '-') {
        win.webContents.setZoomFactor(Math.max(currentZoom - 0.1, 0.25));
      }
      event.preventDefault();
    }
  });
  win.on('close', () => saveWindowState(win));
  return win;
}


function createWindow() {
  const defaults: WindowState = { width: 1100, height: 800 };
  const state = loadWindowState(defaults);
  mainWin = new BrowserWindow({
    icon: path.join(__dirname, '..', 'renderer', 'assets', 'icon.png'),
    width: state.width,
    height: state.height,
    x: state.x,
    y: state.y,
    minWidth: 1000,
    minHeight: 700,
    backgroundColor: '#0e0f11',
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: true
    },
    title: 'RSC LostKit'
  });

  // Enable zoom with ctrl+mousewheel and ctrl+plus/minus
  mainWin.webContents.on('before-input-event', (event, input) => {
    if (input.control && input.type === 'keyDown' && (input.key === '+' || input.key === '-' || input.key === '=')) {
      let currentZoom = mainWin!.webContents.getZoomFactor();
      if (input.key === '+' || input.key === '=') {
        mainWin!.webContents.setZoomFactor(Math.min(currentZoom + 0.1, 3));
      } else if (input.key === '-') {
        mainWin!.webContents.setZoomFactor(Math.max(currentZoom - 0.1, 0.25));
      }
      event.preventDefault();
    }
  });

  const indexPath = path.join(__dirname, '..', 'renderer', 'index.html');
  mainWin.loadFile(indexPath);
  // Check for updates after window loads
  mainWin.webContents.on('did-finish-load', () => {
    checkForUpdates(mainWin!);
  });
// Listen for update prompt in renderer
ipcMain.on('request-update-check', (evt) => {
  if (mainWin) checkForUpdates(mainWin);
});

  mainWin.webContents.setWindowOpenHandler(({ url }) => {
    createChild(url);
    return { action: 'deny' };
  });

  mainWin.on('close', () => saveWindowState(mainWin!));
  mainWin.on('closed', () => { mainWin = null });
}

// SCREENSHOT LOGIC - Captures only the active iframe content
ipcMain.handle('capture-screen', async () => {
  if (!mainWin) return;

  // Create screenshots folder in root directory
  const rootPath = process.cwd(); 
  const screenshotDir = path.join(rootPath, 'screenshots');
  
  if (!fs.existsSync(screenshotDir)) {
    fs.mkdirSync(screenshotDir, { recursive: true });
  }

  try {
    // Execute script in renderer to get the active iframe's position and dimensions
    const iframeData = await mainWin.webContents.executeJavaScript(`
      (function() {
        const activeView = document.querySelector('.view.active');
        if (!activeView) return null;
        
        const iframe = activeView.querySelector('iframe');
        if (!iframe) return null;
        
        const rect = iframe.getBoundingClientRect();
        return {
          x: Math.round(rect.x),
          y: Math.round(rect.y),
          width: Math.round(rect.width),
          height: Math.round(rect.height)
        };
      })();
    `);

    if (!iframeData) {
      console.error('No active iframe found');
      return null;
    }

    // Capture the entire page
    const fullImage = await mainWin.capturePage();
    
    // Crop to just the iframe area
    const croppedImage = fullImage.crop({
      x: iframeData.x,
      y: iframeData.y,
      width: iframeData.width,
      height: iframeData.height
    });

    const fileName = `RSC-Capture-${Date.now()}.png`;
    const filePath = path.join(screenshotDir, fileName);

    fs.writeFileSync(filePath, croppedImage.toPNG());
    return filePath;
  } catch (error) {
    console.error('Screenshot error:', error);
    return null;
  }
});

ipcMain.handle('open-screenshot-folder', async () => {
  const screenshotDir = path.join(process.cwd(), 'screenshots');
  if (!fs.existsSync(screenshotDir)) {
    fs.mkdirSync(screenshotDir, { recursive: true });
  }
  shell.openPath(screenshotDir);
});

ipcMain.handle('open-new-window', (_evt, url: string, title?: string) => {
  createChild(url, title)
  return true
})

app.on('ready', createWindow)
app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit() })
app.on('activate', () => { if (BrowserWindow.getAllWindows().length === 0) createWindow() })