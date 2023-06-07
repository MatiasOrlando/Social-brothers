import React from "react";
import FormPost from "../../components/FormPost/FormPost";
import PostsActivity from "../../components/PostsActivity/PostsActivity";
import styles from "./Home.module.css";

const Home = () => {
  return (
    <div className={styles.gridHome}>
      <div style={{ gridColumn: "span 5", height: "659px" }}>
        <FormPost />
      </div>
      <div style={{ gridColumn: "span 7", height: "659px" }}>
        <PostsActivity />
      </div>
    </div>
  );
};

export default Home;
