import React, { useContext, useState } from "react";
import PostCard from "../PostCard/PostCard";
import AppPagination from "../AppPagination/AppPagination";
import { context } from "../../Context/Context";
import styles from "./GridPostsBlog.module.css";

const GridPostsBlog = () => {
  const { allPosts } = useContext(context);
  const [page, setPage] = useState(1);
  const postsPerPage = 8;
  const totalPages = Math.ceil(allPosts.length / postsPerPage);
  const startIndex = (page - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const currentPosts = allPosts.slice(startIndex, endIndex);

  return (
    <section style={{ minHeight: "507px", marginTop: "64px" }}>
      <div className={styles.postsContainer}>
        {currentPosts.map((post) => (
          <PostCard postData={post} key={post.id} />
        ))}
      </div>
      <AppPagination totalPages={totalPages} page={page} setPage={setPage} />
    </section>
  );
};

export default GridPostsBlog;
