import React, { useContext, useState } from "react";
import styles from "./Blog.module.css";
import PostCard from "../../components/PostCard/PostCard";
import AppPagination from "../../components/AppPagination/AppPagination";
import CircularProgress from "@mui/material/CircularProgress";
import { context } from "../../Context/Context";

const Blog = () => {
  const { allPosts, loading } = useContext(context);
  const [page, setPage] = useState(1);

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
        {loading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "200px",
              height: "400px",
            }}
          >
            <CircularProgress />
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div className={styles.postsContainer}>
              {currentPosts.map((post) => (
                <PostCard postData={post} key={post.id} />
              ))}
            </div>
            <AppPagination
              totalPages={totalPages}
              page={page}
              setPage={setPage}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default Blog;
