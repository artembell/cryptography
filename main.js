const {
    app,
    BrowserWindow
} = require('electron')

console.log("ELECTRON RUN");

function createWindow() {
    // Create the browser window.
    let win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    })

    win.loadURL('http://localhost:9000');
    //   win.loadFile('./dist/index.html');

    win.webContents.openDevTools();

}

app.on('ready', createWindow)