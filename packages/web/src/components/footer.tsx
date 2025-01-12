import React, { useState } from "react";
import {
  Typography,
  useMediaQuery,
  useTheme,
  Divider,
  Box,
  IconButton,
} from "@mui/material";
import "../App.css";
import logo from "../assets/Group 33048.svg";
import { RiTwitterXLine } from "react-icons/ri";
import { BiLogoFacebook } from "react-icons/bi";
import { FaInstagram } from "react-icons/fa";
import { LiaLinkedin } from "react-icons/lia";
import { NavbarProps } from "../interfaces/navbarProps";

const Footer: React.FC<NavbarProps> = ({ sections }) => {
  return (
    <>
      <Box
        sx={{
          backgroundColor: "#392381",
          marginTop: "40px",
          padding: "10px 0px 0px 0px",
          justifyContent: "center",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "10px",
          }}
        >
          <Typography
            sx={{
              fontFamily: "Lexend",
              color: "#FFFFFF",
              fontSize: "36px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <span>
              <img
                src={logo}
                style={{
                  height: "70px",
                  padding: "10px",
                  gap: "8px",
                }}
              />
            </span>
            <span
              style={{ flex: 1, textAlign: "center", marginBottom: "10px" }}
            >
              Panda
            </span>
            <span
              style={{
                fontSize: "24px",
                textAlign: "right",
                marginBottom: "30px",
              }}
            >
              s
            </span>
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: "40px",
            padding: "0px 40px",
            marginBottom: "0px",
            justifyContent: "center",
          }}
        >
          <Typography
            variant="body1"
            sx={{
              fontSize: "18px",
              fontWeight: 500,
              fontFamily: "Lexend",
              color: "#FFFFFF",
              cursor: "pointer",
            }}
          >
            Home
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontSize: "18px",
              fontWeight: 500,
              fontFamily: "Lexend",
              color: "#FFFFFF",
              cursor: "pointer",
            }}
          >
            About
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontSize: "18px",
              fontWeight: 500,
              fontFamily: "Lexend",
              color: "#FFFFFF",
              cursor: "pointer",
            }}
          >
            Contact us
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: "30px",
          }}
        >
          <IconButton
            sx={{
              borderRadius: "50%",
              width: "40px",
              height: "40px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "1px solid #FFFFFF",
              transition: "background-color 0.3s ease",
              "&:hover": {
                backgroundColor: "#3b5998",
              },
            }}
          >
            <BiLogoFacebook style={{ color: "#FFFFFF", fontSize: "20px" }} />
          </IconButton>
          <IconButton
            sx={{
              borderRadius: "50%",
              width: "40px",
              height: "40px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "1px solid #FFFFFF",
              transition: "background-color 0.3s ease",
              "&:hover": {
                backgroundColor: "#E1306C",
              },
            }}
          >
            <FaInstagram style={{ color: "#FFFFFF", fontSize: "20px" }} />
          </IconButton>
          <IconButton
            sx={{
              borderRadius: "50%",
              width: "40px",
              height: "40px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "1px solid #FFFFFF",
              transition: "background-color 0.3s ease",
              "&:hover": {
                backgroundColor: "#000000",
              },
            }}
          >
            <RiTwitterXLine style={{ color: "#FFFFFF", fontSize: "20px" }} />
          </IconButton>
          <IconButton
            sx={{
              borderRadius: "50%",
              width: "40px",
              height: "40px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "1px solid #FFFFFF",
              transition: "background-color 0.3s ease, color 0.3s ease",
              cursor: "pointer",
              backgroundColor: "transparent",
              "&:hover": {
                backgroundColor: "#0077B5",
              },
            }}
          >
            <LiaLinkedin
              style={{
                color: "#FFFFFF",
                fontSize: "22px",
              }}
            />
          </IconButton>
        </Box>
      </Box>

      <Box
        sx={{
          backgroundColor: "#392381",
          justifyContent: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Divider
          sx={{
            backgroundColor: "#FFFFFF",
            width: "100%",
            height: "0.25px",
            marginBottom: "10px",
          }}
        />

        <Typography
          variant="body1"
          sx={{
            fontSize: "16px",
            fontWeight: 400,
            fontFamily: "Lexend",
            color: "#FFFFFF",
            marginBottom: "10px",
            textAlign: "center",
          }}
        >
          © 2025 Kani & co . All Rights Reserved.
        </Typography>
      </Box>
    </>
  );
};

export default Footer;
