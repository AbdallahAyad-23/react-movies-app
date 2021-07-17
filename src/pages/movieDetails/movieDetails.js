import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./movieDetails.module.css";
import Hero from "../../components/Hero/Hero";
import Carousel from "../../components/Carousel/Carousel";
import Overview from "../../components/Overview/Overview";
import Videos from "../../components/Videos/Videos";
import { useParams, NavLink } from "react-router-dom";
import Photos from "../../components/Photos/Photos";
import Episodes from "../../components/Episodes/Episodes";
import Loader from "../../components/Loader/Loader";
const MovieDetails = () => {
  const { id } = useParams();
  const { media } = useParams();
  const [state, setState] = useState({});
  const [selectedRoute, setSelectedRoute] = useState("overview");
  const [play, setPlay] = useState({ play: false, key: "" });
  const fetch = async () => {
    const url = `https://api.themoviedb.org/3/${media}/${id}?api_key=be4df36e59b67942bd7a12d9ac6f38d8&append_to_response=videos,images,credits,recommendations`;
    const response = await axios.get(url);
    const result = await response.data;
    setState(result);
  };
  const selectFilterHandler = (e) => {
    const ele = e.target;
    const selectedRoute = ele.textContent.toLowerCase();
    setSelectedRoute(selectedRoute);
  };
  const playHandler = (key) => {
    setPlay({ play: true, key });
  };
  useEffect(() => {
    fetch();
  }, [id]);
  let result = <Loader />;
  if (Object.keys(state).length !== 0) {
    const heroObj = { ...state, video: state.videos.results[0] };
    result = (
      <>
        <Hero {...heroObj} />
        <div className={styles.container}>
          <div className={styles.routes}>
            <button
              className={selectedRoute === "overview" ? styles.selected : null}
              onClick={(e) => selectFilterHandler(e)}
            >
              OVERVIEW
            </button>
            {media === "tv" && (
              <button
                className={
                  selectedRoute === "episodes" ? styles.selected : null
                }
                onClick={(e) => selectFilterHandler(e)}
              >
                EPISODES
              </button>
            )}
            {state.videos.results.length !== 0 && (
              <button
                className={selectedRoute === "videos" ? styles.selected : null}
                onClick={(e) => selectFilterHandler(e)}
              >
                VIDEOS
              </button>
            )}
            <button
              className={selectedRoute === "photos" ? styles.selected : null}
              onClick={(e) => selectFilterHandler(e)}
            >
              PHOTOS
            </button>
          </div>
          {selectedRoute === "overview" && (
            <Overview {...state} media={media} />
          )}
          {selectedRoute === "episodes" && (
            <Episodes numOfSeasons={state.number_of_seasons} id={id} />
          )}

          {selectedRoute === "videos" && (
            <Videos
              videos={state.videos}
              playHandler={playHandler}
              setPlay={setPlay}
              play={play}
            />
          )}
          {selectedRoute === "photos" && <Photos images={state.images} />}

          {state.recommendations.results.length !== 0 && (
            <div>
              <Carousel
                media={media}
                title="More Like This"
                arr={state.recommendations.results}
                num_of_slides={5}
              />
            </div>
          )}
        </div>
      </>
    );
  }
  return <div className={styles.page}>{result}</div>;
};

export default MovieDetails;
