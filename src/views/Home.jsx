import React from "react";
import FormPost from "../components/FormPost/FormPost";
import PostsActivity from "../components/PostsActivity/PostsActivity";

const Home = () => {
  return (
    <div style={{ display: "flex", marginTop: "64px" }}>
      <FormPost />
      <PostsActivity />
    </div>
  );
};

export default Home;
