const {
    app,
    BrowserWindow
} = require('electron')
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'

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