import { useContext, useEffect } from "react";
import "./tabs.css";

import { songs } from "../../dummy-data.ts";
import PlaylistInterface from "../interfaces/playlist.interface.ts";

import NowPlayingContext from "../NowPlayingContext.tsx";
import "./Playlists.css";

const Playlists: React.FC = () => {
  const {
    setSelectedPlaylist,
    setItemsOfSelectedPlaylist,
    itemsOfSelectedPlaylist,
    setIsPlaylistShown,
  } = useContext(NowPlayingContext);

  const playlists: PlaylistInterface[] = [
    {
      title: "English",
      content: songs,
    },
  ];

  const popupPlaylist = (data: PlaylistInterface) => {
    setIsPlaylistShown(true);
    setSelectedPlaylist(data.title);
    setItemsOfSelectedPlaylist(data.content);
  };

  useEffect(() => {
    let lists = localStorage.getItem("playlists");
    if (lists) playlists.push(JSON.parse(lists));
  }, []);

  useEffect(() => {}, [itemsOfSelectedPlaylist]);

  return (
    <section className="container playlists">
      <h2>Playlists</h2>
      <ul>
        {playlists.map((playlist) => {
          return (
            <li
              className="list-item"
              onClick={() => popupPlaylist(playlist)}
              key={playlist.title}
            >
              {playlist.title}
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default Playlists;
