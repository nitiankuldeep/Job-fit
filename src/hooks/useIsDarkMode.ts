"use client"
import { useEffect, useState } from "react";

export function useIsDarkMode(){
    const [isDarkMode,SetIsDarkMode]=useState(()=>{
        if(typeof window==="undefined") return false;

        return window.matchMedia("(prefers-color-scheme:dark)").matches;
    })
    useEffect(()=>{
        const controller= new AbortController();
        window.matchMedia("(prefers-color-scheme:dark)").addEventListener("change",e=>{
            SetIsDarkMode(e.matches)
        },{signal:controller.signal})
        return ()=>{
            controller.abort();
        }
    })
    return isDarkMode;
}