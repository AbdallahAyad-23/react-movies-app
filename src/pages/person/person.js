import React, { useState, useEffect } from "react";
import { useParams, NavLink } from "react-router-dom";
import KnownFor from "../../components/KnownFor/KnownFor";
import Credits from "../../components/Credits/Credits";
import Loader from "../../components/Loader/Loader";
import styles from "./person.module.css";
import axios from "axios";

const Person = () => {
  const { id } = useParams();
  const [state, setState] = useState({});
  const [selectedRoute, setSelectedRoute] = useState("knownfor");

  const fetch = async () => {
    const url = `https://api.themoviedb.org/3/person/${id}?api_key=be4df36e59b67942bd7a12d9ac6f38d8&append_to_response=images,credits
  `;
    const response = await axios.get(url);
    const result = await response.data;
    setState(result);
  };

  const selectFilterHandler = (e) => {
    const ele = e.target;
    const selectedRoute = ele.textContent.replace(/ /g, "").toLowerCase();
    setSelectedRoute(selectedRoute);
  };
  useEffect(() => {
    fetch();
  }, [id]);
  let result = <Loader />;
  if (Object.keys(state).length !== 0) {
    result = (
      <div className={styles.content}>
        <div className={styles.top}>
          <img
            src={`https://image.tmdb.org/t/p/w370_and_h556_bestv2/${state.profile_path}`}
            className={styles.profile}
          />
          <div className={styles.bio}>
            <h2 className={styles.name}>{state.name}</h2>
            <p className={styles.biography}>{state.biography}</p>
            <ul className={styles.list}>
              <div className={styles.left}>
                {state.known_for_department && (
                  <li className={styles.listItem}>
                    <p>Known For</p>
                    <p>{state.known_for_department}</p>
                  </li>
                )}
                {state.place_of_birth && (
                  <li className={styles.listItem}>
                    <p>Place of Birth</p>
                    <p>{state.place_of_birth}</p>
                  </li>
                )}
              </div>
              <div className={styles.right}>
                {state.birthday && (
                  <li className={styles.listItem}>
                    <p>Born</p>
                    <p>{state.birthday}</p>
                  </li>
                )}
              </div>
            </ul>
          </div>
        </div>
        <div className={styles.filter}>
          <div className={styles.routes}>
            <button
              className={selectedRoute === "knownfor" ? styles.selected : null}
              onClick={(e) => selectFilterHandler(e)}
            >
              KNOWN FOR
            </button>

            <button
              className={selectedRoute === "credits" ? styles.selected : null}
              onClick={(e) => selectFilterHandler(e)}
            >
              CREDITS
            </button>
            <button
              className={selectedRoute === "photos" ? styles.selected : null}
              onClick={(e) => selectFilterHandler(e)}
            >
              PHOTOS
            </button>
          </div>
          {selectedRoute === "knownfor" && <KnownFor id={id} />}
          {selectedRoute === "credits" && <Credits credits={state.credits} />}
          {selectedRoute === "photos" && (
            <div>
              <h2 className={styles.photosTitle}>
                Photos <span>{state.images.profiles.length} Images</span>
              </h2>
              <div className={styles.photos}>
                {state.images.profiles.map((obj) => {
                  return (
                    <img
                      key={obj.file_path}
                      className={styles.img}
                      src={`https://image.tmdb.org/t/p/w370_and_h556_bestv2//${obj.file_path}`}
                    />
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
  return <div className={styles.page}>{result}</div>;
};

export default Person;
