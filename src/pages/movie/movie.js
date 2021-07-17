import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "../landing/landing.module.css";
import Hero from "../../components/Hero/Hero";
import Carousel from "../../components/Carousel/Carousel";
import Loader from "../../components/Loader/Loader";
const Movie = () => {
  const [state, setState] = useState({
    popularMovies: [],
    topratedMovies: [],
    upcomingMovies: [],
    nowplayingMovies: [],
    hero: {},
  });
  const random = (max) => {
    return Math.floor(Math.random() * Math.floor(max));
  };
  const fetchTrending = () => {
    const popularMoviesURL = `https://api.themoviedb.org/3/movie/popular?api_key=be4df36e59b67942bd7a12d9ac6f38d8`;
    const topratedMoviesURL = `https://api.themoviedb.org/3/movie/top_rated?api_key=be4df36e59b67942bd7a12d9ac6f38d8`;
    const upcomingMoviesURL = `https://api.themoviedb.org/3/movie/upcoming?api_key=be4df36e59b67942bd7a12d9ac6f38d8`;
    const nowplayingMoviesURL = `https://api.themoviedb.org/3/movie/now_playing?api_key=be4df36e59b67942bd7a12d9ac6f38d8`;
    const requestOne = axios.get(popularMoviesURL);
    const requestTwo = axios.get(topratedMoviesURL);
    const requestThree = axios.get(upcomingMoviesURL);
    const requestFour = axios.get(nowplayingMoviesURL);
    axios.all([requestOne, requestTwo, requestThree, requestFour]).then(
      axios.spread((...responses) => {
        const responseOne = responses[0];
        const responseTwo = responses[1];
        const responseThree = responses[2];
        const responseFour = responses[3];
        const trending = {
          popularMovies: responseOne,
          topratedMovies: responseTwo,
          upcomingMovies: responseThree,
          nowplayingMovies: responseFour,
          hero: responses[random(3)].data.results[random(20)],
        };
        let filter = "movie";
        axios
          .get(
            `http://api.themoviedb.org/3/${filter}/${trending.hero.id}/videos?api_key=be4df36e59b67942bd7a12d9ac6f38d8`
          )
          .then((result) => {
            return result.data;
          })
          .then((results) => {
            const video = results.results[0];
            const hero = { ...trending.hero, video };
            trending.hero = hero;
            setState(trending);
          });
      })
    );
  };
  useEffect(() => {
    fetchTrending();
  }, []);
  let result = <Loader />;
  if (Object.keys(state.hero).length !== 0) {
    result = (
      <>
        <Hero {...state.hero} />
        <Carousel
          num_of_slides={5}
          media="movie"
          title="Popular Movies"
          arr={state.popularMovies.data.results}
          explore="popular"
        />
        <Carousel
          num_of_slides={5}
          media="movie"
          title="Top Rated Movies"
          arr={state.topratedMovies.data.results}
          explore="top_rated"
        />
        <Carousel
          num_of_slides={5}
          media="movie"
          title="Upcoming Movies"
          arr={state.upcomingMovies.data.results}
          explore="upcoming"
        />
        <Carousel
          num_of_slides={5}
          media="movie"
          title="Now Playing Movies"
          arr={state.nowplayingMovies.data.results}
          explore="now_playing"
        />
      </>
    );
  }
  return <div className={styles.landing}>{result}</div>;
};

export default Movie;
