import { JitsiMeeting } from "@jitsi/react-sdk";
import React, { useEffect, useState } from "react";
import Loader from "./Loader";
import { useParams } from "react-router-dom";
const handleAPI = (JitsiMeetAPI) => {
  JitsiMeetAPI.executeCommand("toggleVideo");
};
const Jitsi = () => {
  let { roomName, displayName } = useParams();
  const [displayNameObjState, setDisplayNameObjState] = useState();
  const [roomNameState, setRoomNameState] = useState("");

  useEffect(() => {
    setDisplayNameObjState({
      displayName: displayName,
    });
    setRoomNameState(roomName);
  }, [displayName, roomName]);
  return (
    <JitsiMeeting
      onAPILoad={handleAPI}
      // domain={domain}
      spinner={Loader}
      configOverwrite={{
        startWithAudioMuted: true,
        hiddenPremeetingButtons: ["microphone"],
      }}
      userInfo={displayNameObjState}
      roomName={roomNameState}
    />
  );
};

export default Jitsi;
