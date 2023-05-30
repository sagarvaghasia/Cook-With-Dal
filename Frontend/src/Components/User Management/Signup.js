import { Select, Stack } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import { useTheme } from "@mui/material/styles";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Signup.module.css";
const BASE_URL = "https://cook-with-dal-final.onrender.com/api";

export default function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const theme = useTheme();
  const navigate = useNavigate();
  const [formError, setFormError] = useState({});

  const questionMap = {
    "mother-middle-name": "What is your mother's middle name?",
    "pet-name": "What was the name of your first pet?",
    "parents-meeting-town": "In what city or town did your parents meet?",
  };

  let errorFlag = 0;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formValue = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      confirmPassword: confirmPassword,
      question: questionMap[question],
      answer: answer,
    };
    console.log(formValue.question);
    setFormError(validateForm(formValue));
    if (errorFlag === 0) {
      localStorage.setItem("email", email);

      try {
        console.log("printing deseialized form data");
        console.log({ ...formValue });
        const response = await axios.post(
          "https://cook-with-dal-final.onrender.com/api/users/addUser",
          {
            ...formValue,
          }
        );
        alert(response.data.statusMessage);
        console.log(response.data);
        navigate("/");
      } catch (error) {
        if (error.response.status === 409) {
          alert(error.response.data.message);
        } else {
          console.error(error.message);
        }
        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setQuestion("");
        setAnswer("");
      }
    } else {
      console.log(formError);
    }
  };

  const validateForm = (data) => {
    const letterRegex = /^[a-zA-Z\s]*$/; //Reference: https://stackoverflow.com/questions/12778083/regex-with-space-and-letters-only
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/; //Reference : https://regexr.com/3e48o
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/; //Reference: https://stackoverflow.com/questions/19605150/regex-for-password-must-contain-at-least-eight-characters-at-least-one-number-a
    const errorMessage = {};
    if (letterRegex.test(data.firstName) === false) {
      errorFlag = 1;
      errorMessage.firstName = "First Name should only have letters";
    } else if (letterRegex.test(data.lastName) === false) {
      errorFlag = 1;
      errorMessage.lastName = "Last Name should only have letters ";
    } else if (data.email === "" || emailRegex.test(data.email) === false) {
      errorFlag = 1;
      errorMessage.email = "Email is not valid";
    } else if (passwordRegex.test(data.password) === false) {
      errorFlag = 1;
      errorMessage.password =
        "Password must be more than 8 characters, must have at least one uppercase letter, one lowercase letter, one number and one special character";
    } else if (data.password !== data.confirmPassword) {
      errorFlag = 1;
      errorMessage.confirmPassword = "Password do not match";
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
            backgroundColor: "lightblue",
            //backgroundColor: "#EBF4F7",
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
              src="recipe-sharing-updated.png"
              draggable="false;"
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
            height: "100vh",
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
              Already a member?
              <a style={{ textDecoration: "none" }} href="/">
                {" "}
                Login
              </a>
            </p>
          </div>
          <Container
            style={{
              marginTop: "4rem",
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
                  Sign up to Cook With Dal
                </h2>

                <Box
                  sx={{
                    marginTop: "1rem",
                    width: "515px",
                    maxWidth: "100%",
                    "@media (max-width: 600px)": {
                      height: "100vh",
                    },
                  }}
                >
                  <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={6} sm={6}>
                        <TextField
                          label="First Name"
                          name="first_name"
                          type="text"
                          onChange={(e) => setFirstName(e.target.value)}
                          onSubmit={handleSubmit}
                          value={firstName}
                          error={formError.firstName}
                          required
                          fullWidth
                        />
                        <FormHelperText>{formError.firstName}</FormHelperText>
                      </Grid>
                      <Grid item xs={12} md={6} sm={6}>
                        <TextField
                          label="Last Name"
                          name="last_name"
                          type="text"
                          onChange={(e) => setLastName(e.target.value)}
                          onSubmit={handleSubmit}
                          value={lastName}
                          error={formError.lastName}
                          required
                          fullWidth
                        />
                        <FormHelperText>{formError.lastName}</FormHelperText>
                      </Grid>
                    </Grid>

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

                    <TextField
                      label="Confirm Password"
                      name="confirm_password"
                      placeholder="8+ characters"
                      type={"password"}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      onSubmit={handleSubmit}
                      value={confirmPassword}
                      error={formError.confirmPassword}
                      required
                      fullWidth
                      sx={{ marginTop: "1rem" }}
                    />
                    <FormHelperText>{formError.confirmPassword}</FormHelperText>

                    <FormControl fullWidth required sx={{ marginTop: "1rem" }}>
                      <InputLabel id="security-question">
                        Security Question
                      </InputLabel>
                      <Select
                        labelId="security-question"
                        id="security-question"
                        value={question}
                        label="Security Question"
                        required
                        onChange={(e) => setQuestion(e.target.value)}
                      >
                        <MenuItem value="mother-middle-name">
                          <span style={{ fontSize: "rem" }}>
                            What is your mother's middle name?
                          </span>
                        </MenuItem>
                        <MenuItem value="pet-name">
                          What was the name of your first pet?
                        </MenuItem>
                        <MenuItem value="parents-meeting-town">
                          In what city or town did your parents meet?
                        </MenuItem>
                      </Select>
                    </FormControl>

                    <TextField
                      fullWidth
                      required
                      label="Answer"
                      name="answer"
                      onChange={(e) => setAnswer(e.target.value)}
                      onSubmit={handleSubmit}
                      value={answer}
                      error={formError.answer}
                      sx={{ marginTop: "1rem" }}
                    />
                    <FormHelperText>{formError.answer}</FormHelperText>

                    <Button
                      sx={{
                        marginTop: "2rem",
                        padding: "0.7rem",
                        outline: "none",
                        border: "none",
                        borderRadius: "4rem",
                        fontSize: "1.1rem",
                        cursor: "pointer",
                        fontWeight: "600",
                      }}
                      variant="contained"
                      fullWidth
                      type={"submit"}
                    >
                      Create Account
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
