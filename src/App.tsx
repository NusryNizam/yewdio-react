import { useEffect, useRef, useState } from "react";
import axios from "axios";

import NavigationBar from "./components/NavigationBar";
import Player from "./components/Player";
import ISong from "./interfaces/song.interface";

import "./App.css";

function App() {
  let audioRef = useRef(new Audio());

  let [isPlaying, setIsPlaying] = useState<boolean>(false);
  let [nowPlaying, setNowPlaying] = useState<ISong>({
    type: "",
    videoId: "",
    authorId: "",
    author: "",
    title: "",
    lengthSeconds: 0,
    videoThumbnails: [],
  });

  function changeState() {
    setIsPlaying(!isPlaying);
  }

  function playSong(id: string) {
    axios
      .get(`https://yt.funami.tech/api/v1/videos/${id}`)
      .then((res) => {
        setNowPlaying(res.data);
      })
      .catch();
  }

  useEffect(() => {
    console.info("36:21: App.tsx");

    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    console.info("47:21: App.tsx");

    if (nowPlaying.adaptiveFormats) {
      audioRef.current.src = nowPlaying.adaptiveFormats[2].url;
      audioRef.current.play();
      setIsPlaying(true);
    }
  }, [nowPlaying]);

  return (
    <>
      <div className="container">
        <NavigationBar playSong={playSong} />
        <Player
          setIsPlaying={changeState}
          isPlaying={isPlaying}
          data={nowPlaying}
        />
      </div>
    </>
  );
}

export default App;
