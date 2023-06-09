import { useContext, useState, useEffect, useRef } from "react";
import styles from "./PostsActivity.module.css";
import { context } from "../../Context/Context";
import PostCard from "../PostCard/PostCard";
import CircularProgress from "@mui/material/CircularProgress";
import CustomButton from "../CustomButton/CustomButton";

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
    setTimeout(() => {
      setButtonShow(true);
    }, 600);
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
            {loadedPosts.map((post, i) => (
              <PostCard key={i} postData={post} />
            ))}
          </div>
          <div className={styles.containerBtnLoadPosts}>
            {buttonShow && loadedPosts.length < allPosts.length && (
              <CustomButton
                className={"buttonLoadPosts"}
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
