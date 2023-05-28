import { ReactNode, createContext, useEffect, useRef, useState } from "react";

import ISong from "./interfaces/song.interface";
import INotification from "./interfaces/notification.interface";
import IState from "./interfaces/state.interface";

const defaultISong: ISong = {
  type: "",
  videoId: "",
  authorId: "",
  author: "",
  title: "",
  lengthSeconds: 0,
  videoThumbnails: [],
};

const defaultINotification: INotification = {
  type: "error",
  message: "",
  duration: 5000,
};

const defaultState = {
  isVisible: false,
  setIsVisible: () => {},
  overflow: false,
  setOverflow: () => {},
  hidden: false,
  setHidden: () => {},
  isMinimized: false,
  setIsMinimized: () => {},
  isPlaying: false,
  setIsPlaying: () => {},
  nowPlaying: defaultISong,
  setNowPlaying: () => {},
  notification: defaultINotification,
  setNotification: () => {},
  audioSrc: "",
  setAudioSrc: () => {},
  convertDuration: convertDuration,
  showNotification: () => {},
  currentTime: 0,
  progress: 0,
  forwardTen: () => {},
  rewindTen: () => {},
  addToLikes:() => {}
};

function convertDuration(audioDuration: number = 0) {
  let readableFormat = new Date(audioDuration * 1000)
    .toISOString()
    .slice(11, 19);
  if (readableFormat.substring(0, 3) === "00:")
    return readableFormat.substring(3);
  else return readableFormat;
}

const NowPlayingContext = createContext<IState>(defaultState);

export function ContextProvider({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  let [isVisible, setIsVisible] = useState(false);
  let [overflow, setOverflow] = useState(false);
  let [hidden, setHidden] = useState(false);
  let [isMinimized, setIsMinimized] = useState(true);
  let [audioSrc, setAudioSrc] = useState("");

  let [isPlaying, setIsPlaying] = useState<boolean>(false);
  let [currentTime, setCurrentTime] = useState(0);
  let [progress, setProgress] = useState(0);
  let [notification, setNotification] =
    useState<INotification>(defaultINotification);

  let [nowPlaying, setNowPlaying] = useState<ISong>({
    type: "",
    videoId: "",
    authorId: "",
    author: "",
    title: "",
    lengthSeconds: 0,
    videoThumbnails: [],
  });

  const audioRef = useRef<HTMLAudioElement>(new Audio());

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

    showNotification({
      type: "error",
      message:
        "Error: Youtube doesn't allow this audio to be played. Please try another.",
    });
  }

  function showNotification(
    notificationSettings: INotification,
    duration: number = 5000
  ) {
    setNotification(notificationSettings);
    setIsVisible(true);
    setTimeout(() => {
      setIsVisible(false);
    }, duration);
  }

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  const forwardTen = () => {
    audioRef.current.currentTime += 10
  }

  const rewindTen = () => {
    audioRef.current.currentTime -= 10
  }
  
  const addToLikes = () => {
    // localStorage.setItem('likes', JSON.stringify(nowPlaying))
  }

  useEffect(() => {
    console.info("112:22: NowPlayingContext.tsx");

    if (nowPlaying.videoId) {
      audioRef.current.src = audioSrc;
      audioRef.current.play();

      if (audioRef.current) {
        audioRef.current.onerror = handleAudioError;
        audioRef.current.onplay = handlePlay;
        audioRef.current.onpause = handlePause;
      }

      setIsPlaying(true);
    }
  }, [nowPlaying, audioSrc]);

  useEffect(() => {
    console.info("36:21: App.tsx");
    let interval: number;

    if (isPlaying) {
      audioRef.current.play();
      interval = setInterval(() => {
        console.log("setInterval");
        setCurrentTime(audioRef.current.currentTime);
        setProgress(
          Math.round(
            (audioRef.current.currentTime / nowPlaying.lengthSeconds) * 100
          )
        );
      }, 1000);
    } else {
      audioRef.current.pause();
    }

    return () => {
      clearInterval(interval);
    };
  }, [isPlaying]);

  return (
    <NowPlayingContext.Provider
      value={{
        isVisible,
        setIsVisible,
        overflow,
        setOverflow,
        hidden,
        setHidden,
        isMinimized,
        setIsMinimized,
        isPlaying,
        setIsPlaying,
        nowPlaying,
        setNowPlaying,
        notification,
        setNotification,
        audioSrc,
        setAudioSrc,
        convertDuration,
        showNotification,
        currentTime,
        progress,
        forwardTen,
        rewindTen,
        addToLikes,
      }}
    >
      {children}
    </NowPlayingContext.Provider>
  );
}

export default NowPlayingContext;
