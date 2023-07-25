import React, { useContext } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

import { pattern } from "@/assets";
import CreateMeetContext from "@/context/MeetContext";

const Card = ({ btnName }) => {
  const router = useRouter();
  const { toggleModal, setToggleModal } = useContext(CreateMeetContext);

  let scholar = btnName.split(" ").includes("Scholar");

  return (
    <div className='flex relative flex-col items-center justify-center w-[250px] h-[350px] rounded-[15px] border-[2px] border-dashed border-[#6F2232] bg-[#2f2f3472]'>
      <div className='absolute w-full h-full rounded-[15px] overflow-hidden opacity-30 blur'>
        <Image src={pattern} className='select-none' />
      </div>
      {!scholar ? (
        <p className='absolute top-[15px] text-[20px] font-medium'>
          New User
        </p>
      ) : (
        <p className='absolute top-[15px] text-[20px] font-medium'>Scholar</p>
      )}

      {!scholar && (
        <button
          className='btn bg-[#C3073F] hover:bg-[#b00639] text-black font-semibold text-[15px] px-[30px] z-10'
          onClick={() => {
            // router.push("explore");
            setToggleModal(true);
            console.log(toggleModal);
          }}
        >
          Register
        </button>
      )}

      <p className='absolute bottom-[10px] text-[#606062] text-[12px]'>
        {btnName} &rarr;
      </p>
    </div>
  );
};

export default Card;
