import { useContext, useEffect } from "react";
import "./tabs.css";

import { songs } from "../../dummy-data.ts";
import PlaylistInterface from "../interfaces/playlist.interface.ts";

import "./Playlists.css";
import NowPlayingContext from "../NowPlayingContext.tsx";

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
      {/* <p>Playlists</p> */}
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
      {/* {!isPlaylistShown && 
        <PlaylistDetails name={selectedPlaylist} content={itemsOfSelectedPlaylist}/>
      } */}
    </section>
  );
};

export default Playlists;
