import { useContext } from "react";
import NowPlayingContext from "../NowPlayingContext";
import ListItem from "./ListItem/ListItem";

import "./Dashboard.css";
import "./tabs.css";

const Dashboard: React.FC = () => {
  let { likes } = useContext(NowPlayingContext);

  return (
    <section className="container">
      <h2>Dashboard</h2>
      <div className="list-title">Favourites</div>
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
