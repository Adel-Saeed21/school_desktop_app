import { ipcMain } from "electron";

export function isDev():boolean{
    return process.env.NODE_ENV==='development';
}

export function ipcHandle<Key extends keyof EventPayloadMapping>(key:Key,
    handler:()=>EventPayloadMapping[
    Key
]){
    ipcMain.handle(key,()=>handler());
}


// export function ipcMainHandle<Key extends keyof EventPayloadMapping>(
//     Key:Key,
//     handler:()=>EventPayloadMapping[Key]){

//         ipcMain.handle(Key,(event)=>{
//             console.log(1);
//             validateEventFrame(event.senderFrame);
//            return handler();
//         });
//     }




