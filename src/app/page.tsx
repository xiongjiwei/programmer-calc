"use client"

import * as React from "react";
import Home from "./main";
import { NextUIProvider } from "@nextui-org/react";

export default function App() {
  return (
    <NextUIProvider className='bg-red-50 h-screen w-screen flex justify-center items-center'>
      <Home />
    </NextUIProvider>
  )
}
