import { FunctionComponent, useEffect } from "react";

import ISong from "../../interfaces/song.interface";
import "./PlaylistDetails.css";
import ListItem from "../ListItem/ListItem";
import { Pressable } from "@ark-ui/react";

type PlaylistDetailsProps = {
  name: string;
  content: ISong[];
  closeEvent: () => void;
};
const PlaylistDetails: FunctionComponent<PlaylistDetailsProps> = (props) => {
  const closeModal = () => {
    props.closeEvent();
  };
  useEffect(() => {
    console.log(props.content);
  }, []);
  const { content } = props;
  return (
    <div className="playlist-details-container">
      <div className="playlist-details">
          <h4 className='playlist-title'>{props.name}</h4>
        {/* <div className="playlist-header"> */}
          {/* <Pressable
            className="icon-button close-btn"
            aria-label="Close"
            onPress={closeModal}
          >
            ✕
          </Pressable> */}
        {/* </div> */}
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
      {/* <div className="modal-bg" onClick={closeModal}></div> */}
    </div>
  );
};

export default PlaylistDetails;
