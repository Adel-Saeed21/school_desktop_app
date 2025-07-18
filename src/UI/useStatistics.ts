import { useEffect, useState } from "react";

export function useStatistics(dataPointCount:number):Statistics[]{

    const [value,setValue]=useState<Statistics[]>([]);
    useEffect(()=>{
      const unSub=  window.electron.subscribeStatistics((stats)=>setValue(prev=>{
        const newData= [...prev,stats];

        if(newData.length>dataPointCount){
            newData.shift();
        }

        return newData;
      }));
      return unSub; 
      },[])



      return value;
}