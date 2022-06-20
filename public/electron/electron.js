const { app, BrowserWindow } = require("electron");
const path = require("path");
const isDev = require("electron-is-dev");

require("@electron/remote/main").initialize();

const createWindow = () => {
    const window = new BrowserWindow({
        width: 800,
        height: 500,
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true
        }
    });

    window.setMenu(null);

    window.loadURL(isDev ? "http://localhost:3000" : `file://${path.join(__dirname,"../build/index.html")}`);
}

// Launches the electron app when electron is ready
app.whenReady().then(() => {
    createWindow();

    // Creates the window again for macOS
    app.on("activate", () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

app.on("window-all-closed", () => {
    // macOS likes to minimize when closed unless explicitly closed by user
    if (process.platform !== "darwin") {
        app.quit();
    }
});