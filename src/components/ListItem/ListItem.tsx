import { FunctionComponent, useContext } from "react";
import axios from "axios";

import ISong, { IThumbs } from "../../interfaces/song.interface";
import NowPlayingContext from "../../NowPlayingContext";

import "./ListItem.css";

interface ListItemProps {
  videoId: string;
  title: string;
  author: string;
  thumbnails: IThumbs[];
  duration: number;
}

const ListItem: FunctionComponent<ListItemProps> = (props) => {
  const { videoId, title, author, thumbnails, duration } = props;

  const { setNowPlaying, setAudioSrc, convertDuration } =
    useContext(NowPlayingContext);

  function playSong() {

    axios
      .get(`https://yt.funami.tech/api/v1/videos/${videoId}`)
      .then((res) => {
        let data: ISong = res.data;
        setNowPlaying({
          type: data.type,
          videoId: data.videoId,
          authorId: "",
          author: data.author,
          title: data.title,
          lengthSeconds: data.lengthSeconds,
          videoThumbnails: data.videoThumbnails,
        });

        setAudioSrc(res.data.adaptiveFormats[2].url);
      })
      .catch((e) => {
        console.error("error", e);
      });
  }

  return (
    <li
      className="list-item"
      role="button"
      title={title}
      onClick={() => playSong()}
    >
      <div className="flex-container">
        <div className="image-container">
          <img src={thumbnails[5].url} alt={`Video thumbnail of ${title}`} />
          <span className="duration">{convertDuration(duration)}</span>
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
