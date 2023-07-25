import React from "react";
import Image from "next/image";

import { pattern } from "@/assets";

const Info = () => {
  return (
    <div>
      <div className='card w-[250px] h-[350px] bg-base-100 shadow-xl overflow-hidden'>
        <figure>
          <Image src={pattern} alt='Shoes' className='h-fit w-fit' />
        </figure>

        <div className='bg-white backdrop-filter backdrop-blur-md bg-opacity-10 absolute bottom-0 w-full py-[20px]'>
          <div className='card-actions justify-center'>
            <button className='btn btn-primary bg-[#950740] border-none hover:bg-[#86063a] w-[150px] text-[#1a1a1d] text-[16px] font-semibold'>
              INFO
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Info;
