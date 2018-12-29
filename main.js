'use strict';

const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const ipc = electron.ipcMain;
const normalizedPath = require("path").join(__dirname, "lib");

const carcosa = require('./lib/carcosa.js');

function createWindow () {
	var win = new BrowserWindow(
		{ width: 800, height: 600 }
	)
	win.setMenu(null);

	win.loadFile('app/index.html');
}

ipc.on('carcosa:list', (event, args) => {
	carcosa.list((items) => {
		event.sender.send('carcosa:list', items);
	})
})

ipc.on('carcosa:get', (event, key) => {
	carcosa.get(key, (value) => {
		event.sender.send('carcosa:get', value)
	})
})

//app.on('browser-window-created', (e, window) => {
//	window.setMenu(null);
//});

app.on('ready', createWindow);
