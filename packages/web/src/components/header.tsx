import React, { useState, MouseEvent } from "react";
import {
  AppBar,
  Toolbar,
  Button,
  useMediaQuery,
  useTheme,
  Box,
  CssBaseline,
  Typography,
} from "@mui/material";
import { NavbarProps } from "../interfaces/navbarProps";
import logo from "../assets/Group 33048.svg";
import { useNavigate } from "react-router-dom";

const Header: React.FC<NavbarProps> = ({ sections }) => {
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState<number | null>(null);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });
  const [shouldShowIndicator, setShouldShowIndicator] = useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [hoveredTab, setHoveredTab] = useState<number | null>(null);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const handleMenuOpen = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleContactModalOpen = () => {
    handleMenuClose();
    setContactModalOpen(true);
  };

  const handleContactModalClose = () => {
    setContactModalOpen(false);
  };
  const handleContactConfirm = () => {};

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const tabs = [
    { label: "Home", ref: sections.aboutRef },
    { label: "About", ref: sections.aboutRef },
    { label: "Contact Us", ref: sections.aboutRef },
  ];
  const navigate = useNavigate(); 
  const handleLogout = () => {
    navigate("/");
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          background:"#392381",
          justifyContent: "space-between",
          height:  "70px",
          zIndex: 1200,
        }}
      >
        <Toolbar>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexGrow: 1,
              justifyContent: "space-between",
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
              marginTop: "10px"
            }}
          >
            <span>
              <img  src={logo}
               style={{
                height:  "70px",
                padding:  "10px",
                gap: "8px",
              }} />
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
            {!isMobile && (
              <Box
                className="navbar-tabs-container"
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  flexGrow: 1,
                  position: "relative",
                  marginRight: "16px",
                }}
              >
                {tabs.map((tab, index) => (
                  <Box
                    key={index}
                    onMouseEnter={() => setHoveredTab(index)}
                    onMouseLeave={() => setHoveredTab(null)}
                    sx={{
                      position: "relative",
                      padding: "0 8px",
                      height: "100%",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Button
                      key={index}
                      className="navbar-tab-button"
                      sx={{
                        backgroundColor: "transparent",
                        marginRight: "16px",
                        textTransform: "none",
                        fontFamily: "Inter",
                        fontSize: isTablet ? "14px" : "16px",
                        color: "white",
                        padding: "8px 16px",
                        fontWeight: 600,
                        whiteSpace: "nowrap",
                        "&:hover": {
                          backgroundColor: "transparent",
                        },
                      }}
                    >
                      {tab.label}
                    </Button>
                    <Box
                      sx={{
                        position: "absolute",
                        bottom: "-4px",
                        left: "7px",
                        right: "24px",
                        height: "4px",
                        backgroundColor: "#30BBC4",
                        borderRadius: "2px",
                        transform:
                          hoveredTab === index ? "scaleX(1)" : "scaleX(0)",
                        transformOrigin: "left",
                        transition: "transform 0.3s ease-out",
                        opacity: activeTab === index ? 0 : 1,
                      }}
                    />
                  </Box>
                ))}
                <Box
                  sx={{
                    position: "absolute",
                    bottom: "-4px",
                    height: "4px",
                    backgroundColor: "#30BBC4",
                    borderRadius: "1px",
                    transition: "all 0.3s ease",
                    visibility: shouldShowIndicator ? "visible" : "hidden",
                  }}
                  style={{
                    left: `${indicatorStyle.left}px`,
                    width: `${indicatorStyle.width}px`,
                  }}
                />
              </Box>
            )}
            <Button
              onClick={handleLogout}
              sx={{
                backgroundColor: "#30BBC4",
                color: "#FFFFFF",
                marginLeft: "16px",
                textTransform: "none",
                fontFamily: "Lexend",
                fontSize: "16px",
                fontWeight: 600,
                width:"150px",
                "&:hover": {
                  backgroundColor: "#259CA5",
                },
              }}
            >
              Logout
            </Button>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
