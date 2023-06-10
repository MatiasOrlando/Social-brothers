import React, { useContext, useState, useEffect, useRef } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { context } from "../../Context/Context";
import PostCard from "../PostCard/PostCard";
import CustomButton from "../CustomButton/CustomButton";
import styles from "./PostsActivity.module.css";

const PostsActivity = () => {
  const { allPosts, loading } = useContext(context);
  const [loadedPosts, setLoadedPosts] = useState([]);
  const [buttonShow, setButtonShow] = useState(false);
  const postActivityContainerRef = useRef();

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

  const scrollIntoView = () => {
    if (
      postActivityContainerRef.current &&
      postActivityContainerRef.current.lastElementChild
    ) {
      postActivityContainerRef.current.lastElementChild.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    setLoadedPosts(initialPosts);
    setButtonShow(true);
  }, [allPosts]);

  useEffect(() => {
    if (loadedPosts.length > initialPosts.length) {
      scrollIntoView();
    }
  }, [loadedPosts]);

  return (
    <section className={styles.postActivityContainer}>
      {loading ? (
        <div className={styles.loadingContainer}>
          <CircularProgress />
        </div>
      ) : (
        <>
          <div className={styles.cardContainer} ref={postActivityContainerRef}>
            {loadedPosts.map((post) => (
              <PostCard key={post.id} postData={post} />
            ))}
          </div>
          <div className={styles.containerBtnLoadPosts}>
            {buttonShow && loadedPosts.length < allPosts.length && (
              <CustomButton
                className={styles.buttonLoadPosts}
                text="Laad meer"
                handleClick={loadMorePosts}
              />
            )}
          </div>
        </>
      )}
    </section>
  );
};

export default PostsActivity;
