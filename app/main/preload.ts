import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('api', {
  openWindow: (url: string, title?: string) => ipcRenderer.invoke('open-new-window', url, title),
  captureScreen: () => ipcRenderer.invoke('capture-screen'),
  openFolder: () => ipcRenderer.invoke('open-screenshot-folder'),
  checkForUpdates: () => ipcRenderer.send('request-update-check'),
  onUpdateAvailable: (callback: (version: string) => void) => {
    ipcRenderer.on('update-available', (_evt, version) => callback(version));
  }
})