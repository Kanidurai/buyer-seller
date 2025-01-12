import React, { useState } from "react";
import {
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarDensitySelector,
} from "@mui/x-data-grid";
import { IconButton } from "@mui/material";
import { makeStyles } from "@mui/styles";
import FilterListOutlinedIcon from "@mui/icons-material/FilterListOutlined";
import ViewColumnOutlinedIcon from "@mui/icons-material/ViewColumnOutlined";
import DensityMediumOutlinedIcon from "@mui/icons-material/DensityMediumOutlined";
import Search from "./search";

const useStyles = makeStyles({
  toolbarContainer: {
    backgroundColor: "#F6F6F9",
    padding: "10px",
    border: "0.5px solid #B7BAFF",
    borderRadius: "4px",
    marginTop: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
interface CustomToolbarProps {
  onSearchQueryChange: (query: string) => void;
  searchQuery: string;
}

const CustomToolbar: React.FC<CustomToolbarProps> = ({
  onSearchQueryChange,
  searchQuery,
}) => {  const classes = useStyles();

  return (
    <div style={{display:"flex", justifyContent:"space-between"}}>
    <GridToolbarContainer className={classes.toolbarContainer}>
        <IconButton
          style={{
            fontSize: "16px",
            lineHeight: "19.36px",
            fontWeight: "500",
            color: "#181D8C",
            backgroundColor: "#F6F6F9",
            borderRadius: "0px",
            textTransform: "none",
          }}
          component={GridToolbarColumnsButton}
        >
          <ViewColumnOutlinedIcon />
        </IconButton>
        <IconButton
          style={{
            fontSize: "16px",
            lineHeight: "19.36px",
            fontWeight: "500",
            color: "#181D8C",
            backgroundColor: "#F6F6F9",
            borderRadius: "0px",
            textTransform: "none",
          }}
          component={GridToolbarFilterButton}
        >
          <FilterListOutlinedIcon />
        </IconButton>
        <IconButton
          style={{
            fontSize: "16px",
            lineHeight: "19.36px",
            fontWeight: "500",
            color: "#181D8C",
            backgroundColor: "#F6F6F9",
            borderRadius: "0px",
            textTransform: "none",
          }}
          component={GridToolbarDensitySelector}
        >
          <DensityMediumOutlinedIcon />
        </IconButton>
         </GridToolbarContainer>
   
      <div style={{marginTop:"10px"}}>
      {onSearchQueryChange && <Search value={searchQuery} onChange={onSearchQueryChange} />}
      </div>
   
    </div>
  );
};

export default CustomToolbar;
