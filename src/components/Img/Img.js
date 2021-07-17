import React, { useEffect, useRef, useContext } from "react";
import styles from "./Img.module.css";
import { clearFunctionsContext } from "../../util/Context";
import { MdBrokenImage } from "react-icons/md";
const Img = (props) => {
  const el = useRef(null);

  const preloadImage = (img) => {
    const src = img.getAttribute("data-src");
    if (!src) {
      return;
    }
    img.src = src;
  };
  const imgObserver = new IntersectionObserver((entries, imgObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        preloadImage(entry.target);
        imgObserver.unobserve(entry.target);
      }
    });
  });
  useEffect(() => {
    imgObserver.observe(el.current);
  }, []);
  let className = `${styles.imgContainer} ${props.cast && styles.cast} ${
    props.broken && styles.broken
  } ${props.backdrop && styles.backdrop} ${props.poster && styles.poster} ${
    props.episode && styles.episodeImg
  }`;
  // if (props.backdrop) {
  //   className = `${styles.backdrop}`;
  // }
  // if (props.poster) {
  //   className = `${styles.poster}`;
  // }
  return (
    <div className={styles.Container}>
      <div className={className}>
        <img
          ref={el}
          data-src={props.src}
          alt={props.alt}
          className={styles.img}
        />
        {props.broken && <MdBrokenImage />}
      </div>
      {props.name && <h2 className={styles.name}>{props.name}</h2>}
      {props.character && (
        <h2 className={styles.character}>{props.character}</h2>
      )}
    </div>
  );
};

export default Img;
