import { app ,BrowserWindow, ipcMain} from "electron";
import { ipcHandle, isDev } from "./util.js";
import { getStaticData, pollResources } from "./resourceManger.js";
import { getPreloadPath, getUIPath } from "./pathResolver.js";

app.on("ready",()=>{
    const mainWindow=new BrowserWindow({
        webPreferences:{
        preload:getPreloadPath(),
        }
    });
    if(isDev()){
        mainWindow.loadURL('http://localhost:5123');

    }else{

    mainWindow.loadFile(getUIPath());

    }

pollResources(mainWindow);
ipcHandle("getStaticData",()=>{
    return getStaticData();
})
});

// function handleGetStaticData(callback:()=>StaticData){
//     ipcMain.handle('getStaticData',callback);
// }
 