import { useEffect, useRef, useState } from "react";
import "./App.css";
import NavigationBar from "./components/NavigationBar";
import Player from "./components/Player";
import ISong from "./interfaces/song.interface";
import axios from "axios";

function App() {
  let audioRef = useRef(new Audio());

  let [isPlaying, setIsPlaying] = useState<boolean>(false);
  let [nowPlaying, setNowPlaying] = useState<ISong>({
    type: "",
    videoId: "",
    authorId: "",
    title: "",
    duration: "",
    author: ""
  });

  function changeState() {
    setIsPlaying(!isPlaying);
  }

  function playSong(id: string) {
    console.log(id);
    axios
      .get(`https://yt.funami.tech/api/v1/videos/${id}`)
      .then((res) => {
        setNowPlaying(res.data);
      })
      .catch();
  }

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    if (nowPlaying.adaptiveFormats) {
      audioRef.current.src = nowPlaying.adaptiveFormats[2].url;
      audioRef.current.play();
      setIsPlaying(true);
    }
  }, [nowPlaying]);

  return (
    <>
      <div className="container">
        <Player setIsPlaying={changeState} isPlaying={isPlaying} data={nowPlaying}/>
        <NavigationBar playSong={playSong} />
      </div>
    </>
  );
}

export default App;
