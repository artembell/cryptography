const {
    app,
    BrowserWindow
} = require('electron')

function createWindow() {
    let win = new BrowserWindow({
        width: 600,
        heigth: 800,
        webPreferences: {    
            nodeIntegration: true
        }
    })
    win.maximize();
    win.loadURL('http://localhost:9000');

    win.webContents.openDevTools();

}

app.on('ready', createWindow)