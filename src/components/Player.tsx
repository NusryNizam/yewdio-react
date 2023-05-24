import { useContext, useEffect, useRef } from "react";

import "./Player.css";
import { Link } from "react-router-dom";
import { Pressable } from "@ark-ui/react";
import NowPlayingContext from "../NowPlayingContext";

// type PlayerProps = {
//   setIsPlaying(): void;
//   isPlaying: boolean;
//   data: ISong;
// };

const Player: React.FC = () => {
  // const { setIsPlaying, isPlaying, data } = props;

  // const [overflow, setOverflow] = useState(false);
  // const [hidden, setHidden] = useState(false);
  // const [isMinimized, setIsMinimized] = useState(true);

  const { 
    // isVisible,    setIsVisible,
    overflow,     setOverflow,
    hidden,       setHidden,
    isMinimized,  setIsMinimized,
    isPlaying,    setIsPlaying,
    nowPlaying 
  } = useContext(NowPlayingContext)

  const titleWrapperRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    console.info("21:22: Player.tsx");

    if (titleWrapperRef.current && titleRef.current) {
      if (titleWrapperRef.current.offsetWidth < titleRef.current.offsetWidth) {
        setOverflow(true);
        setHidden(false);
      } else {
        setOverflow(false);
        setHidden(true);
      }
    }
  }, [titleWrapperRef, titleRef, isPlaying]); 

  useEffect(() => {
    if (window.location.pathname === "/") {
      setIsMinimized(true);
    }

    if (window.location.pathname === "/player") {
      setIsMinimized(false);
    }
  });

  return (
    <div className={isMinimized ? "player" : "player maximized"}>
      <div style={isMinimized ? { display: "none" } : {}}>
        <div className="album-art">
          <img
            src={isPlaying ? nowPlaying.videoThumbnails[3].url : ""}
            alt="Album art"
          />
        </div>
        <div className="details">
          <progress value={50} max={100}></progress>
          <div>01:00/03:00</div>

          <div className="player-controls">
            <Pressable className="">Previous</Pressable>
            <Pressable
              className="player-toggle"
              onPress={() => setIsPlaying(prevState => !prevState)}
              aria-label={isPlaying ? "Pause audio" : "Play audio"}
              disabled={nowPlaying.videoId.length > 0 ? false : true}
            >
              <div>
                {isPlaying ? (
                  <svg className="icon">
                    <use xlinkHref="#pause-icon"></use>
                  </svg>
                ) : (
                  <svg className="icon">
                    <use xlinkHref="#play-icon"></use>
                  </svg>
                )}
              </div>
            </Pressable>
            <Pressable className="">Next</Pressable>
          </div>
        </div>
      </div>

      <div className={isMinimized ? "flex-container container": "flex-container"}>
        <div
          className="player-content"
          style={!isMinimized ? { display: "none" } : {}}
        >
          <Link to="player">
            <Pressable className="icon-button">
              <svg className="icon">
                <use xlinkHref="#chevron-up-icon"></use>
              </svg>
            </Pressable>
          </Link>
          <Pressable
            className="player-toggle"
            onPress={() => setIsPlaying(prevState => !prevState)}
            aria-label={isPlaying ? "Pause" : "Play"}
            disabled={nowPlaying.videoId.length > 0 ? false : true}
          >
            <div>
              {isPlaying ? (
                <svg className="icon">
                  <use xlinkHref="#pause-icon"></use>
                </svg>
              ) : (
                <svg className="icon">
                  <use xlinkHref="#play-icon"></use>
                </svg>
              )}
            </div>
          </Pressable>
        </div>
        <div className="details" ref={titleWrapperRef}>
          <div className="details__title-wrapper">
            {/* <div className="fade"></div> */}
            <div
              ref={titleRef}
              className={overflow ? "details__title marquee" : "details__title"}
              data-name={nowPlaying.title ? `${nowPlaying.title}   ` : "Song Title"}
            >
              {nowPlaying.title ? `${nowPlaying.title}   ` : "Song Title"}
            </div>
            <div
              style={{ display: hidden ? "none" : "inherit" }}
              className={overflow ? "details__title marquee" : "details__title"}
              data-name={nowPlaying.title ? `${nowPlaying.title}   ` : "Song Title"}
            >
              {nowPlaying.title ? `${nowPlaying.title}   ` : "Song Title"}
            </div>
          </div>
          <p className="details__author">
            {nowPlaying.author ? nowPlaying.author : "Author"}
          </p>
        </div>
      </div>

      <Link to="../">
        <Pressable style={isMinimized ? { display: "none" } : {}}>
          <svg className="icon">
            <use xlinkHref="#chevron-down-icon"></use>
          </svg>
        </Pressable>
      </Link>

      <svg width="0" height="0" className="hidden" style={{ display: "none" }}>
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

        <symbol fill="none" viewBox="0 0 24 24" id="chevron-up-icon">
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15.25 14.25L12 10.75L8.75 14.25"
          ></path>
        </symbol>

        <symbol fill="none" viewBox="0 0 24 24" id='chevron-down-icon'>
          <path
            d="m15.25 10.75-3.25 3.5-3.25-3.5"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          />
        </symbol>
      </svg>
    </div>
  );
};

export default Player;
