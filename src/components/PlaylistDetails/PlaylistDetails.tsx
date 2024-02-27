import { FunctionComponent } from "react";

import { Pressable } from "@ark-ui/react";
import ISong from "../../interfaces/song.interface";
import ListItem from "../ListItem/ListItem";
import "./PlaylistDetails.css";

type PlaylistDetailsProps = {
  name: string;
  content: ISong[];
  closeEvent: () => void;
};
const PlaylistDetails: FunctionComponent<PlaylistDetailsProps> = (props) => {
  const { content } = props;
  return (
    <div className="playlist-details-container">
      <div className="playlist-details">
        <h4 className="playlist-title">{props.name}</h4>

        <div className="button-container">
          <Pressable className="flat-button" aria-label="Play all">
            Play All
          </Pressable>
          <Pressable className="flat-button" aria-label="Shuffle play">
            Shuffle Play
          </Pressable>
        </div>
        {content &&
          content.map((items) => {
            const {
              videoId,
              title,
              author,
              authorVerified,
              videoThumbnails,
              lengthSeconds,
            } = items;
            return (
              <ListItem
                videoId={videoId}
                title={title}
                author={author}
                isVerified={authorVerified}
                thumbnails={videoThumbnails}
                duration={lengthSeconds}
              />
            );
          })}
      </div>
    </div>
  );
};

export default PlaylistDetails;
