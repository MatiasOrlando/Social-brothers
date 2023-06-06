import React, { useState, useContext } from "react";
import axios from "axios";
import { context } from "../../../Context/Context";
import styles from "./FormPost.module.css";

const FormPost = () => {
  const { allCategories } = useContext(context);
  const [formData, setFormData] = useState({
    title: "",
    category_id: "",
    content: "",
    image: null,
  });

  const formValues = (e) => {
    const { name, value } = e.target;
    let categoryId = null;
    if (name === "category_id") {
      const selectedCategory = allCategories.find(
        (category) => category.name === value
      );
      if (selectedCategory) {
        categoryId = selectedCategory.id;
      }
    }
    setFormData({ ...formData, [name]: categoryId || value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, image: file });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    const token = "pj11daaQRz7zUIH56B9Z";
    try {
      const postData = new FormData();
      postData.append("title", formData.title);
      postData.append("category_id", formData.category_id);
      postData.append("content", formData.content);
      postData.append("image", formData.image);

      const newPost = await axios.post(
        "https://frontend-case-api.sbdev.nl/api/posts",
        postData,
        {
          headers: {
            token,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(newPost);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className={styles.formPost}>
      <h2 className={styles.titleForm}>Plaats een blog bericht</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.titleContainer}>
          <label className={styles.titlePost}>Berichtnaam</label>
          <input
            type="text"
            placeholder="Geen title"
            className={styles.titleInput}
            onChange={formValues}
            name="title"
            required
          />
        </div>
        <div className={styles.titleContainer}>
          <label className={styles.titlePost}>Categorie</label>
          <div className={styles.customSelect}>
            <select
              className={styles.titleInput}
              defaultValue="Geen categorie"
              onChange={formValues}
              name="category_id"
              required
            >
              <option style={{ color: "#C5C5C5" }}>Geen categorie</option>
              {allCategories?.map(({ name, id }) => {
                return <option key={id}>{name}</option>;
              })}
            </select>
          </div>
        </div>
        <div className={styles.titleContainer}>
          <label className={styles.titlePost}>Header afbeelding</label>
          <input
            type="file"
            accept="image/*"
            className={styles.inputImg}
            onChange={handleImageChange}
            name="image"
          />
        </div>

        <div className={styles.textAreaContainer}>
          <label className={styles.titlePost}>Bericht</label>
          <textarea
            className={styles.textAreaInput}
            required
            onChange={formValues}
            name="content"
          />
        </div>
        <div className={styles.buttonContainer}>
          <div>
            <button type="submit" className="buttonNewPost">
              <span className="buttonTextPost">Bericht aanmaken</span>
            </button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default FormPost;
