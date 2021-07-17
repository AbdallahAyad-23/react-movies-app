import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "../landing/landing.module.css";
import Hero from "../../components/Hero/Hero";
import Carousel from "../../components/Carousel/Carousel";
import Loader from "../../components/Loader/Loader";

const Tv = () => {
  const [state, setState] = useState({
    popularShows: [],
    topratedShows: [],
    currentlyAiring: [],
    airingToday: [],
    hero: {},
  });
  const random = (max) => {
    return Math.floor(Math.random() * Math.floor(max));
  };
  const fetchTrending = () => {
    const popularShowsURL = `https://api.themoviedb.org/3/tv/popular?api_key=be4df36e59b67942bd7a12d9ac6f38d8`;
    const topratedShowsURL = `https://api.themoviedb.org/3/tv/top_rated?api_key=be4df36e59b67942bd7a12d9ac6f38d8`;
    const currentlyAiringURL = `https://api.themoviedb.org/3/tv/on_the_air?api_key=be4df36e59b67942bd7a12d9ac6f38d8`;
    const airingTodayURL = `https://api.themoviedb.org/3/tv/airing_today?api_key=be4df36e59b67942bd7a12d9ac6f38d8`;
    const requestOne = axios.get(popularShowsURL);
    const requestTwo = axios.get(topratedShowsURL);
    const requestThree = axios.get(currentlyAiringURL);
    const requestFour = axios.get(airingTodayURL);
    axios.all([requestOne, requestTwo, requestThree, requestFour]).then(
      axios.spread((...responses) => {
        const responseOne = responses[0];
        const responseTwo = responses[1];
        const responseThree = responses[2];
        const responseFour = responses[3];
        const trending = {
          popularShows: responseOne,
          topratedShows: responseTwo,
          currentlyAiring: responseThree,
          airingToday: responseFour,
          hero: responses[random(3)].data.results[random(20)],
        };
        let filter = "tv";
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
          media="tv"
          title="Popular TV Shows"
          arr={state.popularShows.data.results}
          explore="popular"
        />
        <Carousel
          num_of_slides={5}
          media="tv"
          title="Top Rated TV Shows"
          arr={state.topratedShows.data.results}
          explore="top_rated"
        />
        <Carousel
          num_of_slides={5}
          media="tv"
          title="Currently Airing TV Shows"
          arr={state.currentlyAiring.data.results}
          explore="currently_airing"
        />
        <Carousel
          num_of_slides={5}
          media="tv"
          title="TV Shows Airing Today"
          arr={state.airingToday.data.results}
          explore="airing_today"
        />
      </>
    );
  }
  return <div className={styles.landing}>{result}</div>;
};

export default Tv;
