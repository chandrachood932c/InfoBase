import { usePeers } from "@huddle01/react/hooks";
import { Audio, Video } from "@huddle01/react/components";
import { useRouter } from "next/router";
import { useRecorder } from "@huddle01/react/app-utils";

const Recorder = () => {
  const { peers } = usePeers();

  const router = useRouter();

  let roomIdFromParams = router.query.roomId?.toString() || "";

  useRecorder(roomIdFromParams, process.env.NEXT_PUBLIC_HUDDLE_PROJECT_ID);

  return (
    <div>
      <div className='grid grid-cols-4'>
        {Object.values(peers)
          .filter((peer) => peer.cam)
          .map((peer) => (
            <Video
              key={peer.peerId}
              peerId={peer.peerId}
              track={peer.cam}
              // debug
            />
          ))}
        {Object.values(peers)
          .filter((peer) => peer.mic)
          .map((peer) => (
            <Audio key={peer.peerId} peerId={peer.peerId} track={peer.mic} />
          ))}
      </div>
    </div>
  );
};

export default Recorder;
