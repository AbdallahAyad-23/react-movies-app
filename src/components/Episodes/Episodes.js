import React, { useState, useEffect } from "react";
import styles from "./Episodes.module.css";
import Img from "../Img/Img";
import axios from "axios";
const Episodes = ({ numOfSeasons, id }) => {
  const [season, setSeason] = useState(1);
  const [results, setResults] = useState({});

  useEffect(async () => {
    const url = `https://api.themoviedb.org/3/tv/${id}/season/${season}?api_key=be4df36e59b67942bd7a12d9ac6f38d8&language=en-US`;
    const response = await axios.get(url);
    const result = await response.data;
    setResults(result);
  }, [season, id]);
  const onChangeHandler = (e) => {
    setSeason(e.target.value);
  };
  let content = null;
  if (Object.keys(results).length !== 0) {
    content = (
      <div className={styles.episodes}>
        {results.episodes.map((episode) => {
          return (
            <div className={styles.episode} key={episode.name}>
              {/* <div className={styles.imgContainer}>
                <img
                  src={`https://image.tmdb.org/t/p/w500/${episode.still_path}`}
                />
              </div> */}
              <Img
                episode
                src={`https://image.tmdb.org/t/p/w500_and_h282_bestv2/${episode.still_path}`}
                broken={episode.still_path === null}
              />
              {/* <h2
                  className={styles.episodeNumber}
                >{`E${episode.episode_number} ${episode.name}`}</h2> */}
              <h2 className={styles.episodeName}>
                <span>E{episode.episode_number}</span> {episode.name}
              </h2>
              <p className={styles.overview}>{episode.overview}</p>
              <p className={styles.date}>{episode.air_date}</p>
            </div>
          );
        })}
      </div>
    );
  }
  return (
    <div className={styles.episodesContainer}>
      <div className={styles.dropdown}>
        <select value={season} onChange={onChangeHandler}>
          {new Array(numOfSeasons)
            .fill(0)
            .map((ele, idx) => {
              return idx + 1;
            })
            .map((ele) => {
              return (
                <option key={ele} value={ele}>
                  {ele}
                </option>
              );
            })}
        </select>
        {content}
      </div>
    </div>
  );
};

export default Episodes;
