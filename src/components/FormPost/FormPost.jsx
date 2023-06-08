import React, { useState, useContext } from "react";
import axios from "axios";
import styles from "./FormPost.module.css";
import { RiArrowDropDownLine } from "react-icons/ri";
import { AiOutlineCamera } from "react-icons/Ai";
import toast, { Toaster } from "react-hot-toast";
import { context } from "../../Context/Context";

const FormPost = () => {
  const { allCategories, token, fetchAllPosts } = useContext(context);
  const [validCategory, setValidCategory] = useState("");
  const [fileSelected, setFileSelected] = useState(false);

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
    if (value !== "" && !isNaN(value)) setValidCategory(value);
    setFormData({ ...formData, [name]: categoryId || value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, image: file });
    setFileSelected(!!file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.target.reset();
    setValidCategory("");

    try {
      const postData = new FormData();
      postData.append("title", formData.title);
      postData.append("category_id", formData.category_id);
      postData.append("content", formData.content);
      postData.append("image", formData.image);

      await axios.post(
        "https://frontend-case-api.sbdev.nl/api/posts",
        postData,
        {
          headers: {
            token,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setFormData({
        title: "",
        category_id: "",
        content: "",
        image: null,
      });

      toast.success("Bericht succesvol aangemaakt", {
        duration: "100",
        style: {
          background: "black",
          color: "white",
        },
        className: "success-add-toast-test",
      });
      fetchAllPosts();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <section className={styles.formPost}>
        <div style={{ width: "403px" }}>
          <h2 className={styles.titleForm}>Plaats een blog bericht</h2>
          <form onSubmit={handleSubmit} id="postForm">
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
                <div className={styles.selectWrapper}>
                  <select
                    className={
                      validCategory === ""
                        ? styles.categoryInput
                        : styles.categoryInputValid
                    }
                    defaultValue=""
                    onChange={formValues}
                    name="category_id"
                    required
                  >
                    <option value="" disabled>
                      Geen categorie
                    </option>
                    {allCategories?.map(({ name, id }) => {
                      return (
                        <option key={id} value={id}>
                          {name}
                        </option>
                      );
                    })}
                  </select>
                  <div className={styles.dropdownIcon}>
                    <RiArrowDropDownLine />
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.titleContainer}>
              <label className={styles.titlePost}>Header afbeelding</label>
              <div className={styles.inputImg}>
                <AiOutlineCamera className={styles.cameraIcon} />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  id="imageInput"
                  name="image"
                  data-text={fileSelected ? "Verwijderen" : "Kies bestand"}
                  className={styles.fileUploadBtn}
                  required
                />
              </div>
            </div>
            <div className={styles.textAreaContainer}>
              <label className={styles.titlePost}>Bericht</label>
              <textarea
                className={styles.textAreaInput}
                onChange={formValues}
                name="content"
                required
              />
            </div>
            <div className={styles.buttonContainer}>
              <button type="submit" className="buttonNewPost">
                <span className="buttonTextPost">Bericht aanmaken</span>
              </button>
            </div>
          </form>
        </div>
      </section>
      <Toaster />
    </>
  );
};

export default FormPost;
