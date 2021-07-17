import React, { useState } from "react";
import styles from "./Hero.module.css";
import StarRatings from "react-star-ratings";
import Trailer from "../Trailer/Trailer";

const Hero = (props) => {
  const img = `https://image.tmdb.org/t/p/original/${props.backdrop_path}`;
  const [trailer, showTrailer] = useState(false);
  let date = null;
  if (props.release_date) {
    date = props.release_date.split("-")[0];
  } else {
    date = props.first_air_date.split("-")[0];
  }
  let video = null;
  if (props.video && trailer) {
    video = <Trailer close={showTrailer} video_key={props.video.key} />;
  }
  return (
    <div className={styles.hero}>
      {video}
      <div className={styles.heroInfo}>
        <h1>{props.name || props.original_title}</h1>
        <div className={styles.rating}>
          <StarRatings
            rating={props.vote_average / 2.0}
            numberOfStars={5}
            starDimension="18px"
            starRatedColor="rgb(34, 150, 243)"
            starSpacing="2px"
            starEmptyColor="rgb(91, 89, 89)"
          />{" "}
          <span>{props.vote_count} Reviews</span>
          <span>{date}</span>
          {props.runtime && <span>{props.runtime} min</span>}
        </div>
        <p>{`${props.overview.substring(0, 250)}...`}</p>
        {props.video && (
          <button
            className={styles.watchTrailerButton}
            onClick={() => showTrailer(true)}
          >
            <span className="material-icons">play_arrow</span>
            Watch Trailer
          </button>
        )}
      </div>
      <div className={styles.imgContainer}>
        {props.backdrop_path ? (
          <img src={img} alt="movie" className={styles.heroImg} />
        ) : (
          <div className={styles.heroImg}></div>
        )}
      </div>
    </div>
  );
};

export default Hero;
