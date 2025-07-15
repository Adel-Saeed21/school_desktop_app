import osUtils from "os-utils";
import fs from 'fs';
import os from 'os';
import { BrowserWindow } from "electron";
import { ipcWebContentsSend } from "./util.js";
import { promises } from "dns";
const POLLING_INTERVAL = 500;

export function pollResources(mainWindow:BrowserWindow) {
  setInterval(async() => {
  const  cpuUsage=await getCpuUsage();
  const ramUsage=getRamUsage();
  const storageData=getStorageData();
  ipcWebContentsSend("statistics",mainWindow.webContents,{cpuUsage,ramUsage, storageUsage:storageData.usage})
  }, POLLING_INTERVAL);
} 

function getCpuUsage(): Promise<number>{
return new Promise(resolve=>{
    osUtils.cpuUsage(resolve);
})
//  osUtils.cpuUsage((percentage) => {
//       console.log(`CPU Usage: ${(percentage * 100).toFixed(2)}%`);
//     });
}
export function getStaticData(): StaticData {
  const totalStorage = getStorageData().total;
  const cpuModel = os.cpus()[0].model;
  const totalMemoryGB = Math.floor(osUtils.totalmem() / 1024);

  return {
    totalStorage,
    totalMemoryGB,
    cpuModel
  };
}


function getRamUsage(){
    return 1- osUtils.freememPercentage();
}

function getStorageData(){
    const stats=fs.statfsSync(process.platform==='win32'?'c://':'/');
    const total=stats.bsize*stats.blocks;
    const free =stats.bsize*stats.bfree;

    return{
        total:Math.floor(total/1_000_000_000),
        usage:1-free/total
    };
}