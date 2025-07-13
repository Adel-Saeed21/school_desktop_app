
const electron=require("electron");
electron.contextBridge.exposeInMainWorld("electron",{
    subscribeStatistics:(callback:(statistic:any)=>void)=>{
        
        electron.ipcRenderer.on("statistics",(_: any,stats: any)=>{
            callback(stats);
        })
        ,callback({})},
    getStaticData:()=>electron.ipcRenderer.invoke("getStaticData"),
    
})