import React, { ChangeEvent, useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Button, Container, Paper, styled, TextField } from "@mui/material";
import { Stack } from "@mui/material";
import { api } from '../api';
import axios from "axios";
import { ERROR_MESSAGES, TEXT_MESSAGES } from "../const";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import logo from "../assets/Frame.png";
import frame from "../assets/Group 33048.svg";
import SnackBar from "../components/snackbar";

const Item = styled("div")({
  marginBottom: "15px",
  padding: "8px",
  textAlign: "center",
});
const Login: React.FC = () => {
  const [email, setemail] = useState(localStorage.getItem("email") || "");
  const [password, setpassword] = useState(
    localStorage.getItem("password") || ""
  );
  const [errorMessage, setErrorMessage] = useState("");
  const [pasErrorMessage, setPasErrorMessage] = useState("");
  const [succMessage, setSuccMessage] = useState("");
  const [loggedInUser, setLoggedInUser] = useState<string>("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoginButtonDisabled, setIsLoginButtonDisabled] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "error"
  );

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleemailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setemail(e.target.value);
  };
  const handlepasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setpassword(e.target.value);
  };
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };
  const handleEmailFocus = () => {
    setErrorMessage("");
  };
  useEffect(() => {
    localStorage.removeItem("email");
    const emailValid = isValidEmail(email);
    const passwordValid = isValidPassword(password);
    if (!emailValid || !password) {
      setIsLoginButtonDisabled(false);
    } else {
      setIsLoginButtonDisabled(true);
    }
  }, [email, password]);
  const isValidPassword = (password: string): boolean => {
    const minLength = 8;
    return password.length >= minLength;
  };
  const handleChange = () => {
    const updatedRememberMe = !rememberMe;
    setRememberMe(updatedRememberMe);
    if (updatedRememberMe) {
      localStorage.setItem("email", email);
      localStorage.setItem("password", password);
    } else {
      localStorage.setItem("email", "");
      localStorage.setItem("password", "");
    }
  };
  const handleEmailBlur = () => {
    const emailRegex = TEXT_MESSAGES.EMAIL_REG;
    if (!emailRegex.test(email)) {
      setErrorMessage(ERROR_MESSAGES.VALID_EMAIL);
    } else {
      setErrorMessage("");
    }
  };
  const handlePasswordBlur = () => {
    const minLength = 8;
    const passlength = password.length >= minLength;
    if (password.length === 0) {
      setPasErrorMessage(ERROR_MESSAGES.VALID_PASSWORD);
    } else if (!passlength) {
      setPasErrorMessage(ERROR_MESSAGES.PWD_LENGTH);
    } else {
      setPasErrorMessage("");
    }
  };
  const handlePasswordFocus = () => {
    setPasErrorMessage("");
  };
  function isValidEmail(email: string) {
    const emailRegex = TEXT_MESSAGES.EMAIL_REG;
    return emailRegex.test(email);
  }

  const handleLogin = async () => {
    const payload = {
      email: email,
      password: password,
    };
  
    try {
      const response = await axios.post(`${api.baseUrl}/api/users/login`, payload, { withCredentials: true });
      console.log("response", response);
  
      
      const { success, message } = response.data;
  
      if (success) {
        setSnackbarSeverity('success');
        setSuccMessage("Login successful");
        setModalOpen(true);
        setTimeout(() => {
          setemail('');
          setpassword('');
          navigate('/home')
        }, 3000);
       
      } else {
        const error = message.toLowerCase();
        if (error.includes('email')) {
          setErrorMessage(message);
        } else if (error.includes('password')) {
          setPasErrorMessage(message);
        } else {
          setSnackbarSeverity('error');
          setSuccMessage(message);
          setModalOpen(true);
          setTimeout(() => {
            setModalOpen(false);
          }, 3000);
        }
      }
    } catch (error) {
      console.error("An error occurred during login:", error);
      setSnackbarSeverity('error');
      setSuccMessage("An unexpected error occurred");
      setModalOpen(true);
      setTimeout(() => {
        setModalOpen(false);
      }, 3000);
    }
  };
  
  const handleKeyPress = (event: any) => {
    if (event.key === "Enter") {
      handleLogin();
    }
  };

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
  return (
    <div
      style={{
        backgroundColor: "#392381",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <Box
        sx={{
          flex: 1,
          marginRight: "10px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <img src={logo} height={310} width={400} />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "flex-start",
            padding: "10px 0px 0px 70px",
            marginTop: "80px",
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
              <img src={frame} />
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

          <Typography
            sx={{
              fontWeight: "700",
              fontFamily: "Lexend",
              color: "#FFFFFF",
              fontSize: "36px",
              justifyContent: "left",
              alignItems: "left",
              textAlign: "left",
            }}
          >
            LogIn to Discover
            <br /> Our Best Products!
          </Typography>
          <Typography
            sx={{
              fontWeight: "400",
              fontFamily: "Lexend",
              color: "#FFFFFF",
              fontSize: "20px",
              justifyContent: "left",
              alignItems: "left",
              textAlign: "left",
            }}
          >
            Unlock exclusive access to our top-rated and <br /> best-selling
            products. Log in now to explore <br /> what’s trending and find your
            perfect match!
          </Typography>
        </Box>
      </Box>

      <Box sx={{ flex: 1, padding: "10px" }}>
        <Paper
          elevation={1}
          style={{
            padding: "10px",
            height: "500px",
            marginLeft: "10px",
            width: "400px",
            borderRadius: "16px",
            backgroundColor: "#513D90",
            marginTop: "100px",
          }}
        >
          <Stack spacing={2} direction="column">
            <Box component="form" onKeyPress={handleKeyPress}>
              <Item>
                <Typography
                  variant="h6"
                  style={{
                    fontFamily: "Lexend",
                    color: "#FFFFFF",
                    fontSize: "36px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                  }}
                >
                  Log In to Panda
                  <span
                    style={{
                      fontSize: "30px",
                      textAlign: "right",
                      marginTop: "-25px",
                    }}
                  >
                    s
                  </span>
                </Typography>
              </Item>
              <Item>
                <Typography
                  sx={{
                    display: "flex",
                    alignItems: "flex-start",
                    padding: "16px 0px 10px 20px",
                    color: "#FFFFFF",
                    fontFamily: "Lexend",
                    fontWeight: "300",
                    fontSize: "16px",
                  }}
                >
                  Username
                </Typography>
                <TextField
                  id="outlined-error"
                  type="email"
                  value={email}
                  variant="outlined"
                  onChange={handleemailChange}
                  onFocus={handleEmailFocus}
                  onBlur={handleEmailBlur}
                  error={Boolean(errorMessage)}
                  helperText={errorMessage || ""}
                  sx={{
                    width: "350px",
                    backgroundColor: "transparent",

                    "& .MuiOutlinedInput-root": {
                      color: "#FFFFFF",
                      "& fieldset": {
                        borderColor: "#FFFFFF",
                      },
                      "&:hover fieldset": {
                        borderColor: "#FFFFFF",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#FFFFFF",
                      },
                    },
                    "& .MuiFormHelperText-root": {
                      color: "#FFFFFF",
                    },
                  }}
                />
              </Item>
              <Item>
                <Typography
                  sx={{
                    display: "flex",
                    alignItems: "flex-start",
                    padding: "16px 0px 10px 20px",
                    color: "#FFFFFF",
                    fontFamily: "Lexend",
                    fontWeight: "300",
                    fontSize: "16px",
                  }}
                >
                  Password
                </Typography>
                <TextField
                  id="outlined-error"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  variant="outlined"
                  onChange={handlepasswordChange}
                  onFocus={handlePasswordFocus}
                  onBlur={handlePasswordBlur}
                  error={Boolean(pasErrorMessage)}
                  helperText={pasErrorMessage || ""}
                  sx={{
                    width: "350px",
                    backgroundColor: "transparent",

                    "& .MuiOutlinedInput-root": {
                      color: "#FFFFFF",
                      "& fieldset": {
                        borderColor: "#FFFFFF",
                      },
                      "&:hover fieldset": {
                        borderColor: "#FFFFFF",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#FFFFFF",
                      },
                    },
                    "& .MuiFormHelperText-root": {
                      color: "#FFFFFF",
                    },
                  }}
                  disabled={Boolean(errorMessage)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                          sx={{ color: "#FFFFFF" }}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Item>
              <Item>
                <Button
                  onClick={handleLogin}
                  disabled={!isLoginButtonDisabled}
                  sx={{
                    marginTop: "30px",
                    backgroundColor: "#30BBC4",
                    width: "350px",
                    height: "55px",
                    color: "#FFFFFF"

                  }}
                >
                  Login
                </Button>
              </Item>
            </Box>
          </Stack>
        </Paper>
        <SnackBar
          open={modalOpen}
          onClose={handleClose}
          message={succMessage}
          severity={snackbarSeverity}
          vertical="top"
          horizontal="center"
          customAction={customCloseIcon}
        />

      </Box>
    </div>
  );
};
export default Login;
