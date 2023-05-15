import React, { FunctionComponent, useEffect, useState } from "react";
import axios from "axios";

import ISong from "../interfaces/song.interface";
import "./Search.css";
import "./tabs.css";
import ListItem from "./ListItem/ListItem";

interface SearchProps {
  playSong: (id:string) => void;
}

const Search: FunctionComponent<SearchProps> = (props) => {
  let [results, setResults] = useState<ISong[]>([]);
  let [searchTerm, setSearchTerm] = useState("");

  function searchItem(e: React.KeyboardEvent<HTMLInputElement>) {
    let target = e.target as HTMLInputElement;

    if (e.key === "Enter") {
      setSearchTerm(target.value);
    }
  }

  useEffect(() => {
    console.log("use effect..");
    axios
      .get(`https://yt.funami.tech/api/v1/search?q=${searchTerm}`)
      .then((res) => {
        setResults(res.data);
      })
      .catch((err) => {
        console.log("Error: ", err);
      });
  }, [searchTerm]);

  return (
    <section className="search">
      <h2>Search</h2>
      <div className="search-controls">
        <input
          type="text"
          name="search"
          id="search-box"
          placeholder="Search"
          onKeyDown={(e) => searchItem(e)}
        />
      </div>
      <div className="search-results">
        <ul className='search-list'>
          {results.map((song) => {
            if (song.type === "video") {
              return (
                <ListItem key={song.videoId + Math.random()}
                  videoId={song.videoId}
                  title={song.title}
                  playSong={props.playSong}
                />
              );
            }
          })}
        </ul>
      </div>
    </section>
  );
};

export default Search;
