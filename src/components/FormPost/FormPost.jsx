import React, { useState, useContext } from "react";
import axios from "axios";
import styles from "./FormPost.module.css";
import CustomButton from "../CustomButton/CustomButton";
import { context } from "../../Context/Context";
import { baseUrl } from "../../utils/url";
import { token } from "../../services/api";
import { RiArrowDropDownLine } from "react-icons/ri";
import { AiOutlineCamera } from "react-icons/Ai";
import toast, { Toaster } from "react-hot-toast";

const FormPost = () => {
  const { allCategories, fetchAllPosts } = useContext(context);
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
    if (!formData.title.trim() || !formData.content.trim()) {
      return;
    }
    e.target.reset();
    setValidCategory("");
    setFileSelected(false);

    try {
      await axios.post(`${baseUrl}/api/posts`, formData, {
        headers: {
          token,
          "Content-Type": "multipart/form-data",
        },
      });

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
              <label htmlFor="title" className={styles.titlePost}>
                Berichtnaam
              </label>
              <input
                type="text"
                id="title"
                placeholder="Geen title"
                className={styles.titleInput}
                onChange={formValues}
                name="title"
                required
              />
            </div>
            <div className={styles.titleContainer}>
              <label htmlFor="category_id" className={styles.titlePost}>
                Categorie
              </label>
              <div className={styles.customSelect}>
                <div className={styles.selectWrapper}>
                  <select
                    id="category_id"
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
              <label htmlFor="image" className={styles.titlePost}>
                Header afbeelding
              </label>
              <div className={styles.inputImg}>
                <AiOutlineCamera className={styles.cameraIcon} />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  id="image"
                  name="image"
                  data-text={fileSelected ? "Verwijderen" : "Kies bestand"}
                  className={styles.fileUploadBtn}
                  required
                />
              </div>
            </div>
            <div className={styles.textAreaContainer}>
              <label htmlFor="content" className={styles.titlePost}>
                Bericht
              </label>
              <textarea
                id="content"
                className={styles.textAreaInput}
                onChange={formValues}
                name="content"
                required
              />
            </div>
            <div className={styles.buttonContainer}>
              <CustomButton
                className={"buttonNewPost"}
                text="Bericht aanmaken"
              />
            </div>
          </form>
        </div>
      </section>
      <Toaster />
    </>
  );
};

export default FormPost;
