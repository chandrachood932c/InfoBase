import React, { useContext } from "react";
import lighthouse from "@lighthouse-web3/sdk";

import CreateMeetContext from "@/context/MeetContext";

import lighthouseUpload from "../utils/fileUpload";

const LIGHT_HOUSE_API_KEY = "f9193064.516cd9797f1b4f3eb867ec0e69cce141";

const AddworkModal = () => {
  const {
    toggleAddworkModal,
    currentProfile,
    setToggleAddworkModal,
    addWork,
    workForm,
    setWorkForm,
    storeFiles,
    thumbnail,
    setThumbnail,
  } = useContext(CreateMeetContext);

  const handleAddWork = async () => {
    const res = await addWork(
      workForm,
      currentProfile.researcherId,
      currentProfile.researcherAddress
    );
    console.log("Added work: ", res);
    setToggleAddworkModal(false);
  };

  const uploadFile = async (e) => {
    e.persist();
    const output = await lighthouseUpload(e, LIGHT_HOUSE_API_KEY);
    console.log("File Status:", output);

    const link = `https://gateway.lighthouse.storage/ipfs/${output.data.Hash}`;
    setWorkForm({ ...workForm, uploadFile: link });

    console.log(
      "Paper at https://gateway.lighthouse.storage/ipfs/" + output.data.Hash
    );
  };

  const uploadThumbnail = async (e) => {
    e.persist();
    const output = await lighthouseUpload(e, LIGHT_HOUSE_API_KEY);
    console.log("File Status:", output);

    const link = `https://gateway.lighthouse.storage/ipfs/${output.data.Hash}`;
    setWorkForm({ ...workForm, uploadThumbnail: link });

    console.log(
      "Thumbnail at https://gateway.lighthouse.storage/ipfs/" + output.data.Hash
    );
  };

  return (
    <div className='w-[550px] h-[320px] bg-[#1a1a1d] border border-[#313134] rounded-[20px] text-white flex flex-col items-start justify-between z-30 p-[20px] relative'>
      <button
        className='btn btn-square bg-[#6f2232] hover:bg-[#641f2d] absolute -right-[25px] -top-[25px]'
        onClick={() => setToggleAddworkModal(false)}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='h-6 w-6'
          fill='none'
          viewBox='0 0 24 24'
          stroke='#fff'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            d='M6 18L18 6M6 6l12 12'
          />
        </svg>
      </button>

      <div className='flex flex-col gap-[4px]'>
        <p className='font-semibold text-[18px] text-[#c3073f] flex items-center gap-[8px]'>
          Title:
          <input
            type='text'
            id='title'
            placeholder='Enter alias'
            className='w-[300px] px-[10px] py-[5px] rounded-[5px] outline-none bg-[#1a1a1d] text-white font-normal text-[16px] placeholder:text-[#ffffff48]'
            onChange={(e) =>
              setWorkForm({ ...workForm, title: e.target.value })
            }
          />
        </p>
        <p className='font-semibold text-[18px] text-[#c3073f] flex items-center gap-[8px]'>
          Description:
          <input
            type='text'
            id='description'
            placeholder='Enter department'
            className='w-[300px] px-[10px] py-[5px] rounded-[5px] outline-none bg-[#1a1a1d] text-white font-normal text-[16px] placeholder:text-[#ffffff48]'
            onChange={(e) =>
              setWorkForm({ ...workForm, description: e.target.value })
            }
          />
        </p>
        <p className='font-semibold text-[18px] text-[#c3073f] flex items-center gap-[8px]'>
          Department:
          <input
            type='text'
            id='department'
            placeholder='Enter department'
            className='w-[300px] px-[10px] py-[5px] rounded-[5px] outline-none bg-[#1a1a1d] text-white font-normal text-[16px] placeholder:text-[#ffffff48]'
            onChange={(e) =>
              setWorkForm({ ...workForm, department: e.target.value })
            }
          />
        </p>
        <p className='font-semibold text-[18px] text-[#c3073f] flex items-center gap-[8px]'>
          Upload paper:
          <input
            type='file'
            id='uploadFile'
            min={1}
            placeholder='Enter upload file'
            className='w-[300px] px-[10px] py-[5px] rounded-[5px] outline-none bg-[#1a1a1d] text-white font-normal text-[16px] placeholder:text-[#ffffff48]'
            onChange={(e) => {
              uploadFile(e);
            }}
          />
        </p>
        <p className='font-semibold text-[18px] text-[#c3073f] flex items-center gap-[8px]'>
          Thumbnail:
          <input
            type='file'
            id='uploadThumbnail'
            min={1}
            placeholder='Enter upload file'
            className='w-[300px] px-[10px] py-[5px] rounded-[5px] outline-none bg-[#1a1a1d] text-white font-normal text-[16px] placeholder:text-[#ffffff48]'
            onChange={(e) => {
              uploadThumbnail(e);
            }}
          />
        </p>
      </div>

      <div className='flex items-center justify-center w-full '>
        <button
          className='btn bg-[#c3073f] text-[#1a1a1d] text-[15px] px-[50px] hover:bg-[#b00639] -mt-[0px]'
          onClick={() => handleAddWork()}
        >
          Upload
        </button>
      </div>
    </div>
  );
};

export default AddworkModal;
