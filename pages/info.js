import React, { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import CreateMeetContext from "@/context/MeetContext";
import Link from "next/link";
import { Document, Page } from "react-pdf";
import { pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import { Triangle } from "react-loader-spinner";

import {
  Navbar,
  Researcher,
  ResearchPapers,
  SuggestedCard,
} from "@/components";

// pdfjs.GlobalWorkerOptions.workerSrc = new URL(
//   "pdfjs-dist/build/pdf.worker.min.js",
//   import.meta.url
// ).toString();

// call in server side props

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

const Info = () => {
  const {
    getResearchPaperById,
    currentSuggestionsSim,
    currentSuggestions,
    currPaper,
    currResearcherId,
    language,
    setLanguage,
    isLoading,
    setIsLoading,
  } = useContext(CreateMeetContext);
  const router = useRouter();
  const url = router.asPath;

  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const goToPrevPage = () =>
    setPageNumber(pageNumber - 1 <= 1 ? 1 : pageNumber - 1);

  const goToNextPage = () =>
    setPageNumber(pageNumber + 1 >= numPages ? numPages : pageNumber + 1);

  const handleAudio = async () => {
    try {
      const response = await fetch(
        `https://chainlinkapi-production.up.railway.app/${language}/${Number(
          currPaper?.id?._hex
        )}`
      );
      console.log(response);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const audio = new Audio(url);
      audio.play();
    } catch (error) {
      console.log(error);
    }
  };

  const openWebsiteInNewTab = (url) => {
    window.open(url, "_blank");
  };

  useEffect(() => setLanguage("e"), []);

  return (
    <div className='h-[100vh]'>
      <Navbar explore />

      <div className='p-[20px] bg-[#1a1a1d]'>
        <div className='flex flex-row gap-[30px]'>
          <div className='flex-1 relative'>
            <Document
              file={currPaper?.fileURI}
              onLoadSuccess={onDocumentLoadSuccess}
            >
              <Page
                pageNumber={pageNumber}
                height={700}
                _className='rounded-[20px] rounded-tl-[20px] rounded-bl-[20px]'
              />
            </Document>

            <div className='flex gap-[30px] justify-between px-[20px] mt-[20px] items-center'>
              <button
                onClick={goToPrevPage}
                className='p-[10px] rounded-[15px] border-[2px] border-[#585859] hover:bg-[#585859] transition-all ease-in-out duration-300'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={2}
                  stroke='#fff'
                  className='w-6 h-6'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75'
                  />
                </svg>
              </button>

              <button onClick={() => openWebsiteInNewTab(currPaper?.fileURI)}>
                <button className='p-[10px] px-[20px] rounded-[15px] border-[2px] border-[#585859] hover:bg-[#585859] transition-all ease-in-out duration-300 text-white'>
                  View PDF
                </button>
              </button>

              <button
                onClick={goToNextPage}
                className='p-[10px] rounded-[15px] border-[2px] border-[#585859] hover:bg-[#585859] transition-all ease-in-out duration-300'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={2}
                  stroke='#fff'
                  className='w-6 h-6'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3'
                  />
                </svg>
              </button>
            </div>
          </div>

          <div className='flex h-full flex-[1.5] overflow-hidden'>
            <div className='flex-1 text-white flex flex-col items-start justify-center gap-[20px]'>
              <div className='flex flex-row gap-[5px]'>
                <h3 className='font-bold text-[18px] text-[#c3073f] mr-[70px]'>
                  Thumbnail:
                </h3>
                <img
                  src='https://images.unsplash.com/photo-1639322537504-6427a16b0a28?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2064&q=80'
                  className='w-[250px] h-[250px] rounded-[10px] mb-[5px]'
                />
              </div>
              <div className='flex flex-row gap-[5px]'>
                <h3 className='font-bold text-[18px] text-[#c3073f] mr-[40px]'>
                  Paper ID:
                </h3>
                <p>{Number(currPaper?.id?._hex)}</p>
              </div>
              <div className='flex flex-row gap-[5px]'>
                <h3 className='font-bold text-[18px] text-[#c3073f] mr-[70px]'>
                  Title:
                </h3>
                <p>{currPaper?.title}</p>
              </div>
              <div className='flex flex-row gap-[5px] max-w-[800px] flex-wrap'>
                <h3 className='font-bold text-[18px] text-[#c3073f] mr-[5px]'>
                  Description:
                </h3>
                <p>{currPaper?.desc}</p>
              </div>
              <div className='flex flex-row gap-[5px] truncate max-w-[700px] overflow-hidden items-center'>
                <h3 className='font-bold text-[18px] text-[#c3073f] mr-[80px]'>
                  Link:
                </h3>
                <button onClick={() => openWebsiteInNewTab(currPaper?.fileURI)}>
                  <p className='truncate'>{currPaper?.fileURI}</p>
                </button>
              </div>

              <div className='flex flex-row gap-[5px] items-start justify-center'>
                <h3 className='font-bold text-[18px] text-[#c3073f] mr-[30px]'>
                  Language:
                </h3>
                <select
                  name='language'
                  id='lang'
                  placeholder='Select'
                  className='px-[20px] py-[8px] rounded-md'
                  onChange={(e) => setLanguage(e.target.value)}
                >
                  <option value='e'>English</option>
                  <option value='h'>Hindi</option>
                  <option value='b'>Bengali</option>
                </select>

                <button
                  className='text-[#747477] border-2 px-[20px] py-[5px] rounded-[8px] border-[#c3073f] text-[15px] hover:scale-110 hover:bg-[#c3073f] hover:text-[#1a1a1d] transition-all duration-150 ease-in-out font-medium ml-[50px]'
                  onClick={() => handleAudio()}
                >
                  <div className='flex flex-row gap-[10px]'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 24 24'
                      fill='#747477'
                      className='w-5 h-5'
                    >
                      <path
                        fillRule='evenodd'
                        d='M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z'
                        clipRule='evenodd'
                      />
                    </svg>
                    Play
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className='mt-[70px] bg-[#1a1a1d] h-full'>
          <p className='text-[#c3073f] text-[30px] font-semibold '>Suggested</p>

          {isLoading ? (
            <div className='flex w-full items-center justify-center mt-[40px] mb-[40px]'>
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
            <div className='flex flex-row gap-[40px] mt-[20px]'>
              {currentSuggestions.map((element, i) => {
                return (
                  <SuggestedCard
                    key={i}
                    myKey={i}
                    element={element}
                    currentSuggestionsSim={currentSuggestionsSim}
                  />
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Info;
