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

  let [notification, setNotification] = useState({
    type: "error",
    message: "",
  });
  let [isVisible, setIsVisible] = useState(false);

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
    console.log(audioRef.current.error);

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

    setNotification({
      type: "error",
      message: "Error: Youtube doesn't allow this audio to be played. Please try another.",
    });
    showNotification(5000);
  }

  function showNotification(duration: number) {
    setIsVisible(true);
    setTimeout(() => {
      setIsVisible(false);
    }, duration);
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
      {/* <div className="container"> */}
      <NavigationBar playSong={playSong} />
      {isVisible && (
        <Snackbar
          type={notification.type as any}
          message={notification.message}
        />
      )}
      <Player
        setIsPlaying={changeState}
        isPlaying={isPlaying}
        data={nowPlaying}
      />
      {/* </div> */}

      <svg width="0" height="0" className="hidden" style={{ display: "none" }}>
        <symbol
          xmlns="http://www.w3.org/2000/svg"
          // fill="none"
          // stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          viewBox="0 0 24 24"
          id="settings-icon"
        >
          <path d="M20 7h-9"></path>
          <path d="M14 17H5"></path>
          <circle cx="17" cy="17" r="3"></circle>
          <circle cx="7" cy="7" r="3"></circle>
        </symbol>
        <symbol
          xmlns="http://www.w3.org/2000/svg"
          // fill="none"
          // stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          viewBox="0 0 24 24"
          id="search-icon"
        >
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" x2="16.65" y1="21" y2="16.65"></line>
        </symbol>
        <symbol
          xmlns="http://www.w3.org/2000/svg"
          // fill="none"
          // stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          viewBox="0 0 24 24"
          id="playlist-icon"
        >
          <path d="M21 15V6"></path>
          <path d="M18.5 18a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"></path>
          <path d="M12 12H3"></path>
          <path d="M16 6H3"></path>
          <path d="M12 18H3"></path>
        </symbol>
        <symbol
          xmlns="http://www.w3.org/2000/svg"
          // fill="none"
          // stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          viewBox="0 0 24 24"
          id="dashboard-icon"
        >
          <rect width="7" height="9" x="3" y="3" rx="1"></rect>
          <rect width="7" height="5" x="14" y="3" rx="1"></rect>
          <rect width="7" height="9" x="14" y="12" rx="1"></rect>
          <rect width="7" height="5" x="3" y="16" rx="1"></rect>
        </symbol>

        <symbol
          xmlns="http://www.w3.org/2000/svg"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          viewBox="0 0 24 24"
          id="play-icon"
        >
          <polygon points="5 3 19 12 5 21 5 3"></polygon>
        </symbol>
        <symbol
          xmlns="http://www.w3.org/2000/svg"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          viewBox="0 0 24 24"
          id="pause-icon"
        >
          <rect width="4" height="16" x="6" y="4"></rect>
          <rect width="4" height="16" x="14" y="4"></rect>
        </symbol>

        <symbol fill="none" viewBox="0 0 24 24" id="close">
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M17.25 6.75L6.75 17.25"
          ></path>
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6.75 6.75L17.25 17.25"
          ></path>
        </symbol>
      </svg>
    </>
  );
}

export default App;
