import "./Player.css";

import PlayIcon from "../assets/play.svg";
import PauseIcon from "../assets/pause.svg";
import ISong from "../interfaces/song.interface";

type PlayerProps = {
  setIsPlaying(): void;
  isPlaying: boolean;
  data: ISong;
};

const Player: React.FC<PlayerProps> = (props) => {
  return (
    <div className="player">
      <button className="player-toggle" onClick={() => props.setIsPlaying()}>
        <div>
          <img src={props.isPlaying ? PauseIcon : PlayIcon} alt="" />
        </div>
      </button>
      <div className="details">
        <h4>{props.data.title ? props.data.title : "Audio Title"}</h4>
        <p>{props.data.author ? props.data.author : "Author"}</p>
      </div>
    </div>
  );
};

export default Player;
