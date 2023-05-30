import { Stack } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import styles from "./Login.module.css";
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import FormHelperText from "@mui/material/FormHelperText";
import Grid from "@mui/material/Grid";
import { useTheme } from "@mui/material/styles";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

/* Author : Saifali Prasla */

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const theme = useTheme();
  const [formError, setFormError] = useState({});
  let errorFlag = 0;
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formValue = {
      email: email,
      password: password,
    };
    setFormError(validateForm(formValue));
    if (errorFlag === 0) {
      localStorage.setItem("email", email);
      try {
        console.log("Inside login page");
        console.log(formValue);
        const response = await axios.post(
          "https://cook-with-dal-final.onrender.com/api/users/authenticateUser",
          {
            ...formValue,
          }
        );
        alert(response.data.message);
        console.log(response.data);
        navigate("/feed");
      } catch (error) {
        if (error.response.status === 404) {
          alert(error.response.data.message);
        } else if (error.response.status === 401) {
          alert(error.response.data.message);
        } else {
          console.log(error);
        }
        setEmail("");
        setPassword("");
      }
    } else {
      console.log(formError);
    }
  };

  const validateForm = (data) => {
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/; //Reference : https://regexr.com/3e48o
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/; //Reference: https://stackoverflow.com/questions/19605150/regex-for-password-must-contain-at-least-eight-characters-at-least-one-number-a
    const errorMessage = {};
    if (data.email === "" || emailRegex.test(data.email) === false) {
      errorFlag = 1;
      errorMessage.email = "Email is not valid";
    } else if (passwordRegex.test(data.password) == false) {
      errorFlag = 1;
      errorMessage.password =
        "Password must be more than 8 characters, must have at least one uppercase letter, one lowercase letter, one number and one special character";
    } else {
      errorFlag = 0;
    }
    return errorMessage;
  };

  return (
    <div style={{ textAlign: "left" }}>
      <Grid container>
        <Grid
          item
          md={3.5}
          xs={12}
          sm={6}
          sx={{
            display: "flex",
            [theme.breakpoints.down("sm")]: {
              display: "block",
            },
            [theme.breakpoints.down("xs")]: {
              display: "none",
            },

            backgroundColor: "#EBF4F7",
          }}
        >
          <Stack
            style={{
              height: "100vh",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              alignItems: "center",
              maxWidth: "100%",
            }}
          >
            <header className={styles["header-section"]}>
              <div>Cook With Dal</div>

              <h1
                className={styles["heading-text"]}
                style={{
                  paddingRight: "120px",
                  marginTop: "50px",
                }}
              >
                Share your recipes with the world.
              </h1>
            </header>

            <img
              src="recipe-sharing-login.jpg"
              draggable="false;"
              width="100%"
              alt="recipe-sharing"
              style={{
                marginBottom: "126px",
                touchAction: "none",
                "pointer-events": "none",
                width: "100%",
                maxWidth: "100%",
                height: "auto",
                maxHeight: "37vh",

                objectFit: "contain",
              }}
              sx={{
                width: "100%",
                maxWidth: "100%",
                height: "auto",
                objectFit: "contain",
              }}
            />
          </Stack>
        </Grid>
        <Grid
          item
          sm={5}
          md={8.5}
          xs={12}
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              alignSelf: "flex-end",
              marginTop: "2rem",
              marginRight: "3rem",
            }}
          >
            <p style={{ fontSize: "14px" }}>
              Not a member?
              <Link to="/signup" style={{ textDecoration: "none" }}>
                {" "}
                Signup
              </Link>
            </p>
          </div>
          <Container
            style={{
              marginTop: "12rem",
            }}
          >
            <Card
              variant="outlined"
              style={{
                border: "none",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <h2 style={{ display: "inline", textAlign: "left" }}>
                  Sign In to Cook With Dal
                </h2>

                <Box
                  sx={{
                    marginTop: "1rem",
                    width: "515px",
                    maxWidth: "100%",
                    "@media (max-width: 600px)": {
                      height: "60vh",
                    },
                  }}
                >
                  <form onSubmit={handleSubmit}>
                    <TextField
                      label="Email Address"
                      name="email"
                      type="email"
                      onChange={(e) => setEmail(e.target.value)}
                      onSubmit={handleSubmit}
                      value={email}
                      error={formError.email}
                      required
                      fullWidth
                      sx={{ marginTop: "1rem" }}
                    />
                    <FormHelperText>{formError.email}</FormHelperText>
                    <TextField
                      label="Password"
                      name="password"
                      placeholder="8+ characters"
                      type={"password"}
                      onChange={(e) => setPassword(e.target.value)}
                      onSubmit={handleSubmit}
                      value={password}
                      error={formError.password}
                      required
                      fullWidth
                      sx={{ marginTop: "1rem" }}
                    />
                    <FormHelperText>{formError.password}</FormHelperText>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        marginTop: "1rem",
                      }}
                    >
                      <p style={{ fontSize: "14px" }}>
                        <Link
                          to="/forgotpassword"
                          style={{ textDecoration: "none" }}
                        >
                          Forget Password
                        </Link>
                      </p>
                    </div>
                    <Button
                      sx={{
                        marginTop: "1.2rem",
                        outline: "none",
                        border: "none",
                        borderRadius: "2rem",
                        fontSize: "1.1rem",
                        cursor: "pointer",
                        fontWeight: "600",
                      }}
                      variant="contained"
                      fullWidth
                      type={"submit"}
                    >
                      Sign In
                    </Button>
                  </form>
                </Box>
              </Box>
            </Card>
          </Container>
        </Grid>
      </Grid>
    </div>
  );
}
