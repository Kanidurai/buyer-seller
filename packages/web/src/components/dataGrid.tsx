import React from "react";
import { DataGrid, GridOverlay } from "@mui/x-data-grid";
import { makeStyles } from "@mui/styles";
import CustomToolBar from "./customToolbar";
import { Box, Typography, GlobalStyles } from "@mui/material";
import DataGridProps from "../interfaces/dataGridProps";
import SkeletonLoader from "./skeletonLoader";

const useStyles = makeStyles({
  virtualScrollerContent: {
    paddingTop: "20px",
  },
});

const PandaDataGrid: React.FC<DataGridProps> = ({
  rows,
  columns,
  components,
  style,
  pageSizeOptions,
  paginationModel,
  rowCount,
  onPaginationModelChange,
  onSearchQueryChange,
  searchQuery,
  paginationMode,
  loading,
  ...props
}) => {
  const classes = useStyles();

  const getRowClassName = (params: any) => {
    return params.index % 2 === 0 ? "even-row" : "odd-row";
  };
  function CustomNoRowsOverlay() {
    return (
      <GridOverlay>
        {rows.length === 0 && searchQuery ? (
          <Box sx={{ mt: 1 }}>No match found</Box>
        ) : (
          <Box sx={{ mt: 1 }}>No rows</Box>
        )}
      </GridOverlay>
    );
  }

  return (
    <div style={{ width: "100%", overflow: "auto",maxHeight:"55vh" ,border:"1px solid #B7BAFF", borderRadius:"6px"}}>
      <Box style={{ position: "relative" }}>
        <GlobalStyles
          styles={{
            "::-webkit-scrollbar": {
              width: "8px",
              height: "8px",
            },
            "::-webkit-scrollbar-thumb": {
              backgroundColor: "#DDDDF6",
              borderRadius: "10px",
            },
            "::-webkit-scrollbar-track": {
              backgroundColor: "#f1f1f1",
            },
          }}
        />

        <DataGrid
          rows={rows}
          columns={columns}
          components={{
            Toolbar: (props) => (
              <CustomToolBar
                {...props}
                searchQuery={searchQuery}
                onSearchQueryChange={onSearchQueryChange}
              />
            ),
            NoRowsOverlay: CustomNoRowsOverlay,
            ...components,
          }}
          paginationModel={paginationModel}
          rowCount={rowCount}
          paginationMode={paginationMode || "server"}
          onPaginationModelChange={onPaginationModelChange}
          pageSizeOptions={pageSizeOptions || [5, 10, 20, 30]}
          style={style}
          loading={false}
          getRowClassName={getRowClassName}
          classes={{ virtualScrollerContent: classes.virtualScrollerContent }}
          disableRowSelectionOnClick
          {...props}
        />
        {loading && (
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(255, 255, 255, 0.8)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 1,
              transform: "translateY(50px)",
            }}
          >
            <SkeletonLoader />
          </Box>
        )}
      </Box>
    </div>
  );
};

export default PandaDataGrid;
