import React, { FunctionComponent, useContext, useRef, useState } from "react";
import axios from "axios";

import ISong from "../interfaces/song.interface";
import ListItem from "./ListItem/ListItem";
import NowPlayingContext from "../NowPlayingContext";

import "./Search.css";
import "./tabs.css";

const Search: FunctionComponent = () => {
  let [results, setResults] = useState<ISong[]>([]);
  let [searchTerm, setSearchTerm] = useState("");
  let [isSpinning, setIsSpinning] = useState(false);

  let searchRef = useRef<HTMLElement | null>(null);

  const { showNotification } = useContext(NowPlayingContext);

  function searchItem(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      getResults();
    }
  }

  const goToTop = () => {
    searchRef.current
      ? searchRef.current.scrollTo({ top: 0, behavior: "smooth" })
      : null;
  };

  const getResults = () => {
    setIsSpinning(true);
    axios
      // .get(`https://yt.funami.tech/api/v1/search?q=${searchTerm}`)
      .get(`https://vid.priv.au/api/v1/search?q=${searchTerm}`)
      .then((res) => {
        console.log(res.data);
        
        setResults(res.data as ISong[]);
        goToTop();
        setIsSpinning(false);
      })
      .catch((err) => {
        showNotification({
          type: "error",
          message: `${err.message}: Please try again later.`,
        });
        setSearchTerm("");
        setIsSpinning(false);
      });
  };

  return (
    <section className="search container" ref={searchRef}>
      <h2 className="custom-adjustment">Search</h2>
      <div className="search-controls">
        <input
          type="text"
          name="search"
          id="search-box"
          placeholder="Search"
          onKeyDown={(e) => searchItem(e)}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {isSpinning && (
          <div
            className={
              isSpinning ? "input-suffix spinner spinning" : "input-suffix"
            }
          ></div>
        )}

        {!isSpinning && searchTerm && (
          <button
            className="input-suffix clear-search"
            onClick={() => setSearchTerm("")}
          >
            <svg className="clear-search-icon-wrapper">
              <use xlinkHref="#close"></use>
            </svg>
          </button>
        )}
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
                  isVerified={song.authorVerified}
                />
              );
            }
          })}
          {results.length ? (
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
