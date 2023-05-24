import { FunctionComponent, useContext, useEffect } from "react";

import ISong, { IThumbs } from "../../interfaces/song.interface";

import "./ListItem.css";
import axios from "axios";
import NowPlayingContext, { ContextProvider } from "../../NowPlayingContext";

interface ListItemProps {
  videoId: string;
  title: string;
  author: string;
  thumbnails: IThumbs[];
  duration: number;
}

const ListItem: FunctionComponent<ListItemProps> = (props) => {
  const { videoId, title, author, thumbnails, duration } = props;

  const {
    setNowPlaying,
    setIsPlaying,
    // setNotification,
    // setIsVisible,
    audioSrc,
    setAudioSrc,
    nowPlaying
  } = useContext(NowPlayingContext);

  function convertDuration() {
    let readableFormat = new Date(duration * 1000)
      .toISOString()
      .slice(11, 19);
    if (readableFormat.substring(0, 3) === "00:")
      return readableFormat.substring(3);
    else return readableFormat;
  }

  function playSong() {
    console.log('Play ', videoId);
    
    axios
      .get(`https://yt.funami.tech/api/v1/videos/${videoId}`)
      .then((res) => {  
        let data:ISong = res.data      
        setNowPlaying({
          type: data.type,
          videoId: data.videoId,
          authorId: '',
          author: data.author,
          title: data.title,
          lengthSeconds: data.lengthSeconds,
          videoThumbnails: data.videoThumbnails,
        });
        
        console.log(audioSrc);
        setAudioSrc(res.data.adaptiveFormats[2].url);
        console.log(res.data.adaptiveFormats[2].url);

      })
      .catch((e) => { console.log('error', e)});

  }

  // function handleAudioError() {
  //   // console.log(audioRef.current.error);

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

  return (
    <li className="list-item" role="button" title={title} onClick={() => playSong()}>
      <div className="flex-container">
        <div className="image-container">
          <img
            src={thumbnails[5].url}
            alt={`Video thumbnail of ${title}`}
          />
          <span className="duration">{convertDuration()}</span>
        </div>
        <div className="details-container">
          <h4 className="title">{title}</h4>
          <div className="author">{author}</div>
        </div>
      </div>
    </li>
  );
};

export default ListItem;
