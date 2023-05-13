import React, { FunctionComponent, useEffect, useState } from "react";
import axios from "axios";

import ISong from "../interfaces/song.interface";
import "./Search.css";
import "./tabs.css";

interface SearchProps {
  playSong(id:string): void
}

const Search: FunctionComponent<SearchProps> = (props) => {
  let [results, setResults] = useState<ISong[]>([]);
  let [searchTerm, setSearchTerm] = useState("");


  function searchItem(e: React.KeyboardEvent<HTMLInputElement>) {
    // console.log(e.key, (e.target as HTMLInputElement).value);
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
        console.log(res.data);
        setResults(res.data);
      })
      .catch((err) => {
        console.log("Error: ", err);
      });
  }, [searchTerm]);

  return (
    <section className="search">
      <div className="search-controls">
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Search"
          onKeyDown={(e) => searchItem(e)}
        />
        <input type="submit" value="Search" />
      </div>
      <div className="search-results">
        <ul>
          {results.map((song) => {
            if (song.type === "video") {
              return (
                <li key={song.videoId + Math.random()}>
                  {song.title} -{" "}
                  <button onClick={() => props.playSong(song.videoId)}>Play</button>
                </li>
              );
            }
          })}
        </ul>
      </div>
    </section>
  );
};

export default Search;
