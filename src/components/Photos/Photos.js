import React from "react";
import styles from "./Photos.module.css";
import Img from "../Img/Img";
const Photos = (props) => {
  return (
    <div className={styles.photosContainer}>
      {props.images.backdrops.length !== 0 && (
        <div className={styles.backdropsContainer}>
          <h1 className={styles.title}>
            Backdrops <span>{props.images.backdrops.length} Images</span>
          </h1>
          <div className={styles.backdrops}>
            {props.images.backdrops.map((img) => {
              return (
                <Img
                  key={img.file_path}
                  backdrop
                  src={`https://image.tmdb.org/t/p/w533_and_h300_bestv2//${img.file_path}`}
                />
              );
            })}
          </div>
        </div>
      )}
      {props.images.posters.length !== 0 && (
        <div className={styles.postersContainer}>
          <h1 className={styles.title}>
            Posters <span>{props.images.posters.length} Images</span>
          </h1>
          <div className={styles.photos}>
            {props.images.posters.map((img) => {
              return (
                <Img
                  key={img.file_path}
                  poster
                  src={`https://image.tmdb.org/t/p/w370_and_h556_bestv2//${img.file_path}`}
                />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Photos;
