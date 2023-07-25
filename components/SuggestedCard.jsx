import React from "react";
import Link from "next/link";

import { shortenAddress } from "@/utils/shortenAddr";

const SuggestedCard = ({ key, myKey, element, currentSuggestionsSim }) => {
  return (
    <div className='relative min-w-[250px] max-w-[250px]  h-[400px] rounded-[15px] border-[2px] border-dashed border-[#6F2232] bg-[#2f2f3472]'>
      <div className='flex flex-col justify-start p-[15px] gap-[5px]'>
        <div>
          <img
            src='https://images.unsplash.com/photo-1639322537504-6427a16b0a28?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2064&q=80'
            className='w-full h-[150px] rounded-[10px] mb-[5px]'
          />
        </div>

        <p className='font-semibold text-[16px] text-white'>
          SIMILARITY:{" "}
          <span className='text-[14px] font-semibold text-[#9aff3c]'>
            {/* {element && Number(element)} */}
            {currentSuggestionsSim[myKey].toFixed(2)} %
          </span>
        </p>
        <p className='font-semibold text-[16px] text-white'>
          Profile ID:{" "}
          <span className='text-[14px] font-semibold text-[#ef3cff]'>
            {/* {element && Number(element)} */}
            {Number(element.profileId._hex)}
          </span>
        </p>
        <p className='font-semibold text-[16px] text-white'>
          Address:{" "}
          <span className='text-[14px] text-[#3eecff] font-semibold'>
            {/* {element && shortenAddress(element.researcher)} */}
            {shortenAddress(element.researcher)}
          </span>
        </p>
        <div
          className='font-semibold text-[16px] text-white max-w-full tooltip flex justify-start items-center gap-[4px] tooltip-error'
          data-tip={element?.title}
        >
          <p>Title:{"  "}</p>
          <p className='text-[14px] font-normal text-[#A5ACBA] truncate overflow-hidden whitespace-nowrap mt-[2px]'>
            {element?.title}
          </p>
        </div>
        <div
          className='font-semibold text-[16px] text-white max-w-full tooltip flex justify-start items-center gap-[4px] tooltip-error'
          data-tip={element?.desc}
        >
          <p>Description:{"  "}</p>
          <p className='text-[14px] font-normal text-[#A5ACBA] truncate overflow-hidden whitespace-nowrap mt-[2px]'>
            {element?.desc}
          </p>
        </div>
        <p className='font-semibold text-[16px] text-white'>
          Department:{" "}
          <span className='text-[14px] font-normal text-[#A5ACBA]'>
            {element.department}
          </span>
        </p>
      </div>

      {/* <div className=' w-full flex items-center justify-center'>
        <Link
          href={{
            pathname: `/info`,
            query: { element },
          }}
          className='absolute bottom-[10px] text-[#747477] border-2 px-[20px] py-[5px] rounded-[8px] border-[#c3073f] text-[15px] hover:scale-110 hover:bg-[#c3073f] hover:text-[#1a1a1d] transition-all duration-150 ease-in-out font-medium'
          onClick={() => handleInfo()}
        >
          INFO
        </Link>
      </div> */}
    </div>
  );
};

export default SuggestedCard;
