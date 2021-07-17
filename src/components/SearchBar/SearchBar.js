import React, { useState, useMemo } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useHistory } from "react-router-dom";
const SearchBar = (props) => {
  const history = useHistory();
  const onChangeHandler = (e) => {
    const query = e.target.value;
    props.setSearchQuery(query);
    if (query.trim() === "") {
      props.setToggleSearch(false);
      return history.push(props.currentLocation);
    }
    if (props.searchQuery === query.trim()) {
      return;
    }
    history.push(`/search/${query.trim()}`);
  };
  const onCloseHandler = () => {
    props.setToggleSearch(false);
    history.push(props.currentLocation);
    props.setSearchQuery("");
  };
  let searchInput = null;
  if (props.toggleSearch) {
    searchInput = (
      <div className="search-container">
        <input
          type="text"
          className="search"
          placeholder="Search for a movie,tv show or a person..."
          value={props.searchQuery}
          onChange={onChangeHandler}
        />
        <span className="close-search" onClick={onCloseHandler}>
          <AiOutlineClose />
        </span>
      </div>
    );
  }
  return searchInput;
};

export default SearchBar;
