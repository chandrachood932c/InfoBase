import React, { useContext, useEffect } from "react";
import { useRouter } from "next/router";

import CreateMeetContext from "@/context/MeetContext";

const Modal = () => {
  const {
    setToggleModal,
    mintNFT,
    address,
    form,
    setForm,
    addResearcher,
    deployToken,
  } = useContext(CreateMeetContext);

  const handleMint = async (address) => {
    const res = await mintNFT();
    console.log("Mint: ", res);

    if (res) {
      router.push("explore");
    }
  };

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

  const router = useRouter();

  useEffect(() => {
    console.log("🛵 ", form);
  }, [form]);

  return (
    <div className="w-[500px] h-[400px] bg-[#1a1a1d] border border-[#313134] rounded-[20px] text-white flex flex-col items-start justify-between z-30 p-[20px] relative">
      <button
        className="btn btn-square bg-[#6f2232] hover:bg-[#641f2d] absolute -right-[25px] -top-[25px]"
        onClick={() => setToggleModal(false)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="#fff"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      <div className="flex flex-col gap-[4px]">
        <p className="font-semibold text-[18px] text-[#c3073f] flex items-center gap-[8px]">
          Title:
          <input
            type="text"
            id="alias"
            placeholder="Enter alias"
            className="w-[300px] px-[10px] py-[5px] rounded-[5px] outline-none bg-[#1a1a1d] text-white font-normal text-[16px] placeholder:text-[#ffffff48]"
            onChange={(e) => setForm({ ...form, alias: e.target.value })}
          />
        </p>
        <p className="font-semibold text-[18px] text-[#c3073f] flex items-center gap-[8px]">
          Department:
          <input
            type="text"
            id="department"
            placeholder="Enter department"
            className="w-[300px] px-[10px] py-[5px] rounded-[5px] outline-none bg-[#1a1a1d] text-white font-normal text-[16px] placeholder:text-[#ffffff48]"
            onChange={(e) => setForm({ ...form, department: e.target.value })}
          />
        </p>
        <p className="font-semibold text-[18px] text-[#c3073f] flex items-center gap-[8px]">
          Token Symbol:
          <input
            type="text"
            id="symbol"
            placeholder="Enter token symbol"
            className="w-[300px] px-[10px] py-[5px] rounded-[5px] outline-none bg-[#1a1a1d] text-white font-normal text-[16px] placeholder:text-[#ffffff48]"
            onChange={(e) => setForm({ ...form, tokenSymbol: e.target.value })}
          />
        </p>
        <p className="font-semibold text-[18px] text-[#c3073f] flex items-center gap-[8px]">
          Max Supply:
          <input
            type="number"
            id="supply"
            min={1}
            placeholder="Enter max supply"
            className="w-[300px] px-[10px] py-[5px] rounded-[5px] outline-none bg-[#1a1a1d] text-white font-normal text-[16px] placeholder:text-[#ffffff48]"
            onChange={(e) => setForm({ ...form, maxSupply: e.target.value })}
          />
        </p>
      </div>

      <div className="flex items-center justify-center w-full">
        <button
          className="btn bg-[#c3073f] text-[#1a1a1d] text-[15px] px-[50px] hover:bg-[#b00639] -mt-[0px]"
          onClick={() => handleCreateProfile()}
        >
          Create
        </button>
      </div>

      <div className="flex flex-col items-center justify-center w-full gap-[20px]">
        <p>OR</p>

        <p
          className="text-[#767679] text-[14px] hover:text-[#9f9fa1] cursor-pointer transition-all duration-100 ease-in-out"
          onClick={() => {
            handleMint(address);
          }}
        >
          Continue as Scholar <span className="arrow">&rarr;</span>
        </p>
      </div>
    </div>
  );
};

export default Modal;
