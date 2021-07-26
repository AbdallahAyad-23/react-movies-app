import React from "react";
import styles from "./Overview.module.css";
import Carousel from "../Carousel/Carousel";
const Overview = (props) => {
  console.log(props.credits.cast);
  let director = null;
  let overview = null;
  if (props.media === "movie") {
    director = props.credits.crew.find((obj) => {
      if (obj.job === "Director") {
        return obj;
      }
    });
    overview = (
      <>
        <div className={styles.left}>
          {props.release_date && (
            <li className={styles.listItem}>
              <p>Released</p>
              <p>{props.release_date}</p>
            </li>
          )}
          {director && (
            <li className={styles.listItem}>
              <p>Director</p>
              <p>{director.name}</p>
            </li>
          )}
          {props.genres.length > 0 && (
            <li className={styles.listItem}>
              <p>Genre</p>
              <p className={styles.genres}>
                {props.genres.map((obj, idx) => {
                  if (idx === props.genres.length - 1) {
                    return (
                      <span className={styles.genre} key={obj.name}>
                        {obj.name}
                      </span>
                    );
                  }
                  return (
                    <span className={styles.genre} key={obj.name}>
                      {obj.name + ","}
                    </span>
                  );
                })}
              </p>
            </li>
          )}
          {props.spoken_languages.length && (
            <li className={styles.listItem}>
              <p>Language</p>
              <p>{props.spoken_languages[0].name}</p>
            </li>
          )}
        </div>
        <div className={styles.right}>
          {props.runtime && (
            <li className={styles.listItem}>
              <p>Runtime</p>
              <p>{props.runtime}</p>
            </li>
          )}
          {props.budget !== 0 && (
            <li className={styles.listItem}>
              <p>Budget</p>
              <p>{props.budget}</p>
            </li>
          )}
          {props.status && (
            <li className={styles.listItem}>
              <p>Status</p>
              <p>{props.status}</p>
            </li>
          )}
          {props.production_companies.length > 0 && (
            <li className={styles.listItem}>
              <p>Production</p>
              <p className={styles.production}>
                {props.production_companies.map((obj, idx) => {
                  if (idx === props.production_companies.length - 1) {
                    return <span key={obj.name}>{obj.name}</span>;
                  }
                  return <span key={obj.name}>{obj.name}, </span>;
                })}
              </p>
            </li>
          )}
        </div>
      </>
    );
  }

  if (props.media === "tv") {
    overview = (
      <>
        <div className={styles.left}>
          {props.first_air_date && (
            <li className={styles.listItem}>
              <p>First Aired</p>
              <p>{props.first_air_date}</p>
            </li>
          )}
          {props.episode_run_time.length !== 0 && (
            <li className={styles.listItem}>
              <p>Runtime</p>
              <p>{props.episode_run_time}</p>
            </li>
          )}
          {props.genres.length !== 0 && (
            <li className={styles.listItem}>
              <p>Genre</p>
              <p className={styles.genres}>
                {props.genres.map((obj, idx) => {
                  if (idx === props.genres.length - 1) {
                    return (
                      <span className={styles.genre} key={obj.name}>
                        {obj.name}
                      </span>
                    );
                  }
                  return (
                    <span className={styles.genre} key={obj.name}>
                      {obj.name + ","}
                    </span>
                  );
                })}
              </p>
            </li>
          )}
          {props.number_of_episodes && (
            <li className={styles.listItem}>
              <p>Episodes</p>
              <p>{props.number_of_episodes}</p>
            </li>
          )}
          {props.spoken_languages.length !== 0 && (
            <li className={styles.listItem}>
              <p>Language</p>
              <p>{props.spoken_languages[0].name}</p>
            </li>
          )}
        </div>
        <div className={styles.right}>
          {props.last_air_date && (
            <li className={styles.listItem}>
              <p>Last Aired</p>
              <p>{props.last_air_date}</p>
            </li>
          )}
          {props.created_by.length !== 0 && (
            <li className={styles.listItem}>
              <p>Creator</p>
              <p>{props.created_by[0].name}</p>
            </li>
          )}
          {props.number_of_seasons && (
            <li className={styles.listItem}>
              <p>Seasons</p>
              <p>{props.number_of_seasons}</p>
            </li>
          )}
          {props.status && (
            <li className={styles.listItem}>
              <p>Status</p>
              <p>{props.status}</p>
            </li>
          )}
          {props.networks.length !== 0 && (
            <li className={styles.listItem}>
              <p>Production</p>
              <p>{props.networks[0].name}</p>
            </li>
          )}
        </div>
      </>
    );
  }

  return (
    <>
      <div className={styles.overview}>
        <img
          className={styles.overviewImg}
          src={`https://image.tmdb.org/t/p/w370_and_h556_bestv2/${props.poster_path}`}
          alt="movie"
        />
        <div className={styles.details}>
          <h2>Storyline</h2>
          <p>{props.overview}</p>
          <ul className={styles.list}>{overview}</ul>
        </div>
      </div>
      {props.credits.cast.length !== 0 && (
        <div>
          <Carousel
            media="movie"
            title="Cast"
            arr={props.credits.cast}
            cast={true}
          />
        </div>
      )}
    </>
  );
};

export default Overview;
