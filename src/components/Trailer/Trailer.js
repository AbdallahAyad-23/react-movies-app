import React from "react";
import styles from "./Trailer.module.css";
const Trailer = ({ video_key, close }) => {
  return (
    <div className={styles.trailer}>
      <button className={styles.closeTrailer} onClick={() => close(false)}>
        <span className="material-icons">close</span>
      </button>
      <iframe
        width="1000"
        height="480"
        src={`https://www.youtube.com/embed/${video_key}?&autoplay=1`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default Trailer;
