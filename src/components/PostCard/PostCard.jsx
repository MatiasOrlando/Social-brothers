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
    return `${month < 10 ? "0" + month : month}-${
      day < 10 ? "0" + day : day
    }-${year}`;
  };

  return (
    <article
      className={
        pathname === "/blog"
          ? styles.postCardContainerBlog
          : styles.postCardContainer
      }
    >
      <figure className={styles.imageContainer}>
        <img
          className={
            pathname === "/blog" ? styles.imagePostBlog : styles.imagePost
          }
          src={`${baseUrl}/storage/${img_url}`}
          alt={title}
        />
        <figcaption>
          <span className={styles.dateSpan}>
            {formatDate(postData.created_at)}
          </span>
          <span className={styles.categorySpan}>{category.name}</span>
        </figcaption>
      </figure>
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "14px" }}
      >
        <div className={styles.cardInfo}>
          <h2 className={styles.cardTitle}>{title}</h2>
          <div className={styles.cardContent}>{content}</div>
        </div>
      </div>
    </article>
  );
};

export default PostCard;
