import React, { useContext, useState } from "react";
import { context } from "../../../Context/Context";
import styles from "./Blog.module.css";
import PostCard from "../../components/PostCard/PostCard";
import AppPagination from "../../components/AppPagination/AppPagination";

const Blog = () => {
  const { allPosts, page } = useContext(context);
  const postsPerPage = 8;
  const totalPages = Math.ceil(allPosts.length / postsPerPage);
  const startIndex = (page - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const currentPosts = allPosts.slice(startIndex, endIndex);

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div className={styles.postsContainer}>
          {currentPosts.map((post) => (
            <PostCard postData={post} key={post.id} />
          ))}
        </div>
      </div>
      <AppPagination totalPages={totalPages} />
    </>
  );
};

export default Blog;
