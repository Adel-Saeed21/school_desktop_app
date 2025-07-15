import { ipcMain, WebContents, WebFrameMain } from "electron";
import { Key } from "react";
import { getUIPath } from "./pathResolver.js";
import {pathToFileURL}from 'url';

export function isDev():boolean{
    return process.env.NODE_ENV==='development';
}

export function ipcHandle<Key extends keyof EventPayloadMapping>(key:Key,
    handler:()=>EventPayloadMapping[
    Key
]){
    ipcMain.handle(key, async (event) => {
  const senderFrame = event.senderFrame;

  if (!senderFrame) {
    throw new Error('Invalid frame: senderFrame is null (possibly destroyed or navigated)');
  }

  validateEventFrame(senderFrame);
  return handler(); 
});
}

export function ipcWebContentsSend<Key extends keyof EventPayloadMapping>(
  key: Key,
  webContents: WebContents,
  payload: EventPayloadMapping[Key]
) {
  webContents.send(key, payload);
}


export function validateEventFrame(frame:WebFrameMain){
    if(isDev()&& new URL(frame.url).host==='localhost:5123'){
        return;
    }
    if(frame.url!==pathToFileURL(getUIPath()).toString()){
        throw new Error("malicious event ");
    }
}




