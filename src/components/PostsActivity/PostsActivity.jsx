import React, { useContext, useState, useEffect } from "react";
import styles from "./PostsActivity.module.css";
import { context } from "../../../Context/Context";
import PostCard from "../PostCard/PostCard";

const PostsActivity = () => {
  const { allPosts } = useContext(context);
  const [loadedPosts, setLoadedPosts] = useState([]);

  const sortedPosts = allPosts
    .slice()
    .sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
  const initialPosts = sortedPosts.slice(-4);

  const loadMorePosts = () => {
    const startIndex = loadedPosts.length;
    const remainingPosts = allPosts.length - loadedPosts.length;
    const additionalPosts = Math.min(4, remainingPosts);
    const newPosts = allPosts.slice(startIndex, startIndex + additionalPosts);
    setLoadedPosts((prevPosts) => [...prevPosts, ...newPosts]);
  };

  const showLessPosts = () => {
    setLoadedPosts(initialPosts);
  };

  useEffect(() => {
    setLoadedPosts(initialPosts);
  }, [allPosts]);

  return (
    <div className={styles.postActivityContainer}>
      <div className={styles.cardContainer}>
        {loadedPosts.map((post, i) => (
          <PostCard key={i} postData={post} />
        ))}
      </div>
      <div className={styles.containerBtnLoadPosts}>
        {loadedPosts.length < allPosts.length ? (
          <button onClick={loadMorePosts} className="buttonNewPost">
            <span className="buttonTextPost">Load More</span>
          </button>
        ) : (
          <button onClick={showLessPosts} className="buttonNewPost">
            <span className="buttonTextPost">Show less</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default PostsActivity;
