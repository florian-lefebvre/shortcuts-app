"use strict";
import path from "path";
/* global __static */
import { app, protocol, BrowserWindow, session } from "electron"; //Notification
import { createProtocol } from "vue-cli-plugin-electron-builder/lib";
import installExtension, { VUEJS_DEVTOOLS } from "electron-devtools-installer";
import { autoUpdater } from "electron-updater";
const isDevelopment = process.env.NODE_ENV !== "production";
app.setAppUserModelId(process.execPath);

protocol.registerSchemesAsPrivileged([
  { scheme: "app", privileges: { secure: true, standard: true } },
]);

async function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
      webviewTag: true,
      webSecurity: false,
    },
    icon: path.join(__static, "icon.png"),
  });
  win.maximize();
  if (process.env.WEBPACK_DEV_SERVER_URL) {
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL);
    if (!process.env.IS_TEST) win.webContents.openDevTools();
  } else {
    createProtocol("app");
    win.loadURL("app://./index.html");
  }
}

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

app.on("ready", async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    try {
      await installExtension(VUEJS_DEVTOOLS);
    } catch (e) {
      console.error("Vue Devtools failed to install:", e.toString());
    }
  }
  createWindow();
  session.defaultSession.webRequest.onBeforeSendHeaders((details, callback) => {
    details.requestHeaders["User-Agent"] =
      "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.121 Safari/537.36";
    details.requestHeaders["Referer"] = "http://localhost:8080/";
    callback({ cancel: false, requestHeaders: details.requestHeaders });
  });
});

autoUpdater.allowPrerelease = true;

// function sendNotification(body) {
//   console.log(body);
//   const notification = {
//     title: "Shortcuts app",
//     body: body,
//     icon: path.join(__static, "icon.png"),
//   };
//   new Notification(notification).show();
// }

// autoUpdater.on("checking-for-update", () => {
//   sendNotification("Checking for update...");
// });
// autoUpdater.on("update-available", (info) => {
//   sendNotification("Update available. " + info);
// });
// autoUpdater.on("update-not-available", (info) => {
//   sendNotification("Update not available. " + info);
// });
// autoUpdater.on("error", (err) => {
//   sendNotification("err: " + err);
// });
// let startedDownload = false;
// autoUpdater.on("download-progress", (progressObj) => {
//   if (!startedDownload) {
//     startedDownload = true;
//     sendNotification("Started download... " + progressObj.percent + "%");
//   }
// });
// autoUpdater.on("update-downloaded", (info) => {
//   sendNotification("Update downloaded. " + info);
// });

// app.on("ready", function() {
//   autoUpdater.checkForUpdatesAndNotify();
// });

if (isDevelopment) {
  if (process.platform === "win32") {
    process.on("message", (data) => {
      if (data === "graceful-exit") {
        app.quit();
      }
    });
  } else {
    process.on("SIGTERM", () => {
      app.quit();
    });
  }
}
