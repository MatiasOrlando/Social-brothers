import React from "react";
import FormPost from "../../components/FormPost/FormPost";
import PostsActivity from "../../components/PostsActivity/PostsActivity";
import styles from "./Home.module.css";

const Home = () => {
  return (
    <main style={{ display: "flex", justifyContent: "center" }}>
      <section className={styles.gridHome}>
        <FormPost />
        <PostsActivity />
      </section>
    </main>
  );
};

export default Home;
