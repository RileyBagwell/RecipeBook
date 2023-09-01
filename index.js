const { app, BrowserWindow } = require("electron")
const path = require('path')

const createWindow = () => {
    const win = new BrowserWindow({
        width:720,
        height:520,
        useContentSize: true,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    });
    win.loadFile('index.html');
}

app.whenReady().then(() => {
    createWindow();
});
app.on('window-all-closed', () => {
    app.quit();
});