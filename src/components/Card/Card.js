import React, { useState, useContext } from "react";
import styles from "./Card.module.css";
import Img from "../Img/Img";
import { clearFunctionsContext } from "../../util/Context";
import StarRatings from "react-star-ratings";
import { NavLink } from "react-router-dom";
const Card = (props) => {
  const clearFunctions = useContext(clearFunctionsContext);
  const onClickHandler = () => {
    if (clearFunctions.toggleSearch) {
      clearFunctions.setToggleSearch(false);
    }
    clearFunctions.setSearchQuery("");
    window.scrollTo(0, 0);
  };
  let img = null;
  let broken = false;
  let result = null;
  if (props.media_type === "movie") {
    img = `https://image.tmdb.org/t/p/w370_and_h556_bestv2/${props.poster_path}`;
    if (props.poster_path === null) {
      img = null;
      broken = true;
    }
    result = (
      <div className={styles.container} onClick={onClickHandler}>
        {/* <div className={styles.imgContainer}>
          <img src={img} alt="movie" className={styles.img} />
        </div> */}
        <Img alt={props.original_title} src={img} broken={broken} />
        <div className={styles.details}>
          <h2 className={styles.title}>{props.original_title}</h2>
          <div className={styles.rating}>
            <StarRatings
              rating={props.vote_average / 2.0}
              numberOfStars={5}
              starDimension="14px"
              starRatedColor="rgb(34, 150, 243)"
              starSpacing="2px"
              starEmptyColor="rgb(91, 89, 89)"
            />
            <span className={styles.avgRate}>{props.vote_average}</span>
          </div>
        </div>
      </div>
    );
  } else if (props.media_type === "person") {
    img = `https://image.tmdb.org/t/p/w370_and_h556_bestv2/${props.profile_path}`;
    if (props.profile_path === null) {
      img = null;
      broken = true;
    }
    result = (
      <div className={styles.container} onClick={onClickHandler}>
        {/* <div className={styles.imgContainer}>
          <img src={img} alt="actor" className={styles.img} />
        </div> */}
        <Img alt={props.name} src={img} broken={broken} />

        <div className={styles.details}>
          <h2>{props.name}</h2>
        </div>
      </div>
    );
  } else if (props.media_type === "tv") {
    img = `https://image.tmdb.org/t/p/w370_and_h556_bestv2/${props.poster_path}`;
    if (props.poster_path === null) {
      img = null;
      broken = true;
    }
    result = (
      <div className={styles.container} onClick={onClickHandler}>
        {/* <div className={styles.imgContainer}>
          <img src={img} alt="tv" className={styles.img} />
        </div> */}
        <Img alt={props.name} src={img} broken={broken} />
        <div className={styles.details}>
          <h2>{props.name}</h2>
          <div className={styles.rating}>
            <StarRatings
              rating={props.vote_average / 2.0}
              numberOfStars={5}
              starDimension="14px"
              starRatedColor="rgb(34, 150, 243)"
              starSpacing="2px"
              starEmptyColor="rgb(91, 89, 89)"
            />

            <span className={styles.avgRate}>{props.vote_average}</span>
          </div>
          {/* <p className={styles.date}>{props.first_air_date}</p>
          <p className={styles.overview}>{`${props.overview.substring(
            0,
            200
          )}...`}</p> */}
        </div>
      </div>
    );
  }
  return <NavLink to={`/${props.media_type}/${props.id}`}>{result}</NavLink>;
};

export default Card;
