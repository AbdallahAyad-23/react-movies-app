import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./KnownFor.module.css";
import Card from "../Card/Card";
const KnownFor = ({ id }) => {
  const [state, setState] = useState({});
  const fetch = async () => {
    const url = `https://api.themoviedb.org/3/person/${id}/combined_credits?api_key=be4df36e59b67942bd7a12d9ac6f38d8
    `;
    const response = await axios.get(url);
    const result = await response.data;
    setState(result);
  };
  useEffect(() => {
    fetch();
  }, [id]);
  let result = null;
  if (Object.keys(state).length !== 0) {
    result = (
      <div className={styles.knownFor}>
        {state.cast
          .sort((a, b) => new Date(b.release_date) - new Date(a.release_date))
          .map((obj) => {
            return <Card {...obj} key={obj.credit_id} />;
          })}
      </div>
    );
  }
  return result;
};

export default KnownFor;
