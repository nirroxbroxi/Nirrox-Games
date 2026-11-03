const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1280,
    height: 720,
    title: "Nirrox Games Launcher",
    icon: path.join(__dirname, 'Nirrox Games.png'),
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  // Tu peux charger ton fichier index.html local ou ton URL en ligne
  mainWindow.loadFile('index.html');
  
  // Masquer la barre de menu classique pour un look plus pro
  mainWindow.setMenuBarVisibility(false);
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.app.quit();
});
