import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Chip,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { TEXT_MESSAGES } from "../const";
import Header from "../components/header";
import Footer from "../components/footer";
import PandaDataGrid from "../components/dataGrid";
import { api } from "../api";
import axios from "axios";
import AddReviewModal from "../components/addReview";
import SnackBar from "../components/snackbar";
import CloseIcon from "@mui/icons-material/Close";
import StarBorderTwoToneIcon from "@mui/icons-material/StarBorderTwoTone";
import AddIcon from "@mui/icons-material/Add";

const Home: React.FC = () => {
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 5,
    page: 0,
  });
  const [totalPages, setTotalPages] = useState(0);
  const [customerList, setCustomerList] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [exitModalOpen, setexitModalOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "error"
  );
  const [succMessage, setSuccMessage] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const handleClose = () => {
    setModalOpen(false);
  };

  const customCloseIcon = (
    <IconButton
      size="small"
      aria-label="close"
      color="inherit"
      onClick={handleClose}
      style={{ justifyContent: "end", width: "200px" }}
    >
      <CloseIcon fontSize="small" />
    </IconButton>
  );

  const fetchSellerData = async () => {
    try {
      console.log("Fetching seller data...");

      const params = {
        page: paginationModel.page,
        perPage: paginationModel.pageSize,
        searchQuery: searchQuery,
      };

      const response = await axios.get(
        `${api.baseUrl}/api/sellers/getAllSeller`,
        { params }
      );
      console.log("Success", response);

      if (response.data) {
        const sellersWithId = response.data.sellers.map((seller: any) => ({
          ...seller,
          id: seller._id,
        }));
        setCustomerList(sellersWithId);
        setTotalPages(response.data.totalPages);
      }
    } catch (error) {
      console.error("Error fetching seller data", error);
    }
  };

  const handleExitConfirm = async (reviewData: {
    name: string;
    rating: number;
    review: string;
  }) => {
    try {
      const response = await axios.post(
        `${api.baseUrl}/api/sellers/seller`,
        reviewData
      );
      if (response.data.success) {
        console.log("Review added successfully!");
        fetchSellerData();
        setSnackbarSeverity("success");
        setSuccMessage("Review added successfully!");
        setexitModalOpen(false);
      } else {
        console.error("Failed to add review:", response.data.message);
        setSnackbarSeverity("error");
        setSuccMessage(response.data.message || "Failed to add review.");
      }
    } catch (error) {
      console.error("Error adding review:", error);
      setSnackbarSeverity("error");
      setSuccMessage("An unexpected error occurred while adding the review.");
    }
  };

  useEffect(() => {
    fetchSellerData();
  }, [paginationModel, searchQuery]);

  const columns = [
    { field: "name", headerName: "Name", width: 400 },
    {
      field: "rating",
      headerName: "Rating (out of 5)",
      width: 400,
      renderCell: (params: { value: number }) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <Chip
            variant="outlined"
            label={
              <div style={{ display: "flex", alignItems: "center" }}>
                {Array.from({ length: 5 }).map((_, index) => (
                  <StarBorderTwoToneIcon
                    key={index}
                    style={{
                      color: index < params.value ? "#FFD700" : "gray",
                      marginRight: 2,
                    }}
                  />
                ))}
              </div>
            }
            style={{
              borderColor: "transparent",
              padding: 2,
              backgroundColor: "#392381",
            }}
          />
        </div>
      ),
    },
    { field: "review", headerName: "Review Comments", width: 500 },
  ];

  const handlePaginationChange = (newModel: any) => {
    setPaginationModel((prevModel) => ({
      ...prevModel,
      ...newModel,
    }));
  };

  const handleSearchQueryChange = (newQuery: string) => {
    setSearchQuery(newQuery);
  };

  const handleAddReviewClick = () => {
    setexitModalOpen(true);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        minHeight: "100vh",
      }}
    >
      <Header sections={{ aboutRef: undefined }} />

      <Box
        sx={{
          flex: 1,
          marginTop: "80px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            paddingRight: "30px",
          }}
        >
          <Button
            onClick={handleAddReviewClick}
            sx={{
              backgroundColor: "#30BBC4",
              color: "#FFFFFF",
              width: "150px",
              height: "40px",
            }}
          >
            <span>
              <AddIcon sx={{ marginTop: "5px", fontSize: "16px" }} />{" "}
            </span>
            Add Review
          </Button>
        </Box>
        <Box sx={{ padding: "30px", flex: 1 }}>
          <PandaDataGrid
            rows={customerList || []}
            columns={columns}
            pageSizeOptions={[5, 10, 20, 30]}
            rowCount={totalPages || 0}
            style={{ border: "0px", marginLeft: "20px" }}
            paginationMode="server"
            paginationModel={paginationModel}
            onPaginationModelChange={handlePaginationChange}
            onSearchQueryChange={handleSearchQueryChange}
            searchQuery={searchQuery}
          />
        </Box>
      </Box>
      <Footer sections={{ aboutRef: undefined }} />
      <>
        <AddReviewModal
          open={exitModalOpen}
          onClose={() => setexitModalOpen(false)}
          onConfirm={(reviewData: {
            name: string;
            rating: number;
            review: string;
          }) => handleExitConfirm(reviewData)}
        />
        <SnackBar
          open={modalOpen}
          onClose={handleClose}
          message={succMessage}
          severity={snackbarSeverity}
          vertical="top"
          horizontal="center"
          customAction={customCloseIcon}
        />
      </>
    </div>
  );
};

export default Home;
