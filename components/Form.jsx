import React, { useContext } from "react";
import { useRouter } from "next/router";

import CreateMeetContext from "@/context/MeetContext";

const Form = () => {
  const { form, setForm, address, mintNFT, deployToken, addResearcher } = useContext(CreateMeetContext);

  const router = useRouter();

  const handleCreateProfile = async () => {
    const resToken = await deployToken(form);
    console.log("Res: ", typeof resToken);
    const res = await mintNFT();
    console.log("Mint: ", res);
    const resProfile = await addResearcher(form, resToken);
    console.log("Profile Creation: ", resProfile);

    if (resProfile) {
      router.push("explore");
    }
  };

  const handleMint = async (address) => {
    const res = await mintNFT();
    console.log("Mint: ", res);

    if (res) {
      router.push("explore");
    }
  };

  return (
    <div>
      <div className='h-[500px] w-[500px] rounded-[15px] border-2 mt-[30px] border-[#6F2232] glassmorphism'>
        <div className='flex flex-col gap-[20px] p-[20px]'>
          <p className='text-[#767679] font-semibold text-center w-full text-[22px]'>
            REGISTER
          </p>
          <p className='font-semibold text-[18px] text-[#c3073f] flex items-center gap-[8px]'>
            Alias:
            <input
              type='text'
              id='alias'
              placeholder='Enter alias'
              className='w-[300px] px-[10px] py-[5px] rounded-[5px] outline-none bg-transparent text-white font-normal text-[16px] placeholder:text-[#ffffff48]'
              onChange={(e) => setForm({ ...form, alias: e.target.value })}
            />
          </p>
          <p className='font-semibold text-[18px] text-[#c3073f] flex items-center gap-[8px]'>
            Department:
            <input
              type='text'
              id='department'
              placeholder='Enter department'
              className='w-[300px] px-[10px] py-[5px] rounded-[5px] outline-none bg-transparent text-white font-normal text-[16px] placeholder:text-[#ffffff48]'
              onChange={(e) => setForm({ ...form, department: e.target.value })}
            />
          </p>
          <p className='font-semibold text-[18px] text-[#c3073f] flex items-center gap-[8px]'>
            Token Symbol:
            <input
              type='text'
              id='symbol'
              placeholder='Enter token symbol'
              className='w-[300px] px-[10px] py-[5px] rounded-[5px] outline-none bg-transparent text-white font-normal text-[16px] placeholder:text-[#ffffff48]'
              onChange={(e) =>
                setForm({ ...form, tokenSymbol: e.target.value })
              }
            />
          </p>
          <p className='font-semibold text-[18px] text-[#c3073f] flex items-center gap-[8px]'>
            Max Supply:
            <input
              type='number'
              id='supply'
              min={1}
              placeholder='Enter max supply'
              className='w-[300px] px-[10px] py-[5px] rounded-[5px] outline-none bg-transparent text-white font-normal text-[16px] placeholder:text-[#ffffff48]'
              onChange={(e) => setForm({ ...form, maxSupply: e.target.value })}
            />
          </p>
        </div>

        <div className='flex items-center justify-center w-full mt-[80px]'>
          <button
            className='btn bg-[#c3073f] text-[#1a1a1d] text-[15px] px-[50px] hover:bg-[#b00639] -mt-[0px]'
            onClick={() => handleCreateProfile()}
          >
            Create
          </button>
        </div>

        <p
          className='text-[#767679] text-[14px] hover:text-[#9f9fa1] cursor-pointer transition-all duration-100 ease-in-out absolute text-center w-full bottom-[5px]'
          onClick={() => {
            handleMint(address);
          }}
        >
          Continue as Scholar <span className='arrow'>&rarr;</span>
        </p>
      </div>
    </div>
  );
};

export default Form;
