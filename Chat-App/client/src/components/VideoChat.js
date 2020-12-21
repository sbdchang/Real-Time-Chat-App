import React, { useState, useCallback, useEffect } from 'react';
import {urlToUse} from "./url";
import Lobby from './Lobby';
import Room from './Room';

const VideoChat = () => {
  const [username, setUsername] = useState('');
  const [roomName, setRoomName] = useState('');
  const [token, setToken] = useState(null);



  // useEffect(() => {
  //   const queryString = window.location.search;
  //   const urlParams = new URLSearchParams(queryString);
  //   const room_name = urlParams.get('room_name');
  //   const user_name = urlParams.get('user_name');
  //   setUsername(user_name);
  //   setRoomName(room_name);
  //   const data = fetch(`${urlToUse.url.API_URL}/video/token`, {
  //     method: 'POST',
  //     body: JSON.stringify({
  //       identity: username,
  //       room: roomName
  //     }),
  //     headers: {
  //       'Content-Type': 'application/json'
  //     }
  //   }).then(res => {
  //     const data = res.json();
  //     console.log(data.token);
  //     setToken(data.token);
  //   });
  // }, []);

  const handleUsernameChange = useCallback(event => {
    setUsername(event);
  }, []);

  const handleRoomNameChange = useCallback(event => {
    setRoomName(event);
  }, []);

  const handleSubmit = useCallback(
    async () => {
      // event.preventDefault();
      const data = await fetch(`${urlToUse.url.API_URL}/video/token`, {
        method: 'POST',
        body: JSON.stringify({
          identity: username + "asdfvew",
          room: roomName
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(res => res.json());
      setToken(data.token);
    },
    [roomName, username]
  );

  const handleLogout = useCallback(event => {
    window.location.replace(`${document.location.origin}/mainview?username=${username}`);
  }, [username]);

  let render;
  if (token) {
    render = (
      <Room roomName={roomName} token={token} handleLogout={handleLogout} />
    );
  } else {
    render = (
      <Lobby
        username={username}
        roomName={roomName}
        handleUsernameChange={handleUsernameChange}
        handleRoomNameChange={handleRoomNameChange}
        handleSubmit={handleSubmit}
      />
    );
  }
  return render;
};

export default VideoChat;
