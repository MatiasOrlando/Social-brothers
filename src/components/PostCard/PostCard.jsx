import React from "react";
import styles from "./PostCard.module.css";
import { useLocation } from "react-router-dom";

const PostCard = ({ postData }) => {
  const { pathname } = useLocation();
  const { title, content, img_url, category } = postData;
  const baseUrl = "https://frontend-case-api.sbdev.nl";
  const formatDate = (dateString) => {
    const dateObj = new Date(dateString);
    const day = dateObj.getDate();
    const month = dateObj.getMonth() + 1;
    const year = dateObj.getFullYear();
    return `${month}-${day}-${year}`;
  };

  return (
    <div
      className={
        pathname === "/blog"
          ? styles.postCardContainerBlog
          : styles.postCardContainer
      }
    >
      <div className={styles.imageContainer}>
        <img
          className={
            pathname === "/blog" ? styles.imagePostBlog : styles.imagePost
          }
          src={`${baseUrl}/storage/${img_url}`}
          alt={title}
        />
        <div>
          <span className={styles.dateSpan}>
            {formatDate(postData.created_at)}
          </span>

          <span className={styles.categorySpan}>{category.name}</span>
        </div>
      </div>
      <div className={styles.cardInfo}>
        <div className={styles.cardTitle}>{title}</div>
        <div className={styles.cardContent}>{content}</div>
      </div>
    </div>
  );
};

export default PostCard;
