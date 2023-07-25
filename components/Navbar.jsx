import React, { useContext, useState } from "react";
import { useRouter } from "next/router";

import CreateMeetContext from "@/context/MeetContext";

const Navbar = ({ funding, explore, videojam }) => {
  const router = useRouter();

  return (
    <div className='flex flex-row justify-between z-50 items-center px-[20px] py-[14px] border-b border-b-[#48484aa5] sticky w-full'>
      <div
        className='text-white py-[10px] cursor-pointer'
        onClick={() => router.push("/")}
      >
        InfoBase
      </div>

      {funding && (
        <button
          className='relative btn btn-outline border-[2px] px-[30px] text-[15px] border-[#950740] text-[#c3073f] hover:bg-[#950740] hover:border-[#950740] hover:text-[#1a1a1d]'
          // onClick={() => setIsFund(!isFund)}
        >
          FUND
        </button>
      )}

      {explore && (
        <div className='flex flex-row gap-[20px]'>
          <button
            className='btn btn-outline border-[2px] px-[30px] text-[15px] border-[#950740] text-[#c3073f] hover:bg-[#950740] hover:border-[#950740] hover:text-[#1a1a1d]'
            onClick={() => router.push("/explore")}
          >
            Explore
          </button>
          {/* <button className='btn btn-outline border-[2px] px-[30px] text-[15px] border-[#950740] text-[#c3073f] hover:bg-[#950740] hover:border-[#950740] hover:text-[#1a1a1d]'>
            connect wallet
          </button> */}
          <button
            className='btn btn-outline border-[2px] px-[30px] text-[15px] border-[#950740] text-[#c3073f] hover:bg-[#950740] hover:border-[#950740] hover:text-[#1a1a1d]'
            onClick={() => router.push("/plagiarism")}
          >
            Plagiarism
          </button>
          <button
            className='btn btn-outline border-[2px] px-[30px] text-[15px] border-[#950740] text-[#c3073f] hover:bg-[#950740] hover:border-[#950740] hover:text-[#1a1a1d]'
            onClick={() => router.push("/funding")}
          >
            Fund
          </button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
