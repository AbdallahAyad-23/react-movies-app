import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./landing.module.css";
import Carousel from "../../components/Carousel/Carousel";
import Hero from "../../components/Hero/Hero";
import Loader from "../../components/Loader/Loader";
const Landing = (props) => {
  const [trending, setTrending] = useState({
    trendingMovies: [],
    trendingShows: [],
    hero: {},
  });

  const random = Math.round(Math.random());
  const fetchTrending = () => {
    const trendingMoviesURL = `https://api.themoviedb.org/3/trending/movie/day?api_key=be4df36e59b67942bd7a12d9ac6f38d8`;
    const trendingShowsURL = `https://api.themoviedb.org/3/trending/tv/day?api_key=be4df36e59b67942bd7a12d9ac6f38d8`;
    const requestOne = axios.get(trendingMoviesURL);
    const requestTwo = axios.get(trendingShowsURL);
    axios.all([requestOne, requestTwo]).then(
      axios.spread((...responses) => {
        const responseOne = responses[0];
        const responseTwo = responses[1];
        const trending = {
          trendingMovies: responseOne,
          trendingShows: responseTwo,
          hero: responses[random].data.results[Math.floor(Math.random() * 19)],
        };
        let filter = "movie";
        if (trending.hero.media_type === "tv") {
          filter = "tv";
        }
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
            setTrending(trending);
          })
          .catch((err) => console.log(err));
      })
    );
  };
  useEffect(() => {
    fetchTrending();
  }, []);

  let result = <Loader />;
  if (
    Object.keys(trending.hero).length !== 0 &&
    trending.trendingMovies.length !== 0 &&
    trending.trendingShows.length !== 0
  ) {
    result = (
      <>
        <Hero {...trending.hero} />
        <Carousel
          media="movie"
          title="Trending Movies"
          arr={trending.trendingMovies.data.results}
          explore="trending"
          num_of_slides={5}
        />
        <Carousel
          media="tv"
          title="Trending Shows"
          arr={trending.trendingShows.data.results}
          explore="trending"
          num_of_slides={5}
        />
      </>
    );
  }
  return <div className={styles.landing}>{result}</div>;
};

export default Landing;
