import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  TextField,
  Box,
  IconButton,
} from "@mui/material";
import { api } from "../api";
import axios from "axios";
import SnackBar from "./snackbar";
import CloseIcon from "@mui/icons-material/Close";

interface AddReviewModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (reviewData: {
    name: string;
    rating: number;
    review: string;
  }) => void;
}

const AddReviewModal: React.FC<AddReviewModalProps> = ({
  open,
  onClose,
  onConfirm,
}) => {
  const [name, setName] = useState<string>("");
  const [rating, setRating] = useState<number | "">("");
  const [review, setReview] = useState<string>("");
  const [modalOpen, setModalOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "error"
  );
  const [succMessage, setSuccMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [pasErrorMessage, setPasErrorMessage] = useState("");
  const handleClose = async () => {};
  const handleCreateReview = async () => {
    const payload = {
      name: name,
      rating: rating,
      review: review,
    };

    try {
      const response = await axios.post(
        `${api.baseUrl}/api/sellers/seller`,
        payload,
        { withCredentials: true }
      );
      console.log("response", response);

      const { success, message } = response.data;

      if (success) {
        setSnackbarSeverity("success");
        setSuccMessage("Review added ");
        setModalOpen(true);
        setTimeout(() => {
          setName("");
          setRating("");
          setReview("");
        }, 3000);
      } else {
        const error = message.toLowerCase();
        if (error.includes("email")) {
          setErrorMessage(message);
        } else if (error.includes("password")) {
          setPasErrorMessage(message);
        } else {
          setSnackbarSeverity("error");
          setSuccMessage(message);
          setModalOpen(true);
          setTimeout(() => {
            setModalOpen(false);
          }, 3000);
        }
      }
    } catch (error) {
      console.error("An error occurred during login:", error);
      setSnackbarSeverity("error");
      setSuccMessage("An unexpected error occurred");
      setModalOpen(true);
      setTimeout(() => {
        setModalOpen(false);
      }, 3000);
    }
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

  return (
    <Dialog
      open={open}
      onClose={onClose}
      sx={{
        "& .MuiDialog-paper": {
          backgroundColor: "#fff",
          color: "rgba(0, 0, 0, 0.87)",
          boxShadow:
            "0px 11px 15px -7px rgba(0,0,0,0.2), 0px 24px 38px 3px rgba(0,0,0,0.14), 0px 9px 46px 8px rgba(0,0,0,0.12)",
          maxWidth: "600px",
          minWidth: "400px",
          width: "90%",
          maxHeight: "90vh",
          padding: "16px",
        },
      }}
    >
      <DialogTitle
        sx={{
          textAlign: "center",
          fontWeight: 700,
          fontSize: "36px",
          marginBottom: "8px",
          fontFamily: "Lexend",
        }}
      >
        Add Your Best Review
      </DialogTitle>
      <DialogContent
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}
      >
        <Box>
          <Typography
            sx={{
              display: "flex",
              alignItems: "flex-start",
              padding: "16px 0px 10px 0px",
              color: "#000000",
              fontFamily: "Lexend",
              fontWeight: "500",
              fontSize: "14px",
            }}
          >
            Your Name
          </Typography>
          <TextField
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            variant="outlined"
          />
        </Box>
        <Box>
          <Typography
            sx={{
              display: "flex",
              alignItems: "flex-start",
              padding: "16px 0px 10px 0px",
              color: "#000000",
              fontFamily: "Lexend",
              fontWeight: "500",
              fontSize: "14px",
            }}
          >
            Enter your rating (1 to 5)
          </Typography>
          <TextField
            type="number"
            value={rating}
            onChange={(e) => {
              const value = Number(e.target.value);
              if (value >= 1 && value <= 5) {
                setRating(value);
              } else if (e.target.value === "") {
                setRating("");
              }
            }}
            fullWidth
            variant="outlined"
            inputProps={{ min: 1, max: 5 }}
          />
        </Box>
        <Box>
          <Typography
            sx={{
              display: "flex",
              alignItems: "flex-start",
              padding: "16px 0px 10px 0px",
              color: "#000000",
              fontFamily: "Lexend",
              fontWeight: "500",
              fontSize: "14px",
            }}
          >
            Review Comments
          </Typography>
          <TextField
            value={review}
            onChange={(e) => setReview(e.target.value)}
            fullWidth
            variant="outlined"
            multiline
            rows={4}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={onClose}
          variant="outlined"
          sx={{ color: "#30BBC4", border: "1px solid #30BBC4 " }}
        >
          Cancel
        </Button>
        <Button
          sx={{ backgroundColor: "#30BBC4", color: "#FFFFFF" }}
          onClick={() => {
            if (!name || !review || rating === "" || rating < 1 || rating > 5) {
              console.error(
                "Invalid input. All fields must be filled and rating must be between 1 and 5."
              );
              return;
            }
            const reviewData = { name, rating: rating as number, review };
            onConfirm(reviewData);
            setName("");
            setRating("");
            setReview("");
          }}
          variant="contained"
        >
          Submit
        </Button>
      </DialogActions>
      <SnackBar
        open={modalOpen}
        onClose={handleClose}
        message={succMessage}
        severity={snackbarSeverity}
        vertical="top"
        horizontal="center"
        customAction={customCloseIcon}
      />
    </Dialog>
  );
};

export default AddReviewModal;
