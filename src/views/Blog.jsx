import React, { useContext } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import GridPostsBlog from "../components/GridPostsBlog/GridPostsBlog";
import { context } from "../Context/Context";

const Blog = () => {
  const { loading } = useContext(context);

  return (
    <main style={{ display: "flex", justifyContent: "center" }}>
      {loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "200px",
            height: "400px",
          }}
        >
          <CircularProgress />
        </div>
      ) : (
        <GridPostsBlog />
      )}
    </main>
  );
};

export default Blog;
