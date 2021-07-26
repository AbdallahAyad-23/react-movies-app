import React, { useEffect, useRef, useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import Card from "../Card/Card";
import Img from "../Img/Img";
import styles from "./Carousel.module.css";

const Carousel = (props) => {
  let scrollAmount = useRef();
  const history = useHistory();
  const [forwardVisible, setForwardVisible] = useState(true);
  const [backwardVisible, setBackwardVisible] = useState(false);
  let sliders = useRef(null);

  const scrollHandler = (e) => {
    scrollAmount.current = sliders.current.scrollLeft;
    if (sliders.current.scrollLeft > 0 && !backwardVisible) {
      setBackwardVisible(true);
    }
    if (
      sliders.current.scrollLeft + e.target.offsetWidth + 50 >=
        e.target.scrollWidth &&
      forwardVisible
    ) {
      setForwardVisible(false);
    }
    if (sliders.current.scrollLeft === 0 && backwardVisible) {
      setBackwardVisible(false);
    }
    if (
      sliders.current.scrollLeft + e.target.offsetWidth + 50 <
        e.target.scrollWidth &&
      !forwardVisible
    ) {
      setForwardVisible(true);
    }
  };
  const forwardHandler = (e) => {
    let scrollPerClick = sliders.current.offsetWidth;

    if (
      scrollAmount.current <=
      sliders.current.scrollWidth - sliders.current.offsetWidth
    ) {
      sliders.current.scrollTo({
        top: 0,
        left: (scrollAmount.current += scrollPerClick),
      });
    }
  };
  const backwardHandler = (e) => {
    let scrollPerClick = sliders.current.offsetWidth;
    sliders.current.scrollTo({
      top: 0,
      left: (scrollAmount.current -= scrollPerClick),
    });
  };
  useEffect(() => {
    scrollAmount.current = 0;
    sliders.current.scrollLeft = 0;
    if (
      sliders.current.scrollLeft + sliders.current.offsetWidth + 50 >=
        sliders.current.scrollWidth &&
      forwardVisible
    ) {
      setForwardVisible(false);
    } else if (
      sliders.current.scrollLeft + sliders.current.offsetWidth + 50 <
        sliders.current.scrollWidth &&
      !forwardVisible
    ) {
      setForwardVisible(true);
    }
  }, [history.location.pathname.split("/")[2], props.arr]);
  return (
    <div className={styles.carousel}>
      <h1 className={styles.title}>
        {props.title}{" "}
        {props.explore && (
          <span>
            <NavLink
              className={styles.explore}
              to={`/${props.media}/category/${props.explore}`}
            >
              Explore All
            </NavLink>
          </span>
        )}
      </h1>
      <div
        className={`${styles.carouselbox} ${props.cast && styles.cast}`}
        ref={sliders}
        onScroll={(e) => scrollHandler(e)}
      >
        {!props.cast
          ? props.arr.map((obj) => {
              const newObj = { ...obj, media_type: props.media };
              return <Card {...newObj} key={obj.id} />;
            })
          : props.arr.map((obj) => {
              const newObj = { ...obj, media_type: props.media };
              return (
                <NavLink to={`/person/${obj.id}`} key={obj.id}>
                  <Img
                    {...newObj}
                    src={`https://image.tmdb.org/t/p/w370_and_h556_bestv2/${obj.profile_path}`}
                    broken={!obj.profile_path}
                    cast
                  />
                </NavLink>
              );
            })}
      </div>
      {backwardVisible && (
        <button
          className={`${styles.switchLeft} ${
            props.cast && styles.castBackward
          }`}
          onClick={backwardHandler}
        >
          <span className="material-icons">arrow_back_ios</span>
        </button>
      )}
      {forwardVisible && (
        <button
          className={`${styles.switchRight} ${
            props.cast && styles.castForward
          }`}
          onClick={forwardHandler}
        >
          <span className="material-icons">arrow_forward_ios</span>
        </button>
      )}
    </div>
  );
};

export default Carousel;
