import { app, BrowserWindow } from 'electron'
import path from 'path'
import url from 'url'

// global reference to mainWindow (necessary to prevent window from being garbage collected)
let mainWindow

function createMainWindow () {
  // Create the browser window.
  const window = new BrowserWindow({
    show: false,
    icon: 'static/daemon.png'
  })
  
  window.loadURL('http://localhost:8080')
  window.setMenu(null)

  // TODO splash
  // and load the index.html of the app.
  // window.loadURL(url.format({
  //   pathname: path.join(__dirname, 'index.html'),
  //   protocol: 'file:',
  //   slashes: true
  // }))

  window.once('ready-to-show', () => {
    window.maximize()
    window.show()
  })

  return window
}

// quit application when all windows are closed
app.on('window-all-closed', () => {
  // on macOS it is common for applications to stay open until the user explicitly quits
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // on macOS it is common to re-create a window even after all windows have been closed
  if (mainWindow === null) {
    mainWindow = createMainWindow()
  }
})

// create main BrowserWindow when electron is ready
app.on('ready', () => {
  mainWindow = createMainWindow()
})
