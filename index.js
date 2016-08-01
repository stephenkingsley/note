'use strict';

const fs = require('fs');
const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
let mainWindow;
const storagePath = '.stephenkingsley_is_awesome';

const isFolderExistAndMkdirTheFolder = () => {
  try {
    fs.statSync(`${__dirname}/${storagePath}/`);
  } catch (err) {
    fs.mkdirSync(`${__dirname}/${storagePath}/`);
  }
};

isFolderExistAndMkdirTheFolder();

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 1024,
    height: 700,
    titleBarStyle: 'hidden-inset',
    title: 'Awesome-Note',
    transparent: true
  });
  mainWindow.loadURL(`file://${__dirname}/index.html`);
  fs.watch(`${__dirname}/${storagePath}/`, () => {
    mainWindow.webContents.send('ping', 'FILE CHANGED');
  });
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
};

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
