import React, { useContext, useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

import { Navbar } from "@/components";
import CreateMeetContext from "@/context/MeetContext";
import TableRow from "@/components/TableRow";

const funding = () => {
  const {
    fundingAmount,
    setFundingAmount,
    isFund,
    setIsFund,
    exploreResearchers,
    matchingValue,
    depositToMainPool,
    getMatchingBalance,
    date,
    setDate,
    setDeadline,
  } = useContext(CreateMeetContext);

  const [poolAmount, setPoolAmount] = useState(0);
  const [value, onChange] = useState(new Date());
  const [isCalender, setIsCalender] = useState(false);
  const [dateModal, setDateModal] = useState(false);

  const handlePoolFund = async () => {
    const res = await depositToMainPool(fundingAmount);
    console.log("Funding to main pool: ", res);
  };

  useEffect(() => {
    (async () => {
      let result = await getMatchingBalance();
      console.log("Matching pool balance: ", result);
    })();
  }, []);

  const handleDateClicked = async () => {
    console.log("date => ", date);
    await setDeadline(date);

    setDateModal(false);
  };

  return (
    <div>
      <Navbar explore />

      <div className='nav-h flex flex-col items-center'>
        <div className='flex flex-row relative items-center mt-[30px] '>
          <p className='text-center text-[35px] font-bold text-[#c3073f]'>
            POOL
          </p>
          <button
            className='w-[125px] h-[30px] left-[360px] absolute bg-[#c3073f] text-[#1a1a1d] rounded-[5px] font-semibold transition-all duration-150 ease-in-out'
            onClick={() => {
              setIsFund(!isFund);
            }}
          >
            Fund Pool
          </button>
          <button
            className='w-[135px] h-[30px] right-[375px] absolute bg-[#c3073f] text-[#1a1a1d] rounded-[5px] font-semibold transition-all duration-150 ease-in-out'
            onClick={() => {
              setDateModal(!dateModal);
            }}
          >
            Select Date
          </button>

          {isFund && (
            <div className='absolute top-[50px] left-[325px] h-fit w-fit flex flex-col items-center gap-[20px] bg-[#27272A] p-[20px] rounded-[10px] border border-gray-700'>
              <input
                type='number'
                className='h-[40px] w-[150px] text-white px-[10px] rounded-[10px]'
                min={0}
                onChange={(e) => {
                  setFundingAmount(e.target.value);
                }}
              />

              <button
                className='bg-[#950740] text-[#1a1a1d] px-[30px] py-[5px] rounded-[5px] font-medium uppercase transition-all duration-150 ease-in-out hover:bg-[#7b0534] hover:text-white text-[14px]'
                onClick={(e) => {
                  // setPoolAmount(+fundingAmount + +poolAmount);
                  handlePoolFund();
                  setIsFund(!isFund);
                  console.log(poolAmount);
                }}
              >
                Send
              </button>
            </div>
          )}

          {dateModal && (
            <div className='absolute top-[50px] right-[375px] flex justify-center items-center flex-col gap-[10px]'>
              <div className=' flex flex-col items-center gap-[20px] bg-[#27272A] rounded-[10px] border border-gray-700'>
                <Calendar
                  onChange={onChange}
                  value={value}
                  className='rounded-[10px]'
                  activeStartDate={new Date()}
                  minDate={new Date()}
                  onClickDay={(e) => setDate(e.getTime() / 1000)}
                />
              </div>

              <button
                className='border-[2px] border-[#c3073f] w-fit px-[15px] py-[5px] rounded-[10px]'
                onClick={() => handleDateClicked()}
              >
                Confirm
              </button>
            </div>
          )}
        </div>

        <div className='mt-[20px] mb-[20px] w-[400px] h-[125px] bg-[#4e4e50] rounded-[15px] flex items-center justify-center text-[60px]'>
          <p className='text-[#fff] font-semibold animate-pulse'>
            {matchingValue} MATIC
          </p>
        </div>

        <p className='text-center mt-[50px] text-[35px] text-[#c3073f] font-bold'>
          LEADERBOARD
        </p>

        <div className='mt-[20px] bg-[#4e4e50] text-white px-[50px] py-[30px] rounded-[15px]'>
          <table className='table-auto'>
            <thead>
              <tr>
                <th className='px-[20px] text-[20px] mb-[10px]'>Researcher</th>
                <th className='px-[20px] text-[20px] mb-[10px]'>Upvotes</th>
                <th className='px-[20px] text-[20px] mb-[10px]'>Amount</th>
                <th className='px-[20px] text-[20px] mb-[10px]'>Contribute</th>
              </tr>
            </thead>
            <tbody>
              {exploreResearchers?.map((element, i) => {
                return (
                  <TableRow
                    key={i}
                    myKey={Number(element.id._hex)}
                    element={element}
                  ></TableRow>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default funding;
