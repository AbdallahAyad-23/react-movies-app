import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import { NavLink, useParams } from "react-router-dom";
import useQuery from "../../util/useQuery";
import styles from "./searchResults.module.css";
import Card from "../../components/Card/Card";
import Loader from "../../components/Loader/Loader";
const SearchResults = () => {
  let navLinks = null;
  const pageQuery = useQuery();
  let currentPage = pageQuery.get("page") || 1;
  let filter = pageQuery.get("filter") || "multi";
  const { query } = useParams();
  const { media } = useParams();
  const { type } = useParams();
  const [results, setResults] = useState([]);
  const [totalPages, setTotalPages] = useState([]);
  // const [filter, setFilter] = useState("multi");
  const fetchAll = async () => {
    let url = `https://api.themoviedb.org/3/search/${filter}?api_key=be4df36e59b67942bd7a12d9ac6f38d8&query=${query}&page=${currentPage}`;
    if (type) {
      if (type === "trending") {
        url = `https://api.themoviedb.org/3/${type}/${media}/day?api_key=be4df36e59b67942bd7a12d9ac6f38d8&page=${currentPage}`;
      } else {
        url = `https://api.themoviedb.org/3/${media}/${type}?api_key=be4df36e59b67942bd7a12d9ac6f38d8&page=${currentPage}`;
        if (type === "currently_airing") {
          url = `https://api.themoviedb.org/3/${media}/${"on_the_air"}?api_key=be4df36e59b67942bd7a12d9ac6f38d8&page=${currentPage}`;
        }
      }
    }
    const response = await axios.get(url);
    const result = await response.data;
    setTotalPages(new Array(result.total_pages).fill(0));
    setResults(result.results);
    // if (filter === "multi") {
    //   setResults(result.results);
    // } else if (filter === "movie") {
    //   setResults(
    //     result.results.map((result) => {
    //       return { ...result, media_type: "movie" };
    //     })
    //   );
    // } else if (filter === "tv") {
    //   setResults(
    //     result.results.map((result) => {
    //       return { ...result, media_type: "tv" };
    //     })
    //   );
    // } else if (filter === "person") {
    //   setResults(
    //     result.results.map((result) => {
    //       return { ...result, media_type: "person" };
    //     })
    //   );
    // }
  };
  useEffect(() => {
    fetchAll();
  }, [query, currentPage]);

  if (totalPages.length !== 0) {
    let firstPage = 1;
    let lastPage = totalPages.length;
    let previousPage = currentPage - 1;
    let nextPage = +currentPage + 1;
    if (currentPage == lastPage) {
      nextPage = lastPage;
    }
    navLinks = (
      <>
        {
          <NavLink className={styles.pageNavLink} to={`?page=${firstPage}`}>
            {firstPage}
          </NavLink>
        }
        {previousPage !== firstPage && previousPage !== 0 && (
          <NavLink className={styles.pageNavLink} to={`?page=${previousPage}`}>
            {previousPage}
          </NavLink>
        )}
        {+currentPage !== firstPage && (
          <NavLink className={styles.pageNavLink} to={`?page=${+currentPage}`}>
            {+currentPage}
          </NavLink>
        )}
        {nextPage !== lastPage && (
          <NavLink className={styles.pageNavLink} to={`?page=${nextPage}`}>
            {nextPage}
          </NavLink>
        )}
        {lastPage !== +currentPage && (
          <NavLink className={styles.pageNavLink} to={`?page=${lastPage}`}>
            {lastPage}
          </NavLink>
        )}
      </>
    );
  }
  let title = null;
  if (type) {
    if (type === "trending") {
      title = <h1>{`Trending ${media + "s"}`}</h1>;
    } else {
      title = (
        <h1>{`${type.split("_").join(" ")} ${
          media === "tv" ? "TV Shows" : media + "s"
        }`}</h1>
      );
    }
  }
  let content = <Loader />;
  if (results.length !== 0) {
    content = results.map((result) => {
      if (result.media_type) {
        return <Card {...result} key={result.id} />;
      }
      const newObj = { ...result, media_type: media };
      return <Card {...newObj} key={result.id} />;
    });
  }

  return (
    <div className={styles.resultsPage} style={media && { paddingTop: "0px" }}>
      {query && <h1>Results For: {query}</h1>}
      {type && title}
      {<div className={styles.results}>{content}</div>}
      <div className={styles.pageNav}>{navLinks}</div>
    </div>
  );
};

export default SearchResults;
