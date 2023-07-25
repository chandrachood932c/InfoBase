import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import { Navbar, AddworkModal } from "@/components";
import { pattern, arr_up, blob, blobBlur } from "@/assets";
import CreateMeetContext from "@/context/MeetContext";

import Researcher from "@/components/Researcher";
import ResearchPapers from "@/components/ResearchPapers";
import Pagination from "@/components/Pagination";
import axios from "axios";

const PaperComponent = ({ exploreResearchPapers }) => {
  return (
    <div className='flex flex-row flex-wrap gap-[80px] items-center justify-center'>
      {exploreResearchPapers?.map((element, i) => {
        return (
          <ResearchPapers
            key={i}
            myKey={Number(element.id._hex)}
            element={element}
          ></ResearchPapers>
        );
      })}
    </div>
  );
};

const explore = () => {
  const {
    exploreResearchers,
    toggleAddworkModal,
    setToggleAddworkModal,
    workForm,
    setWorkForm,
    exploreResearchPapers,
  } = useContext(CreateMeetContext);

  const router = useRouter();

  const handleJoin = (research) => {
    router.push(`/private/${research[5]}`);
  };

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4.5,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(8);

  const lastIndex = currentPage * postsPerPage;
  const firstPost = lastIndex - postsPerPage;
  const currentPosts = exploreResearchPapers?.slice(firstPost, lastIndex);

  return (
    <div>
      {toggleAddworkModal && (
        <div className='fixed z-50 top-0 bottom-0 left-0 right-0 w-[100vw] h-[100vh] flex items-center justify-center bg-gray-600 bg-opacity-10 backdrop-filter backdrop-blur-lg'>
          <AddworkModal />
        </div>
      )}

      <Navbar explore />

      <div className='px-[40px] pb-[20px]'>
        <div className='nav-h'>
          <div className='flex items-center justify-center h-full relative'>
            <Image
              src={blobBlur}
              alt='blob'
              width={200}
              height={200}
              className='w-[600px] h-[600px] opacity-50'
            />
          </div>

          <div className='z-10 h-full w-full absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center'>
            <div className='flex flex-col w-[70%] items-center'>
              <h1 className='text-[50px] text-white font-bold'>
                Explore the world of DeSci
              </h1>
              <p className='w-[70%] mt-[10px] text-gray-300'>
                A platform where each individual is super powered with modern and cutting edge technology to support your passion and help you get recognition for your hard work.
              </p>
            </div>
          </div>

          <div className='mt-[200px] absolute bottom-[70px] left-0 right-0 opacity-50'>
            <div className='icon-scroll' />
          </div>
        </div>

        <div className='flex flex-col pt-[20px]'>
          <div className='flex flex-row justify-between items-center mb-[20px]'>
            <p className='text-[#c3073f] text-[30px] font-semibold '>
              Researchers
            </p>

            <button
              className='text-[#747477] border-2 px-[20px] py-[5px] rounded-[8px] border-[#c3073f] text-[15px] hover:scale-110 hover:bg-[#c3073f] hover:text-[#1a1a1d] transition-all duration-150 ease-in-out font-medium'
              onClick={() => setToggleAddworkModal(true)}
            >
              Add Work +
            </button>
          </div>

          {/* <div className='flex flex-row gap-[50px] w-[100vh - 400px] pb-[15px] transition-transform duration-500 overflow-hidden'>
            {exploreResearchers?.map((element, i) => {
              // console.log("Researcher: ",Number(element.id._hex));
              return (
                <Researcher
                  key={i}
                  myKey={Number(element.id._hex)}
                  element={element}
                ></Researcher>
              );
            })}
          </div> */}
          <Carousel responsive={responsive}>
            {exploreResearchers?.map((element, i) => {
              // console.log("Researcher: ",Number(element.id._hex));
              return (
                <Researcher
                  key={i}
                  myKey={Number(element.id._hex)}
                  element={element}
                ></Researcher>
              );
            })}
          </Carousel>
        </div>

        <div className='flex flex-col pt-[20px] mt-[70px] bg-[#1a1a1d]'>
          <p className='text-[#c3073f] text-[30px] font-semibold mb-[20px]'>
            Research Papers
          </p>
          {/* <Carousel responsive={responsive}>
            {exploreResearchPapers?.map((element, i) => {
              return (
                <ResearchPapers
                  key={i}
                  myKey={Number(element.id._hex)}
                  element={element}
                ></ResearchPapers>
              );
            })}
          </Carousel> */}
          <div className=''>
            <PaperComponent exploreResearchPapers={currentPosts} />

            <div className='text-center mt-[30px]'>
              <Pagination
                totalPosts={exploreResearchPapers.length}
                postsPerPage={postsPerPage}
                setCurrentPage={setCurrentPage}
              />
            </div>
          </div>
        </div>
      </div>
      {/* <video controls autoplay name="media">
    <source src="https://gateway.lighthouse.storage/ipfs/QmdQN5R6F8mU4X8qZ3bUXCnCRNKCeaRZ1L2YjPKrbaEmh8" type="video/webm"/>
  </video> */}
    </div>
  );
};

export default explore;
