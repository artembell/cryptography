const {
    app,
    BrowserWindow
} = require('electron')

function createWindow() {
    let win = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true
        }
    })
    win.maximize();
    win.loadURL('http://localhost:9000');

    win.webContents.openDevTools();

}

app.on('ready', createWindow)