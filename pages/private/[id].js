import React, { useContext, useEffect, useRef } from "react";
import { useRouter, Router } from "next/router";
import axios from "axios";
import Image from "next/image";

import { useEventListener, useHuddle01 } from "@huddle01/react";
import { Audio, Video } from "@huddle01/react/components";
import { useRecording } from "@huddle01/react/hooks";

import {
  useAudio,
  useLobby,
  useMeetingMachine,
  usePeers,
  useRoom,
  useVideo,
} from "@huddle01/react/hooks";

import { Navbar, SubscriberCard } from "@/components";
import CreateMeetContext from "@/context/MeetContext";
import { leave, mic, pattern, record, unrecord, video } from "@/assets";
// import {} from "@/utils/hortenAddr";

const Research = () => {
  const videoRef = useRef(null);
  let roomId = "lby-gxub-hjh";

  const { state, send } = useMeetingMachine();

  useEventListener("lobby:cam-on", () => {
    if (state.context.camStream && videoRef.current)
      videoRef.current.srcObject = state.context.camStream;
  });

  useEffect(() => roomId && setRoomId(roomId), []); //on clicking userecord

  // console.log("🏵️ ", roomId);
  const { researchCardAddr, setResearchCardAddr, address, setRoomId } =
    useContext(CreateMeetContext);

  const { initialize, isInitialized } = useHuddle01();
  const { joinLobby } = useLobby();
  const {
    fetchAudioStream,
    produceAudio,
    stopAudioStream,
    stopProducingAudio,
    stream: micStream,
  } = useAudio();
  const {
    fetchVideoStream,
    produceVideo,
    stopVideoStream,
    stopProducingVideo,
    stream: camStream,
  } = useVideo();
  const { joinRoom, leaveRoom } = useRoom();
  const {
    startRecording,
    stopRecording,
    error,
    data: recData,
    inProgress,
  } = useRecording();

  useEffect(() => {
    console.log("recdata -> ", { recData });
  }, [recData]);

  const { peers } = usePeers();

  const router = useRouter();
  const params = router.query.id?.toString();

  useEffect(() => {
    setResearchCardAddr(params);
    console.log("🚨 ", params);
  }, params);

  useEffect(() => {
    initialize(process.env.NEXT_PUBLIC_HUDDLE_PROJECT_ID);
  }, []);

  return (
    <div className='h-[100vh]'>
      <Navbar explore />

      <div className='w-full flex flex-col items-center mt-[20px] bg-[#1a1a1d]'>
        <p className='text-[25px] text-[#c3073f] font-semibold mb-[10px]'>
          Private Interactions
        </p>

        <div className='flex flex-row gap-[50px] flex-wrap items-center justify-center bg-[#4e4e504b] w-[95%] rounded-[20px] py-[20px] border border-[#4e4e50]'>
          <button
            className='btn btn-outline border-[2px] px-[20px] text-[12px] border-[#950740] text-[#c3073f] rounded-full hover:bg-[#950740] hover:border-[#950740] hover:text-[#1a1a1d]'
            onClick={() => {
              initialize("KL1r3E1yHfcrRbXsT4mcE-3mK60Yc3YR");
              joinLobby("lby-gxub-hjh");
            }}
          >
            join lobby
          </button>
          <button
            className='btn btn-outline rounded-full border-[2px]  px-[20px] text-[12px] border-[#950740] text-[#c3073f] hover:bg-[#313134] hover:border-[#950740] hover:text-[#1a1a1d]'
            onClick={fetchVideoStream}
            // disabled={!fetchVideoStream.isCallable}
          >
            <Image src={video} className='w-[24px] h-[24px] ' />
          </button>
          <button
            className='btn btn-outline rounded-full border-[2px]  px-[20px] text-[12px] border-[#950740] text-[#c3073f] hover:bg-[#313134] hover:border-[#950740]'
            onClick={fetchAudioStream}
            // disabled={!fetchVideoStream.isCallable}
          >
            <Image src={mic} className='w-[24px] h-[24px] ' />
          </button>

          <button
            className='btn btn-outline border-[2px] px-[20px] text-[12px] border-[#950740] text-[#c3073f] rounded-full hover:bg-[#950740] hover:border-[#950740] hover:text-[#1a1a1d]'
            onClick={() => joinRoom()}
          >
            join room
          </button>

          <button
            // disabled={!startRecording.isCallable}
            className='btn btn-outline rounded-full border-[2px]  px-[20px] text-[12px] border-[#950740] text-[#c3073f] hover:bg-[#313134] hover:border-[#950740]'
            onClick={() => {
              startRecording(`https://info-base.vercel.app/rec/${roomId}`);
            }}
          >
            <Image src={record} className='w-[24px] h-[24px] ' />
          </button>

          <button
            // disabled={!startRecording.isCallable}
            className='btn btn-outline rounded-full border-[2px]  px-[20px] text-[12px] border-[#950740] text-[#c3073f] hover:bg-[#313134] hover:border-[#950740]'
            onClick={() => stopRecording()}
          >
            <Image src={unrecord} className='w-[25px] h-[25px] ' />
          </button>

          <button
            // disabled={!produceAudio.isCallable}
            onClick={() => produceAudio(micStream)}
            className='btn btn-outline border-[2px]  px-[20px] text-[12px] border-[#950740] text-[#c3073f] hover:bg-[#950740] hover:border-[#313134] hover:text-[#1a1a1d]'
          >
            PRODUCE_MIC
          </button>

          <button
            // disabled={!produceVideo.isCallable}
            onClick={() => produceVideo(camStream)}
            className='btn btn-outline border-[2px]  px-[20px] text-[12px] border-[#950740] text-[#c3073f] hover:bg-[#950740] hover:border-[#950740] hover:text-[#1a1a1d]'
          >
            PRODUCE_CAM
          </button>

          <button
            // disabled={!stopProducingAudio.isCallable}
            onClick={() => stopProducingAudio()}
            className='btn btn-outline border-[2px]  px-[20px] text-[12px] border-[#950740] text-[#c3073f] hover:bg-[#950740] hover:border-[#950740] hover:text-[#1a1a1d]'
          >
            STOP_PRODUCING_MIC
          </button>

          <button
            // disabled={!stopProducingVideo.isCallable}
            onClick={() => stopProducingVideo()}
            className='btn btn-outline border-[2px]  px-[20px] text-[12px] border-[#950740] text-[#c3073f] hover:bg-[#950740] hover:border-[#950740] hover:text-[#1a1a1d]'
          >
            STOP_PRODUCING_CAM
          </button>

          <button
            // disabled={!leaveRoom.isCall`able}
            onClick={leaveRoom}
            className='btn btn-outline rounded-full border-[2px]  px-[20px] text-[12px] border-[#950740] text-[#c3073f] hover:bg-[#313134] hover:border-[#950740]'
          >
            <Image src={leave} className='w-[24px] h-[24px]' />
          </button>
        </div>

        <div className='py-[20px] flex flex-col items-center justify-center'>
          <p className='mb-[10px] font-medium text-[16px]'>
            Researcher address:
            <span className='text-white ml-[5px]'>{researchCardAddr}</span>
          </p>
          <video
            className='rounded-[15px] w-[400px] mb-[30px]'
            ref={videoRef}
            autoPlay
            muted
          ></video>
          <div className='flex flex-col gap-[10px] items-center justify-center'>
            {Object.values(peers)
              .filter((peer) => peer.cam)
              .map((peer) => (
                <Video
                  key={peer.peerId}
                  peerId={peer.peerId}
                  track={peer.cam}
                  debug
                  className='rounded-[15px] w-[300px]'
                />
              ))}
            {Object.values(peers)
              .filter((peer) => peer.mic)
              .map((peer) => (
                <Audio
                  key={peer.peerId}
                  peerId={peer.peerId}
                  track={peer.mic}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// export const getServerSideProps = async () => {
//   try {
//     const resp = await axios.post(
//       "https://api.huddle01.com/api/v1/create-room",
//       {
//         title: "JOY",
//         // roomLock: false,
//       },
//       {
//         headers: {
//           "Content-Type": "application/json",
//           "x-api-key": process.env.NEXT_PUBLIC_HUDDLE_API_KEY,
//         },
//       }
//     );

//     const { data } = resp;

//     const roomId = data.data.roomId;

//     return {
//       props: {
//         roomId,
//       },
//     };
//   } catch (error) {
//     console.error("🏆🏆🏆 Error fetching data:", error);
//     return {
//       props: {
//         roomId: null,
//       },
//     };
//   }
// };

export default Research;
