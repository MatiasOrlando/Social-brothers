import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const context = createContext();
const { Provider } = context;

const Context = ({ children }) => {
  const token = import.meta.env.VITE_TOKEN;
  const [allPosts, setAllPosts] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const fetchAllPosts = async () => {
    try {
      const fetchedPosts = await axios.get(
        "https://frontend-case-api.sbdev.nl/api/posts?page=1&perPage=100000",
        {
          headers: {
            token,
          },
        }
      );
      setAllPosts(fetchedPosts.data.data);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const fetchAllCategories = async () => {
    try {
      const fetchedCategories = await axios.get(
        "https://frontend-case-api.sbdev.nl/api/categories",
        {
          headers: {
            token,
          },
        }
      );
      setAllCategories(fetchedCategories.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAllPosts();
    fetchAllCategories();
  }, []);

  const valueContext = {
    allPosts,
    allCategories,
    page,
    setPage,
    token,
    loading,
  };

  return <Provider value={valueContext}>{children}</Provider>;
};

export default Context;
