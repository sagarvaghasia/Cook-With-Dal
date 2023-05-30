import { Stack } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import FormHelperText from "@mui/material/FormHelperText";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./ForgetPassword.module.css";

/* Author : Saifali Prasla */

export default function ForgetPassword() {
  const [email, setEmail] = useState("");
  const theme = useTheme();
  const [formError, setFormError] = useState({});
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isExtraSmallScreen = useMediaQuery(theme.breakpoints.down("xs"));
  const navigate = useNavigate();
  let errorFlag = 0;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formValue = {
      email: email,
    };
    setFormError(validateForm(formValue));
    if (errorFlag === 0) {
      localStorage.setItem("email", email);
      try {
        const response = await axios.post(
          "https://cook-with-dal-final.onrender.com/api/users/verifyEmail",
          {
            ...formValue,
          }
        );
        alert(response.data.message);
        console.log(response.data);
        const question = response.data.question;

        navigate("/security-question", {
          state: { email: email, question: question },
        });
      } catch (error) {
        if (error.response.status === 404) {
          alert(error.response.data.message);
        } else {
          console.log(error);
        }
        setEmail("");
      }
    } else {
      console.log(formError);
    }
  };

  const validateForm = (data) => {
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/; //Reference : https://regexr.com/3e48o

    const errorMessage = {};
    if (data.email === "" || emailRegex.test(data.email) === false) {
      errorFlag = 1;
      errorMessage.email = "Email is not valid";
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
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: "#EBF4F7",
            height: "100vh",
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
              }}
              sx={{
                marginBottom: "150px",
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
          sm={6}
          md={8.5}
          xs={12}
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              marginTop: "2rem",
              "@media (max-width: 600px)": {
                marginTop: "4rem",
              },
            }}
            style={{
              alignSelf: "flex-start",
              marginLeft: "3rem",
            }}
          >
            <img
              src="back-button.webp"
              draggable="false;"
              width="100%"
              height="15%"
              alt="back-button"
              onClick={() => navigate("/")}
            />
          </Box>
          <Container
            sx={{
              marginTop: "6rem",
              "@media (max-width: 450px)": {
                marginTop: "0rem",
              },
            }}
          >
            <Card
              variant="outlined"
              style={{
                border: "none",
              }}
            >
              <Box
                md={8.5}
                sm={12}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  maxWidth: "515px",
                  margin: "0 auto",
                  "@media (max-width: 600px)": {
                    maxWidth: "100%",
                    padding: "0 1rem",
                    height: "50vh",
                  },
                }}
              >
                <h2 style={{ display: "inline", textAlign: "left" }}>
                  Forgot Password?
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

                    <Button
                      sx={{
                        marginTop: "2rem",
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
                      Next
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
