import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { baseUrl } from "../../utils/url";
import styles from "./PostCard.module.css";

const PostCard = ({ postData }) => {
  const [showPartialContent, setShowPartialContent] = useState(false);
  const { pathname } = useLocation();
  const { title, content, img_url, category } = postData;
  const isSingleWordTitle =
    pathname === "/blog" && title.trim().split(" ").length === 1;

  const formatDate = (dateString) => {
    const dateObj = new Date(dateString);
    const day = dateObj.getDate();
    const month = dateObj.getMonth() + 1;
    const year = dateObj.getFullYear();
    return `${month < 10 ? "0" + month : month}-${
      day < 10 ? "0" + day : day
    }-${year}`;
  };

  const handleWatchMore = () => {
    setShowPartialContent(!showPartialContent);
  };

  const getContentLimit = () => {
    if (pathname === "/blog") {
      return content.includes(" ") ? 120 : 80;
    } else if (content.includes(" ")) {
      return 130;
    } else {
      return 95;
    }
  };

  const partialContent = content.substr(0, getContentLimit());

  return (
    <article
      className={`${
        pathname === "/blog"
          ? styles.postCardContainerBlog
          : styles.postCardContainer
      } ${showPartialContent ? styles.expanded : ""}`}
    >
      <figure
        className={`${
          pathname === "/blog"
            ? styles.imageContainerBlog
            : styles.imageContainer
        }`}
      >
        <img
          className={styles.imagePost}
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
        <div
          className={`${
            pathname === "/blog" ? styles.cardInfoBlog : styles.cardInfo
          }`}
        >
          <h2
            className={`${
              pathname === "/blog" ? styles.cardTitleBlog : styles.cardTitle
            } ${isSingleWordTitle ? styles.singleWordTitle : ""}`}
          >
            {title}
          </h2>
          <div
            className={`${
              pathname === "/blog" ? styles.cardContentBlog : styles.cardContent
            }`}
          >
            {showPartialContent ? (
              <>
                {content}
                <span
                  onClick={handleWatchMore}
                  style={{ cursor: "pointer", fontWeight: "600" }}
                >
                  ...Minder weergeven
                </span>
              </>
            ) : (
              <>
                {partialContent}
                {content.length > getContentLimit() && (
                  <span
                    onClick={handleWatchMore}
                    style={{ cursor: "pointer", fontWeight: "600" }}
                  >
                    ...Lees meer
                  </span>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </article>
  );
};

export default PostCard;
