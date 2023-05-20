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
        <button className="player-toggle">
            <svg className="icon">
              <use xlinkHref="#chevron-up-icon"></use>
            </svg>
        </button>
        <button
          className="player-toggle"
          onClick={() => setIsPlaying()}
          aria-label={isPlaying ? "Pause" : "Play"}
          disabled={data.videoId.length > 0 ? false : true}
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
            {/* <div className="fade"></div> */}
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
      </div>
    </div>
  );
};

export default Player;
