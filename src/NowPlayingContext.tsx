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
};

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
  let [notification, setNotification] = useState<INotification>({
    type: "error",
    message: "",
  });

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
      message:
        "Error: Youtube doesn't allow this audio to be played. Please try another.",
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
    console.log("nowPlaying changed");
  }, [nowPlaying]);
  useEffect(() => {
    console.log("audioSrc changed");
  }, [audioSrc]);

  useEffect(() => {
    console.log("triggered");

    if (nowPlaying.videoId) {
      console.log("Playinggggg");

      audioRef.current.src = audioSrc;
      audioRef.current.play();

      if (audioRef.current) {
        audioRef.current.onerror = handleAudioError;
      }

      setIsPlaying(true);
    }
  }, [nowPlaying, audioSrc]);

  useEffect(() => {
    console.info("36:21: App.tsx");

    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
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
      }}
    >
      {children}
    </NowPlayingContext.Provider>
  );
}

export default NowPlayingContext;
