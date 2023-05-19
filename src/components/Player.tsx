import { useEffect, useRef, useState } from "react";

import ISong from "../interfaces/song.interface";

import "./Player.css";

type PlayerProps = {
  setIsPlaying(): void;
  isPlaying: boolean;
  data: ISong;
};

const Player: React.FC<PlayerProps> = (props) => {
  const { setIsPlaying, isPlaying, data } = props;

  const [overflow, setOverflow] = useState(false);
  const [hidden, setHidden] = useState(false);

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
    <div className="player">
      <div className="player-content">
        <button
          className="player-toggle"
          onClick={() => setIsPlaying()}
          aria-label={isPlaying ? "Pause" : "Play"}
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
        </button>
        <div className="details" ref={titleWrapperRef}>
          <div className="details__title-wrapper">
            <div className="fade"></div>
            <div
              ref={titleRef}
              className={overflow ? "details__title marquee" : "details__title"}
              data-name={data.title ? `${data.title}   ` : "Song Title"}
            >
              {data.title ? `${data.title}   ` : "Song Title"}
            </div>
            <div
              style={{ display: hidden ? "none" : "inherit" }}
              className={overflow ? "details__title marquee" : "details__title"}
              data-name={data.title ? `${data.title}   ` : "Song Title"}
            >
              {data.title ? `${data.title}   ` : "Song Title"}
            </div>
          </div>
          <p className="details__author">
            {data.author ? data.author : "Author"}
          </p>
        </div>

        {/* SVG Sprite */}
        <svg width="0" height="0" className="hidden">
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
        </svg>
      </div>
    </div>
  );
};

export default Player;
