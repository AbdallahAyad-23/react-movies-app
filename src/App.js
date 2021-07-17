import React, { useState, createContext, Fragment } from "react";
import {
  Switch,
  Route,
  BrowserRouter as Router,
  useHistory,
} from "react-router-dom";
import { clearFunctionsContext } from "./util/Context";
import Navbar from "../src/components/Navbar/Navbar";
import Landing from "../src/pages/landing/landing";
import Movie from "../src/pages/movie/movie";
import Tv from "../src/pages/tv/tv";
import MovieDetails from "../src/pages/movieDetails/movieDetails";
import Person from "../src/pages/person/person";
import Signup from "../src/pages/signup/signup";
import Signin from "../src/pages/signin/signin";
import SearchResults from "../src/pages/searchResults/searchResults";
import SearchBar from "../src/components/SearchBar/SearchBar";
const App = () => {
  const [toggleSearch, setToggleSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentLocation, setCurrentLocation] = useState("");
  const onClickHandler = () => {
    if (searchQuery === "" && toggleSearch) {
      setToggleSearch(false);
    }
  };

  return (
    <>
      <div className="App">
        <Router>
          <clearFunctionsContext.Provider
            value={{
              setToggleSearch,
              setSearchQuery,
              toggleSearch,
              searchQuery,
            }}
          >
            <SearchBar
              toggleSearch={toggleSearch}
              setToggleSearch={setToggleSearch}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              currentLocation={currentLocation}
            />
            <Navbar
              setToggleSearch={setToggleSearch}
              setCurrentLocation={setCurrentLocation}
            />
            <Switch>
              <Route path="/signup">
                <Signup />
              </Route>
              <Route path="/signin">
                <Signin />
              </Route>
              <Route path="/movie" exact>
                <Movie />
              </Route>
              <Route path="/tv" exact>
                <Tv />
              </Route>
              <Route path="/search/:query">
                <SearchResults />
              </Route>
              <Route path="/:media/category/:type">
                <SearchResults />
              </Route>
              <Route path="/person/:id">
                <Person />
              </Route>
              <Route path="/:media/:id">
                <MovieDetails />
              </Route>
              <Route path="/">
                <Landing showSearch={toggleSearch} />
              </Route>
            </Switch>
          </clearFunctionsContext.Provider>
        </Router>
      </div>
    </>
  );
};

export default App;
