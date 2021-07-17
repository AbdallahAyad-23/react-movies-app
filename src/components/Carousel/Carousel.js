import React, { useEffect, useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import Card from "../Card/Card";
import Img from "../Img/Img";
import styles from "./Carousel.module.css";

const Carousel = (props) => {
  const history = useHistory();
  const [slides, setSlides] = useState(props.num_of_slides);
  const [boundaries, setBoundaries] = useState(() => {
    return {
      start: 0,
      end: slides,
      forwardVisiable: true,
      backwardVisiable: false,
    };
  });
  const handleResize = () => {
    if (props.cast) {
      if (window.innerWidth <= 769) {
        setSlides(4);
      } else if (window.innerWidth <= 1024) {
        setSlides(5);
      } else if (window.innerWidth >= 1025) {
        setSlides(6);
      }
    } else {
      if (window.innerWidth <= 769) {
        setSlides(3);
      } else if (window.innerWidth <= 1024) {
        setSlides(4);
      } else if (window.innerWidth >= 1025) {
        setSlides(5);
      }
    }
  };
  useEffect(() => {
    handleResize();
  }, []);
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });
  // const style = {
  //   gridTemplateColumns: `15px repeat(${props.num_of_slides},${
  //     1150 / props.num_of_slides
  //   }px) 15px`,
  // };
  useEffect(() => {
    setBoundaries((prevState) => {
      let obj = null;
      if (props.arr.length <= slides) {
        obj = { forwardVisiable: false, backwardVisiable: false };
      } else {
        obj = { forwardVisiable: true, backwardVisiable: false };
      }
      return {
        start: 0,
        end: slides,
        ...obj,
      };
    });
  }, [history.location.pathname, props.arr.length, slides]);

  const forwardHandler = () => {
    setBoundaries((prevState) => {
      if (prevState.end + slides > props.arr.length) {
        const diff = props.arr.length - prevState.end;
        return {
          start: prevState.start + diff,
          end: prevState.end + diff,
          forwardVisiable: false,
          backwardVisiable: true,
        };
      }

      const end = prevState.end + slides;
      if (end === props.arr.length) {
        return {
          ...prevState,
          start: prevState.start + slides,
          end: prevState.end + slides,
          forwardVisiable: false,
          backwardVisiable: true,
        };
      }
      return {
        ...prevState,
        start: prevState.start + slides,
        end: prevState.end + slides,
        backwardVisiable: true,
        forwardVisiable: true,
      };
    });
  };
  const backwardHandler = () => {
    setBoundaries((prevState) => {
      if (prevState.start - slides < 0 && prevState.start !== 0) {
        return {
          ...prevState,
          backwardVisiable: false,
          forwardVisiable: true,
          start: 0,
          end: slides,
        };
      }
      const start = prevState.start - slides;
      const end = prevState.end - slides;
      if (start === 0) {
        return {
          ...prevState,
          start: start,
          end: end,
          backwardVisiable: false,
          forwardVisiable: true,
        };
      }
      return {
        ...prevState,
        start: prevState.start - slides,
        end: prevState.end - slides,
        forwardVisiable: true,
      };
    });
  };
  return (
    <div className={styles.carouselContainer}>
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
        className={`${styles.sliderContainer} ${
          props.cast ? styles.cast : styles.regular
        }`}
      >
        <button
          className={styles.backwardButton}
          style={
            boundaries.backwardVisiable
              ? { visibility: "visible" }
              : { visibility: "hidden" }
          }
          onClick={backwardHandler}
        >
          <span className="material-icons">arrow_back_ios</span>
        </button>

        {!props.cast
          ? props.arr.slice(boundaries.start, boundaries.end).map((obj) => {
              const newObj = { ...obj, media_type: props.media };
              return <Card {...newObj} key={obj.id} height="350px" />;
            })
          : props.arr.slice(boundaries.start, boundaries.end).map((obj) => {
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

        <button
          className={styles.forwardButton}
          onClick={forwardHandler}
          style={
            boundaries.forwardVisiable
              ? { visibility: "visible" }
              : { visibility: "hidden" }
          }
        >
          <span className="material-icons">arrow_forward_ios</span>
        </button>
      </div>
    </div>
  );
};

export default Carousel;
