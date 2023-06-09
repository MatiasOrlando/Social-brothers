import React, { createContext, useState, useEffect } from "react";
import { fetchData } from "../services/api";
import { baseUrl } from "../utils/url";

export const context = createContext();
const { Provider } = context;

const Context = ({ children }) => {
  const [allPosts, setAllPosts] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAllPosts = async () => {
    setLoading(true);
    try {
      const url = `${baseUrl}/api/posts?page=1&perPage=100000`;
      const data = await fetchData(url);
      setAllPosts(data.data);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const fetchAllCategories = async () => {
    setLoading(true);
    try {
      const url = `${baseUrl}/api/categories`;
      const data = await fetchData(url);
      setAllCategories(data);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchAllCategories();
    fetchAllPosts();
  }, []);

  const valueContext = {
    allPosts,
    allCategories,
    loading,
    fetchAllPosts,
  };

  return <Provider value={valueContext}>{children}</Provider>;
};

export default Context;
