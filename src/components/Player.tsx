import "./Player.css";

import PlayIcon from '../assets/play.svg';
import PauseIcon from '../assets/pause.svg';
import ISong from "../interfaces/song.interface";

type PlayerProps = {
    setIsPlaying(): void;
    isPlaying: boolean;
    data: ISong
}

const Player: React.FC<PlayerProps> = (props) => {
  return (
    <div className="player">
      <button onClick={() => props.setIsPlaying()}>
        <img src={props.isPlaying ? PauseIcon : PlayIcon} alt="" />
      </button>
        <p>{props.data.title}</p>
    </div>
  );
};

export default Player;
