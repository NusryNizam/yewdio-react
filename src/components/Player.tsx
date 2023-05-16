import "./Player.css";

import ISong from "../interfaces/song.interface";
import { useEffect, useRef, useState } from "react";

type PlayerProps = {
  setIsPlaying(): void;
  isPlaying: boolean;
  data: ISong;
};

const Player: React.FC<PlayerProps> = (props) => {
  const [overflow, setOverflow] = useState(false);
  // const [titleWrapperWidth, setTitleWrapperWidth] = useState(0);
  const [hidden, setHidden] = useState(false)

  const titleWrapperRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    console.log("inside useeffect (titleWrapperref)");
    // if (titleWrapperRef.current) {
    //   titleWrapperRef.current.offsetWidth + 1 < titleWrapperRef.current.scrollWidth
    //     ? setOverflow(true)
    //     : setOverflow(false);
    //   setTitleWrapperWidth(titleWrapperRef.current?.offsetWidth);
    // }

    if (titleWrapperRef.current && titleRef.current) {
      console.log(titleWrapperRef.current.offsetWidth);
      console.log(titleRef.current.offsetWidth);
      
      if(titleWrapperRef.current.offsetWidth < titleRef.current.offsetWidth) {
        console.log('title longer than wrapper');
        
        setOverflow(true)
        setHidden(false)
      } else {
        console.log('title NOTTT longer than wrapper');

        setOverflow(false);
        setHidden(true)
      }
    }
  }, [titleWrapperRef, titleRef, props.isPlaying]);
  return (
    <div className="player">
      <button className="player-toggle" onClick={() => props.setIsPlaying()}>
        <div>
          {props.isPlaying ? (
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
          <h4
            ref={titleRef}
            className={overflow ? "details__title marquee" : "details__title"}
            data-name={props.data.title ? `${props.data.title} · ` : "Song Title"}
          >
            {props.data.title ? `${props.data.title} · ` : "Song Title"}
          </h4>
          <h4
            style={{display: hidden ? 'none' : 'inherit'}}

            // style={{ display: overflow ? "none" : "inherit" }}
            className={overflow ? "details__title marquee" : "details__title"}
            data-name={props.data.title ? `${props.data.title} · ` : "Song Title"}
          >
            {props.data.title ? `${props.data.title} · ` : "Song Title"}
          </h4>
        </div>
        <p className="details__author">
          {props.data.author ? props.data.author : "Author"}
        </p>
      </div>

      {/* Sprite */}
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
  );
};

export default Player;
