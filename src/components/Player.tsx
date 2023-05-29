import { useContext, useEffect, useRef } from "react";
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
    currentTime,
    progress,
    forwardTen,
    rewindTen,
    addToLikes,
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
          <progress
            className="progress-bar"
            value={progress}
            max={100}
          ></progress>
          <div>
            {convertDuration(currentTime)}/
            {convertDuration(nowPlaying.lengthSeconds)}
          </div>

          <div className="player-controls">
            <Pressable
              className="icon-button"
              disabled={nowPlaying.videoId.length === 0}
              aria-label="Previous audio"
            >
              <svg className="icon">
                <use xlinkHref="#previous"></use>
              </svg>
            </Pressable>

            <Pressable
              className="icon-button accent-button"
              onPress={() => setIsPlaying((prevState) => !prevState)}
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

            <Pressable
              className="icon-button"
              disabled={nowPlaying.videoId.length === 0}
              aria-label="Next audio"
            >
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
          <Pressable
            className="icon-button"
            onClick={() => setIsMinimized(false)}
            aria-label="Show player"
          >
            <svg className="icon">
              <use xlinkHref="#chevron-up-icon"></use>
            </svg>
          </Pressable>

          <Pressable
            className="icon-button"
            onPress={() => setIsPlaying((prevState) => !prevState)}
            aria-label={isPlaying ? "Pause" : "Play"}
            disabled={nowPlaying.videoId.length === 0}
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
        <div
          className={isMinimized ? "details" : "details mb-1"}
          ref={titleWrapperRef}
        >
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

      {!isMinimized && (
        <div className="audio-actions mb-1">
          <Pressable
            className="icon-button"
            disabled={nowPlaying.videoId.length === 0}
            onPress={rewindTen}
            aria-label="Rewind 10 seconds"
          >
            <svg className="icon">
              <use xlinkHref="#rewind"></use>
            </svg>
          </Pressable>

          <Pressable
            className="icon-button"
            disabled={nowPlaying.videoId.length === 0}
            onPress={addToLikes}
            aria-label="Add to favourites"
          >
            <svg className="icon">
              <use xlinkHref="#heart"></use>
            </svg>
          </Pressable>

          <Pressable
            className="icon-button"
            disabled={nowPlaying.videoId.length === 0}
            onPress={forwardTen}
            aria-label="Forward 10 seconds"
          >
            <svg className="icon">
              <use xlinkHref="#forward"></use>
            </svg>
          </Pressable>
        </div>
      )}

      <Pressable
        className="icon-button hide-player-btn"
        style={isMinimized ? { display: "none" } : {}}
        onClick={() => setIsMinimized(true)}
        aria-label="Hide player"
      >
        <svg className="icon">
          <use xlinkHref="#chevron-down-icon"></use>
        </svg>
      </Pressable>

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

        <symbol fill="none" viewBox="0 0 24 24" id="heart">
          <path
            fillRule="evenodd"
            // stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M11.995 7.23319C10.5455 5.60999 8.12832 5.17335 6.31215 6.65972C4.49599 8.14609 4.2403 10.6312 5.66654 12.3892L11.995 18.25L18.3235 12.3892C19.7498 10.6312 19.5253 8.13046 17.6779 6.65972C15.8305 5.18899 13.4446 5.60999 11.995 7.23319Z"
            clipRule="evenodd"
          ></path>
        </symbol>

        <symbol fill="none" id="forward" viewBox="0 0 24 24">
          <path
            id="path1044"
            strokeWidth="2"
            d="M 10.23067,18.557009 C 6.5327896,17.566165 4.3383026,13.765203 5.3291466,10.067323 6.3199908,6.369442 10.120952,4.1749559 13.818833,5.1658001 c 2.806683,0.7520485 4.747294,3.1229439 5.086421,5.8389119"
          ></path>
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m 20.289675,8.0431197 -0.628336,3.3041933 -3.21998,-0.971714"
          ></path>
          <path d="m 13.779629,15.014623 h 0.468153 v 3.558193"></path>
          <path d="m 19.431286,16.840212 c 0,0.98076 -0.219527,1.775823 -1.432055,1.775823 -1.126075,0 -1.432055,-0.795063 -1.432055,-1.775823 0,-0.98076 0.323853,-1.775823 1.432055,-1.775823 1.135898,0 1.432055,0.795063 1.432055,1.775823 z"></path>
        </symbol>
        <symbol fill="none" id="rewind" viewBox="0 0 24 24">
          <path
            strokeWidth="2"
            d="m 15.151404,18.557009 c 3.69788,-0.990844 5.892367,-4.791806 4.901523,-8.489686 C 19.062083,6.369442 15.261122,4.1749559 11.563241,5.1658001 8.7565577,5.9178486 6.8159467,8.288744 6.4768197,11.004712"
          ></path>
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m 5.0923987,8.0431197 0.628336,3.3041933 3.21998,-0.971714"
          ></path>
          <path d="m 6.3958293,15.014623 h 0.468153 v 3.558193"></path>
          <path d="m 12.047486,16.840212 c 0,0.98076 -0.219527,1.775823 -1.432055,1.775823 -1.1260747,0 -1.4320547,-0.795063 -1.4320547,-1.775823 0,-0.98076 0.323853,-1.775823 1.4320547,-1.775823 1.135898,0 1.432055,0.795063 1.432055,1.775823 z"></path>
        </symbol>
      </svg>
    </div>
  );
};

export default Player;
