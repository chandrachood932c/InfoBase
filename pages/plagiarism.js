import React, { useContext, useState, useCallback } from "react";
import { Triangle } from "react-loader-spinner";
import { useDropzone } from "react-dropzone";

import CreateMeetContext from "@/context/MeetContext";
import lighthouseUpload from "../utils/fileUpload";
import { Navbar } from "@/components";
import axios from "axios";

const Plagiarism = () => {
  const LIGHT_HOUSE_API_KEY = "f9193064.516cd9797f1b4f3eb867ec0e69cce141";

  const { file1, setFile1, file2, setFile2 } = useContext(CreateMeetContext);

  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState("");

  const uploadFile1 = async (e) => {
    e.persist();
    const output = await lighthouseUpload(e, LIGHT_HOUSE_API_KEY);
    console.log("File Status:", output);

    const link = `https://gateway.lighthouse.storage/ipfs/${output.data.Hash}`;
    setFile1(output?.data?.Hash);
    console.log("file1 ", link);

    console.log(
      "Thumbnail at https://gateway.lighthouse.storage/ipfs/" + output.data.Hash
    );
  };

  const uploadFile2 = async (e) => {
    e.persist();
    const output = await lighthouseUpload(e, LIGHT_HOUSE_API_KEY);
    console.log("File Status:", output);

    const link = `https://gateway.lighthouse.storage/ipfs/${output.data.Hash}`;
    setFile2(output?.data?.Hash);
    console.log("file2 ", file2);

    console.log(
      "Thumbnail at https://gateway.lighthouse.storage/ipfs/" + output.data.Hash
    );
  };

  const handlePlagiarism = async () => {
    if (file1 && file2) {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `https://infobase-llm.onrender.com/match_content/file1=${file1}&file2=${file2}`
        );
        setResult(response.data.message);

        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("Something went wrong");
      window.location.reload();
    }
  };

  return (
    <div className='h-[100vh] bg-[#1a1a1d]'>
      <Navbar explore />

      {isLoading ? (
        <div className='w-full flex items-center justify-center mt-[10px]'>
          <Triangle
            height='40'
            width='40'
            color='#c3073f'
            ariaLabel='triangle-loading'
            wrapperStyle={{}}
            wrapperClassName=''
            visible={true}
          />
        </div>
      ) : (
        <div className='w-full flex items-center justify-center mt-[10px]'>
          {file1 && file2 ? (
            <button
              className='btn bg-[#c3073f] text-[#1a1a1d] text-[15px] px-[50px] hover:bg-[#b00639] -mt-[0px]'
              onClick={() => handlePlagiarism()}
            >
              Check Plagiarism
            </button>
          ) : (
            <button className='btn border-[2px] text-white border-[#c3073f] text-[15px] px-[50px] -mt-[0px] hover:cursor-default hover:bg-[#1A1A1D] hover:border-[#c3073f]'>
              ⚠️ Upload both papers
            </button>
          )}
        </div>
      )}

      <div className='flex flex-row h-[calc(100vh-181px)] bg-[#1a1a1d]'>
        <div className='flex-1 flex items-center justify-center border-r border-[#ffffff2f]'>
          <p className='font-semibold text-[18px] text-[#c3073f] flex items-center gap-[8px]'>
            File 1:
            <input
              type='file'
              id='uploadFile1'
              min={1}
              placeholder='Enter upload file'
              className='w-[300px] px-[10px] py-[5px] rounded-[5px] outline-none bg-[#1a1a1d] text-white font-normal text-[16px] placeholder:text-[#ffffff48]'
              onChange={(e) => {
                uploadFile1(e);
              }}
            />
          </p>
        </div>

        <div className='flex-1 flex items-center justify-center border-l border-[#ffffff33]'>
          <p className='font-semibold text-[18px] text-[#c3073f] flex items-center gap-[8px]'>
            File 2:
            <input
              type='file'
              id='uploadFile2'
              min={1}
              placeholder='Enter upload file'
              className='w-[300px] px-[10px] py-[5px] rounded-[5px] outline-none bg-[#1a1a1d] text-white font-normal text-[16px] placeholder:text-[#ffffff48]'
              onChange={(e) => {
                uploadFile2(e);
              }}
            />
          </p>
        </div>
      </div>

      <div className='w-full bg-[#1a1a1d] flex items-center justify-center'>
        <div className='w-[85%] h-fit border border-[#ffffff33] rounded-[10px] p-[10px]'>
          {result === "" ? (
            <p className='opacity-30'>Results...</p>
          ) : (
            <p className='text-white'>{result}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Plagiarism;
