import { Stack } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import FormHelperText from "@mui/material/FormHelperText";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { useTheme } from "@mui/material/styles";
import axios from "axios";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./NewPassword.module.css";

/* Author : Saifali Prasla */
export default function NewPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const theme = useTheme();
  const [formError, setFormError] = useState({});
  const { state } = useLocation();
  const { email } = state ?? {};
  const navigate = useNavigate();
  let errorFlag = 0;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email === undefined || email === "") {
      alert("Please register or login");
      window.location.href = "/";
    } else {
      const formValue = {
        email: email,
        newPassword: newPassword,
        confirmNewPassword: confirmNewPassword,
      };
      setFormError(validateForm(formValue));
      if (errorFlag === 0) {
        try {
          const response = await axios.put(
            "https://cook-with-dal-final.onrender.com/api/users/updatePassword",
            {
              ...formValue,
            }
          );
          alert(response.data.message);
          console.log(response.data);
          navigate("/");
        } catch (error) {
          if (error.response.status === 404) {
            alert(error.response.data.message);
          } else if (error.response.status === 401) {
            alert(error.response.data.message);
          } else {
            console.log(error);
          }
          setNewPassword("");
          setConfirmNewPassword("");
        }
      } else {
        console.log(formError);
      }
    }
  };
  const validateForm = (data) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/; //Reference: https://stackoverflow.com/questions/19605150/regex-for-password-must-contain-at-least-eight-characters-at-least-one-number-a
    const errorMessage = {};

    if (passwordRegex.test(data.newPassword) == false) {
      errorFlag = 1;
      errorMessage.newPassword =
        "Password must be more than 8 characters, must have at least one uppercase letter, one lowercase letter, one number and one special character";
    } else if (data.newPassword !== data.confirmNewPassword) {
      errorFlag = 1;
      errorMessage.confirmNewPassword = "Password do not match";
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
            justifyContent: "center",
            height: "100vh",
          }}
        >
          <Container>
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
                  Reset Your Password
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
                      label="New Password"
                      name="new_password"
                      placeholder="8+ characters"
                      type={"password"}
                      onChange={(e) => setNewPassword(e.target.value)}
                      onSubmit={handleSubmit}
                      value={newPassword}
                      error={formError.newPassword}
                      required
                      fullWidth
                      sx={{ marginTop: "1rem" }}
                    />
                    <FormHelperText>{formError.newPassword}</FormHelperText>

                    <TextField
                      label="Confirm Password"
                      name="confirm_password"
                      placeholder="8+ characters"
                      type={"password"}
                      onChange={(e) => setConfirmNewPassword(e.target.value)}
                      onSubmit={handleSubmit}
                      value={confirmNewPassword}
                      error={formError.confirmNewPassword}
                      required
                      fullWidth
                      sx={{ marginTop: "1rem" }}
                    />
                    <FormHelperText>
                      {formError.confirmNewPassword}
                    </FormHelperText>

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
                      Reset Password
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
