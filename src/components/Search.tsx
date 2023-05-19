import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import axios from "axios";

import ISong from "../interfaces/song.interface";
import ListItem from "./ListItem/ListItem";

import "./Search.css";
import "./tabs.css";

interface SearchProps {
  playSong: (id: string) => void;
}

const Search: FunctionComponent<SearchProps> = (props) => {
  let [results, setResults] = useState<ISong[]>([]);
  let [searchTerm, setSearchTerm] = useState("");
  let searchRef = useRef<HTMLElement | null>(null);

  function searchItem(e: React.KeyboardEvent<HTMLInputElement>) {
    let target = e.target as HTMLInputElement;

    if (e.key === "Enter") {
      setSearchTerm(target.value);
    }
  }

  const goToTop = () => {
    searchRef.current
      ? searchRef.current.scrollTo({ top: 0, behavior: "smooth" })
      : null;
  };

  useEffect(() => {
    console.info("26:21: Search.tsx ");

    axios
      .get(`https://yt.funami.tech/api/v1/search?q=${searchTerm}`)
      .then((res) => {
        setResults(res.data as ISong[]);
        goToTop();
      })
      .catch((err) => {
        console.log("Error: ", err);
      });
  }, [searchTerm]);

  return (
    <section className="search" ref={searchRef}>
      <h2 className="custom-adjustment">Search</h2>
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
        <ul className="search-list">
          {results.map((song) => {
            if (song.type === "video") {
              return (
                <ListItem
                  key={song.videoId + Math.random()}
                  videoId={song.videoId}
                  title={song.title}
                  author={song.author}
                  duration={song.lengthSeconds}
                  thumbnails={song.videoThumbnails}
                  playSong={props.playSong}
                />
              );
            }
          })}
          {results.length ? (
            // <li
            //   className="list-item"
            //   role="button"
            //   aria-label="Scroll to top"
            //   style={{marginTop: '1rem'}}
            //   onClick={() => {}}
            // >
            //   <div className="details__title">Scroll to top ↑</div>
            // </li>
            <button className="scroll-to-top" onClick={goToTop}>
              Scroll to top ↑
            </button>
          ) : null}
        </ul>
      </div>
    </section>
  );
};

export default Search;
