import { FunctionComponent } from "react";

import { IThumbs } from "../../interfaces/song.interface";

import "./ListItem.css";

interface ListItemProps {
  videoId: string;
  title: string;
  author: string;
  thumbnails: IThumbs[];
  duration: number;
  playSong: (id: string) => void;
}

const ListItem: FunctionComponent<ListItemProps> = (props) => {
  function convertDuration() {
    let readableFormat = new Date(props.duration * 1000)
      .toISOString()
      .slice(11, 19);
    if (readableFormat.substring(0, 3) === "00:")
      return readableFormat.substring(3);
    else return readableFormat;
  }
  return (
    <li
      className="list-item"
      role="button"
      title={props.title}
      onClick={() => props.playSong(props.videoId)}
    >
      <div className="flex-container">
        <div className="image-container">
          <img
            src={props.thumbnails[5].url}
            alt={`Video thumbnail of ${props.title}`}
          />
          <span className="duration">{convertDuration()}</span>
        </div>
        <div className="details-container">
          <h4 className="title">{props.title}</h4>
          <div className="author">{props.author}</div>
        </div>
      </div>
    </li>
  );
};

export default ListItem;
