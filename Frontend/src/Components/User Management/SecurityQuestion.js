import { Stack } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import styles from "./SecurityQuestion.module.css";
import axios from "axios";

/* Author : Saifali Prasla */
export default function SecurityQuestion() {
  const [answer, setAnswer] = useState("");
  const theme = useTheme();
  const [formError, setFormError] = useState({});

  const navigate = useNavigate();
  const { state } = useLocation();
  const { email, question } = state ?? {};

  let errorFlag = 0;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formValue = {
      email: email,
      question: question,
      answer: answer,
    };
    try {
      const response = await axios.post(
        "https://cook-with-dal-final.onrender.com/api/users/verifyAnswer",
        {
          ...formValue,
        }
      );
      alert(response.data.message);
      console.log(response.data);
      navigate("/new-password", { state: { email: email } });
    } catch (error) {
      if (error.response.status === 404) {
        alert(error.response.data.message);
      } else if (error.response.status === 401) {
        alert(error.response.data.message);
      } else {
        console.log(error);
      }
      setAnswer("");
    }
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
                  Security Question
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
                      label="Security Question"
                      value={question}
                      required
                      name="security-question"
                      type="text"
                      onSubmit={handleSubmit}
                      fullWidth
                      sx={{ marginTop: "1rem" }}
                    />

                    <TextField
                      fullWidth
                      required
                      label="Answer"
                      name="answer"
                      onChange={(e) => setAnswer(e.target.value)}
                      onSubmit={handleSubmit}
                      value={answer}
                      sx={{ marginTop: "1rem" }}
                    />

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
