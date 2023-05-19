import { useEffect, useRef, useState } from "react";
import axios from "axios";

import NavigationBar from "./components/NavigationBar";
import Snackbar from "./components/Snackbar/Snackbar";
import Player from "./components/Player";
import ISong from "./interfaces/song.interface";

import "./App.css";

function App() {
  let audioRef = useRef<HTMLAudioElement>(new Audio());

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

  let [notification, setNotification] = useState({type: 'error', message: ''})
  let [isVisible, setIsVisible] = useState(false)


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

  function handleAudioError() {
    setIsPlaying(false);
    setNowPlaying({
      type: "",
      videoId: "",
      authorId: "",
      author: "",
      title: "",
      lengthSeconds: 0,
      videoThumbnails: [],
    });

    setNotification({type: 'error', message: "Youtube doesn't allow this audio to be played"})
    showNotification(5000)
    
    console.log("Error: Youtube doesn't allow this audio to be played");
  }

  function showNotification(duration: number) {
    setIsVisible(true)
    setTimeout(() => {
      setIsVisible(false)
    }, duration)
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

      if (audioRef.current) {
        audioRef.current.onerror = handleAudioError;
      }

      setIsPlaying(true);
    }
  }, [nowPlaying]);

  return (
    <>
      <div className="container">
        <NavigationBar playSong={playSong} />
        {
          isVisible &&
          <Snackbar type={notification.type as any} message={notification.message}/>
        }
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
