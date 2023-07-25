import React from "react";
import Image from "next/image";

import { backanim } from "@/assets";

const Background = () => {
  return (
    <div>
      <div className='absolute w-[100vw] h-[100vh] z-10 white-glassmorphism' />

      <div className='w-[100vw] h-[100vh]'>
        <Image src={backanim} className='h-full w-full absolute' />
      </div>
    </div>
  );
};

export default Background;
