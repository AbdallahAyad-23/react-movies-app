import React from "react";
import Trailer from "../../components/Trailer/Trailer";

import styles from "./Videos.module.css";
const Videos = (props) => {
  return (
    <div className={styles.videos}>
      {props.videos.results.map((video) => {
        return (
          <div className={styles.video} key={video.key}>
            <div className={styles.imgContainer}>
              <img
                src={`https://img.youtube.com/vi/${video.key}/mqdefault.jpg`}
              />
              <span
                className={`material-icons ${styles.playButton}`}
                onClick={() => props.playHandler(video.key)}
              >
                play_circle_outline
              </span>
            </div>
            <h2 className={styles.videoName}>{video.name}</h2>
            <h2 className={styles.videoType}>{video.type}</h2>
          </div>
        );
      })}
      {props.play.play && (
        <Trailer close={props.setPlay} video_key={props.play.key} />
      )}
    </div>
  );
};

export default Videos;
