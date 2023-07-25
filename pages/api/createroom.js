// const axios = require("axios");
import axios from "axios";
import { useContext } from "react";

// import CreateMeetContext from "@/context/MeetContext";

export default async function handler(req, res) {
  // const { setRoomId, roomId } = useContext(CreateMeetContext);

  // const apiKey = "YOUR_API_KEY";
  // const url = "https://iriko.testing.huddle01.com/api/v1/create-room";

  // const response = await fetch(url, {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //     Authorization: `Bearer ${apiKey}`,
  //   },
  //   body: JSON.stringify({
  //     // The request body goes here
  //   }),
  // });
  try {
    const { data } = await axios.post(
      "https://api.huddle01.com/api/v1/create-room",
      {
        title: "Huddle01-Test",
        roomLock: false,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "x-api-key": process.env.NEXT_HUDDLE_API_KEY,
        },
      }
    );
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
  // const getRoomId = await axios.get("/");

  // const { data } = response;

  // setRoomId(response.data.roomId);
  // console.log("🚧");
}
