import { app, screen, BrowserWindow } from 'electron'
import path from 'path'
import url from 'url'

// global reference to splash (necessary to prevent window from being garbage collected)
let splash

function create (options) {
  const commonOptions = {
    title: 'Daemon Client',
    show: false,
    icon: `${__static}/daemon-256.png`
  }

  const width = 620
  const height = 300

  const bounds = screen.getDisplayNearestPoint(screen.getCursorScreenPoint()).bounds
  const x = Math.ceil(bounds.x + ((bounds.width - width) / 2))
  const y = Math.ceil(bounds.y + ((bounds.height - height) / 2))

  const splash = new BrowserWindow(Object.assign({}, options, {
    x,
    y,
    width,
    height,
    frame: false,
    center: true
  }))

  splash.once('ready-to-show', () => {
    splash.show()
  })

  splash.webContents.on('new-window', (event, url) => {
    event.preventDefault()
    const window = new BrowserWindow(commonOptions)
    window.once('ready-to-show', () => {
      splash.hide()
      window.maximize()
      window.show()
    })
    window.once('closed', () => {
      splash.show()
    })
    window.setMenu(null)
    window.loadURL(url)
  })

  splash.loadURL(`file://${__static}/index.html`)

  return splash
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
  if (splash === null) {
    splash = create()
  }
})

// create main BrowserWindow when electron is ready
app.on('ready', () => {
  splash = create()
})
