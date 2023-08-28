import { useContext, useEffect } from "react";
import NowPlayingContext from "../NowPlayingContext";
import ListItem from "./ListItem/ListItem";

import "./Dashboard.css";
import "./tabs.css";
import { Pressable } from "@ark-ui/react";

const Dashboard: React.FC = () => {
  let { likes, playFavourites } = useContext(NowPlayingContext);

  const play = () => {
    playFavourites()
  }

  return (
    <section className="container">
      <h2>Dashboard</h2>
      <div className="list-title" style={{display: 'inline'}}>Favourites</div>
      <Pressable className="button-accent float-r" onClick={play}>Play All</Pressable>
      {likes.length > 0 && (
        <ul className="favourites-list">
          {likes.map((likedAudio) => {
            return (
              <ListItem
                key={likedAudio.videoId}
                videoId={likedAudio.videoId}
                title={likedAudio.title}
                author={likedAudio.author}
                duration={likedAudio.lengthSeconds}
                thumbnails={likedAudio.videoThumbnails}
                isVerified={likedAudio.authorVerified}
              />
            );
          })}
        </ul>
      )}

      {likes.length === 0 && (
        <div className="empty-list">
          Psst, Looks like you don't have any favourites. Play an audio and tap
          the heart icon to add it here.
        </div>
      )}
    </section>
  );
};

export default Dashboard;
