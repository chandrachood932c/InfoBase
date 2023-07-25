import "@/styles/globals.css";

import { CreateMeetProvider } from "@/context/MeetContext";
import { useHuddle01 } from "@huddle01/react";
import { useEffect } from "react";
import dynamic from "next/dynamic";

const AnimatedCursor = dynamic(() => import("react-animated-cursor"), {
  ssr: false,
});

export default function App({ Component, pageProps }) {
  const { initialize } = useHuddle01();

  useEffect(() => {
    initialize(process.env.NEXT_PUBLIC_HUDDLE_PROJECT_ID);
  }, []);

  return (
    <CreateMeetProvider>
      <div>
        <AnimatedCursor
          innerSize={8}
          outerSize={50}
          // color='193, 11, 111'
          outerAlpha={0.2}
          innerScale={0.7}
          outerScale={2}
          outerStyle={{
            border: "3px solid #9ba0a8",
            backgroundColor: "transparent",
          }}
          innerStyle={{
            backgroundColor: "#9ba0a8",
          }}
        />
      </div>
      <Component {...pageProps} />
    </CreateMeetProvider>
  );
}
