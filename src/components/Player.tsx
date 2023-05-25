import { useContext, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Pressable } from "@ark-ui/react";

import NowPlayingContext from "../NowPlayingContext";

import "./Player.css";

const Player: React.FC = () => {
  const {
    overflow,
    setOverflow,
    hidden,
    setHidden,
    isMinimized,
    setIsMinimized,
    isPlaying,
    setIsPlaying,
    nowPlaying,
    convertDuration,
  } = useContext(NowPlayingContext);

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
      <div className={isMinimized ? "hidden" : ""}>
        <div className="album-art">
          {nowPlaying.videoId.length > 0 ? (
            <img src={nowPlaying.videoThumbnails[3].url} alt="Album art" />
          ) : (
            <svg>
              <use xlinkHref="#music"></use>
            </svg>
          )}
        </div>
        <div className="song-info">
          <progress className="progress-bar" value={50} max={100}></progress>
          <div>01:00/{convertDuration(nowPlaying.lengthSeconds)}</div>

          <div className="player-controls">
            <Pressable className="icon-button">
              <svg className="icon">
                <use xlinkHref="#previous"></use>
              </svg>
            </Pressable>
            <Pressable
              // className="player-toggle"
              className="icon-button accent-button"
              onPress={() => {
                setIsPlaying((prevState) => !prevState);
                console.log(nowPlaying.videoId);
              }}
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
            <Pressable className="icon-button">
              <svg className="icon">
                <use xlinkHref="#next"></use>
              </svg>
            </Pressable>
          </div>
        </div>
      </div>

      <div
        className={isMinimized ? "flex-container container" : "flex-container"}
      >
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
            onPress={() => setIsPlaying((prevState) => !prevState)}
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
            <div
              ref={titleRef}
              className={overflow ? "details__title marquee" : "details__title"}
            >
              {nowPlaying.title
                ? !isMinimized
                  ? ` ${nowPlaying.title} `
                  : `${nowPlaying.title}  `
                : isMinimized
                ? "Audio Title "
                : " Audio Title "}
            </div>
            <div
              style={{ display: hidden ? "none" : "inherit" }}
              className={overflow ? "details__title marquee" : "details__title"}
            >
              {nowPlaying.title
                ? !isMinimized
                  ? ` ${nowPlaying.title} `
                  : `${nowPlaying.title}  `
                : "Audio Title"}
            </div>
          </div>
          <p className="details__author">
            {nowPlaying.author ? nowPlaying.author : "Author"}
          </p>
        </div>
      </div>

      <Link className="hide-player-btn" to="../">
        <Pressable
          className="icon-button"
          style={isMinimized ? { display: "none" } : {}}
        >
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
          viewBox="-2 0 24 24"
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

        <symbol fill="none" viewBox="0 0 24 24" id="chevron-down-icon">
          <path
            d="m15.25 10.75-3.25 3.5-3.25-3.5"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          />
        </symbol>

        <symbol fill="none" viewBox="0 0 24 24" id="music">
          <circle
            cx="7"
            cy="17"
            r="2.25"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          ></circle>
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9.25 17V6.75C9.25 5.64543 10.1454 4.75 11.25 4.75H17.25C18.3546 4.75 19.25 5.64543 19.25 6.75V14"
          ></path>
          <circle
            cx="17"
            cy="14"
            r="2.25"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          ></circle>
        </symbol>

        <symbol fill="none" viewBox="0 0 24 24" id="previous">
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9.75 12L18.25 5.75V18.25L9.75 12Z"
          ></path>
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5.75 5.75V18.25"
          ></path>
        </symbol>

        <symbol fill="none" viewBox="0 0 24 24" id="next">
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M14.25 12L5.75 5.75V18.25L14.25 12Z"
          ></path>
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M18.25 5.75V18.25"
          ></path>
        </symbol>
      </svg>
    </div>
  );
};

export default Player;
