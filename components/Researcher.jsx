import React, { useContext, useState, useEffect } from "react";
import {
  pattern,
  arr_up,
  profile_1,
  profile_2,
  profile_3,
  profile_4,
  profile_5,
  profile_6,
  profile_7,
  profile_8,
  profile_9,
  profile_10,
} from "@/assets";
import Image from "next/image";
import { useRouter } from "next/router";

import CreateMeetContext from "@/context/MeetContext";

import { shortenAddress } from "@/utils/shortenAddr";

const profilePictures = [
  profile_1,
  profile_2,
  profile_3,
  profile_4,
  profile_5,
  profile_6,
  profile_7,
  profile_8,
  profile_9,
  profile_10,
];

const Researcher = ({ key, myKey, element }) => {
  const router = useRouter();
  const { join, address, mintTokens, vote, checkIfSubscribed } =
    useContext(CreateMeetContext);

  const [subscription, setSubscription] = useState(false);

  const handleJoin = async () => {
    let tokenAddress = element.tokenAddress;
    let researcher = element.researcher;
    console.log("Token Address: ", element.tokenAddress);
    console.log("Researcher Address: ", element.researcher);
    console.log("Scholar Address: ", address);

    const mint = await mintTokens(tokenAddress);
    console.log("Minting response: ", mint);

    if (mint) {
      const response = await join(researcher);
      console.log("Response from joining", response);

      if (response) {
        router.push(`private/${element.researcher}`);
      }
    }
  };

  const handleVote = async () => {
    console.log(myKey);
    const res = await vote(myKey);
    console.log(`Vote to ${myKey} is ${res}`);
  };

  const checkSubscription = async () => {
    const response = await checkIfSubscribed(element.tokenAddress);

    if (response) {
      setSubscription(true);
    }
  };

  const handlePrivate = async () => {
    router.push(`private/${element.researcher}`);
  };

  useEffect(() => {
    (async () => {
      await checkSubscription();
    })();
  }, []);

  return (
    <div className='flex relative flex-col items-center justify-center h-[350px] rounded-[15px] border-[2px] border-dashed border-[#6F2232] bg-[#2f2f3472] min-w-[250px] max-w-[250px]'>
      <div
        className='absolute right-[5px] top-[5px] border border-gray-700 glassmorphism cursor-pointer z-[20] p-[10px] rounded-[10px]'
        onClick={() => handleVote()}
      >
        <Image src={arr_up} width={20} height={20} />
      </div>

      <div className='absolute w-full h-full rounded-[15px] overflow-hidden'>
        <div className='flex flex-col justify-start p-[15px] gap-[5px]'>
          <div className='font-semibold text-[16px] text-white bg-[#2E2E30] border border-[#374151] w-fit px-[10px] rounded-full'>
            #
            <span className='text-[14px] font-semibold text-[#ef3cff] ml-[5px]'>
              {myKey}
            </span>
          </div>

          <div className='w-full flex items-center justify-center my-[15px]'>
            <div className='h-[70px] w-[70px] rounded-full'>
              <Image
                src={profilePictures[myKey - 1]}
                className='rounded-full h-[70px] w-[70px]'
                alt='profile picture'
              ></Image>
            </div>
          </div>

          <p className='font-semibold text-[16px] text-white'>
            Address:{" "}
            <span className='text-[14px] text-[#3eecff] font-semibold'>
              {shortenAddress(element.researcher)}
            </span>
          </p>
          <p className='font-semibold text-[16px] text-white'>
            Name:{"  "}
            <span className='text-[14px] font-normal text-[#A5ACBA]'>
              {element.name}
            </span>
          </p>
          <p className='font-semibold text-[16px] text-white'>
            Department:{" "}
            <span className='text-[14px] font-normal text-[#A5ACBA]'>
              {element.department}
            </span>
          </p>
          <p className='font-semibold text-[16px] text-white'>
            Votes:{" "}
            <span className='text-[14px] font-normal text-[#A5ACBA]'>
              {Number(element.totalVotes._hex)}
            </span>
          </p>
        </div>
      </div>

      {subscription ? (
        <button
          className='absolute bottom-[10px] text-[#747477] border-2 px-[20px] py-[5px] rounded-[8px] border-[#c3073f] text-[15px] hover:scale-110 hover:bg-[#c3073f] hover:text-[#1a1a1d] transition-all duration-150 ease-in-out font-medium'
          onClick={() => handlePrivate()}
        >
          View DAO
        </button>
      ) : (
        <button
          className='absolute bottom-[10px] text-[#747477] border-2 px-[20px] py-[5px] rounded-[8px] border-[#c3073f] text-[15px] hover:scale-110 hover:bg-[#c3073f] hover:text-[#1a1a1d] transition-all duration-150 ease-in-out font-medium'
          onClick={() => handleJoin()}
        >
          JOIN
        </button>
      )}
    </div>
  );
};

export default Researcher;
