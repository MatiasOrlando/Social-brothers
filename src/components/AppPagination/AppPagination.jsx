import React from "react";
import Pagination from "@mui/material/Pagination";
import { Box } from "@mui/material";

const AppPagination = ({ totalPages, page, setPage }) => {
  const handleChange = (event, page) => {
    setPage(+page);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Pagination
        onChange={handleChange}
        page={page}
        count={totalPages}
        siblingCount={page < 5 ? 1 : 2}
        sx={{
          "& .MuiPaginationItem-root": {
            color: "black",
            borderRadius: "50%",
            width: 32,
            height: 32,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: "0 4px",
            "&.Mui-selected": {
              backgroundColor: "gray",
              color: "black",
              opacity: "0.6",
            },
          },
          "& .MuiPaginationItem-previous": {
            marginRight: "4px",
          },
          "& .MuiPaginationItem-next": {
            marginLeft: "4px",
          },
        }}
      />
    </Box>
  );
};

export default AppPagination;
