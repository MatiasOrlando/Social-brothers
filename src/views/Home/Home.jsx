import React from "react";
import FormPost from "../../components/FormPost/FormPost";
import PostsActivity from "../../components/PostsActivity/PostsActivity";
import styles from "./Home.module.css";

const Home = () => {
  return (
    <main className={styles.gridHome}>
      <section
        style={{
          gridColumn: "span 5",
          height: "675px",
        }}
      >
        <FormPost />
      </section>
      <section
        style={{
          gridColumn: "span 7",
          height: "675px",
        }}
      >
        <PostsActivity />
      </section>
    </main>
  );
};

export default Home;
