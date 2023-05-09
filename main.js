// Modules
const {app, BrowserWindow, ipcMain} = require('electron')
const winState = require('electron-window-state');
const readItem = require('./readItem')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

ipcMain.on('new-item', (e, itemUrl) => {
  readItem(itemUrl, item => {
    e.sender.send('send-item', item)
  })
  // setTimeout(() => {
  //   e.sender.send('send-item', {title: 'test', screenshot: 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png', url: 'https://www.google.com'})
  // }, 2000)
})

// Create a new BrowserWindow when `app` is ready
function createWindow () {


  let mainWindowState = winState({
    defaultWidth: 750,
    defaultHeight: 1200
  });

  mainWindow = new BrowserWindow({
    x: mainWindowState.x, y: mainWindowState.y,
    width: mainWindowState.width, height: mainWindowState.height,
    minWidth: 300, minHeight: 400,
    maxWidth: 750, maxHeight: 1200,
    webPreferences: {
      // --- !! IMPORTANT !! ---
      // Disable 'contextIsolation' to allow 'nodeIntegration'
      // 'contextIsolation' defaults to "true" as from Electron v12
      contextIsolation: false,
      nodeIntegration: true
    }
  })

  mainWindowState.manage(mainWindow)

  // Load index.html into the new BrowserWindow
  mainWindow.loadFile('./rendere/main.html')

  // Open DevTools - Remove for PRODUCTION!
  mainWindow.webContents.openDevTools();

  // Listen for window being closed
  mainWindow.on('closed',  () => {
    mainWindow = null
  })
}

// Electron `app` is ready
app.on('ready', createWindow)

// Quit when all windows are closed - (Not macOS - Darwin)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

// When app icon is clicked and app is running, (macOS) recreate the BrowserWindow
app.on('activate', () => {
  if (mainWindow === null) createWindow()
})
