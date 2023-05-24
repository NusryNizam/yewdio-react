import { useContext, useEffect } from "react";

import NavigationBar from "./components/NavigationBar";
import Snackbar from "./components/Snackbar/Snackbar";
import Player from "./components/Player";
// import ISong from "./interfaces/song.interface";

import "./App.css";
import NowPlayingContext, { ContextProvider } from "./NowPlayingContext";

function App() {
  // let audioRef = useRef<HTMLAudioElement>(new Audio());

  const nowPlayingContext = useContext(NowPlayingContext)
  
  const { 
    isVisible,    setIsVisible,
    isPlaying,    setIsPlaying,
    nowPlaying,   setNowPlaying,
    notification, setNotification,
  } = nowPlayingContext

  // let [isPlaying, setIsPlaying] = useState<boolean>(false);
  // let [nowPlaying, setNowPlaying] = useState<ISong>({
  //   type: "",
  //   videoId: "",
  //   authorId: "",
  //   author: "",
  //   title: "",
  //   lengthSeconds: 0,
  //   videoThumbnails: [],
  // });

  // let [notification, setNotification] = useState({
  //   type: "error",
  //   message: "",
  // });
  // let [isVisible, setIsVisible] = useState(false);

  // function changeState() {
  //   setIsPlaying(!isPlaying);
  // }

  // function playSong(id: string) {
  //   axios
  //     .get(`https://yt.funami.tech/api/v1/videos/${id}`)
  //     .then((res) => {
  //       setNowPlaying(res.data);
  //     })
  //     .catch();
  // }

  // function handleAudioError() {
  //   console.log(audioRef.current.error);

  //   setIsPlaying(false);
  //   setNowPlaying({
  //     type: "",
  //     videoId: "",
  //     authorId: "",
  //     author: "",
  //     title: "",
  //     lengthSeconds: 0,
  //     videoThumbnails: [],
  //   });

  //   setNotification({
  //     type: "error",
  //     message:
  //       "Error: Youtube doesn't allow this audio to be played. Please try another.",
  //   });
  //   showNotification(5000);
  // }

  // function showNotification(duration: number) {
  //   setIsVisible(true);
  //   setTimeout(() => {
  //     setIsVisible(false);
  //   }, duration);
  // }

  // useEffect(() => {
  //   console.info("36:21: App.tsx");

  //   if (isPlaying) {
  //     audioRef.current.play();
  //   } else {
  //     audioRef.current.pause();
  //   }
  // }, [isPlaying]);

  // useEffect(() => {
  //   console.info("47:21: App.tsx");
  //   console.log(nowPlaying);
    

  //   if (nowPlaying.adaptiveFormats) {
  //     audioRef.current.src = nowPlaying.adaptiveFormats[2].url;
  //     audioRef.current.play();

  //     if (audioRef.current) {
  //       audioRef.current.onerror = handleAudioError;
  //     }

  //     setIsPlaying(true);
  //   }
  // }, [nowPlaying]);

  useEffect(() => {
    console.log('isVisble changed');
    
  }, [isVisible])

  return (
    <>
    {/* <ContextProvider> */}
      <NavigationBar />
      {isVisible && (
        <Snackbar
          type={notification.type}
          message={notification.message}
        />
      )}
      <Player
        // setIsPlaying={changeState}
        // isPlaying={isPlaying}
        // data={nowPlaying}
      />

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
      </svg>
      {/* </ContextProvider> */}
    </>
  );
}

export default App;
