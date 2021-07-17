import React from "react";
import styles from "./Credits.module.css";
const Credits = ({ credits }) => {
  return (
    <div className={styles.credits}>
      <ul className={styles.list}>
        {credits.cast
          .sort((a, b) => {
            if (!a.release_date) {
              return -1;
            }
            if (!b.release_date) {
              return 1;
            }
            if (new Date(a.release_date) > new Date(b.release_date)) {
              return -1;
            }
            if (new Date(b.release_date) > new Date(a.release_date)) {
              return 1;
            }
          })
          .map((obj) => {
            return (
              <li className={styles.listItem} key={obj.id}>
                <p>{obj.release_date ? obj.release_date.split("-")[0] : "—"}</p>
                <p>
                  {obj.original_title}{" "}
                  {obj.character && <span>as {obj.character}</span>}{" "}
                </p>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default Credits;
