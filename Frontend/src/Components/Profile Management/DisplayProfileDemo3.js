import React, { useState, useEffect } from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
  MDBTypography,
} from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import { BookmarkBorder, Bookmark } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";

/* Author : Faiza Umatiya */

//https://mdbootstrap.com/docs/react/extended/profiles/

// Integerated Code to show bookmarked recipes from backend under saved recipe : AUTHOR : PARUL RAICH
export default function DisplayProfilePageDemo3(props) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [photo, setPhoto] = useState("");
  const [bio, setBio] = useState("");
  const loggedinEmail = localStorage.getItem("email");

  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [show, setShow] = useState(false);
  const [displayType, setDisplayType] = useState("created"); // initial display

  useEffect(() => {
    axios
      .get(
        `https://cook-with-dal-final.onrender.com/api/users/getUser/${loggedinEmail}`
      )
      .then((response) => {
        console.log(response.data.user);
        setFirstName(response.data.user.firstName);
        setLastName(response.data.user.lastName);
        setBio(response.data.user.bio);
        setPhoto(response.data.user.photo);
      })
      .catch((error) => console.log(error));
  }, [loggedinEmail]);

  const [myRecipes, setMyRecipes] = useState([]);
  const [myBookmarkRecipes, setmyBookmarkRecipes] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  function onSavedHandler() {
    setShowModal(true);
    setShow(true);
    setDisplayType("saved");
  }

  function onCreatedHandler() {
    setDisplayType("created");
  }

  useEffect(() => {
    function fetchRecipes() {
      console.log("EMAIL====>", localStorage.getItem("email"));
      axios
        .get(
          `https://cook-with-dal-final.onrender.com/api/recipe/getUserRecipes?emailId=${localStorage.getItem(
            "email"
          )}`
        )
        .then((response) => {
          console.log(response);
          let data = response.data.data;
          console.log("DATA====>", data);
          data.forEach(async (recipe, idx) => {
            let finalRecipe = recipe;

            setMyRecipes((prevRecipe) => [...prevRecipe, finalRecipe]);
          });

          setIsLoaded(true);
        });
    }
    function fetchBookmarkRecipes() {
      console.log("inside fetch bookmark recipe");
      console.log("EMAIL====>", localStorage.getItem("email"));
      axios
        .get(
          `https://cook-with-dal-final.onrender.com/api/bookmarkRecipe/bookmark/${localStorage.getItem(
            "email"
          )}`
        )
        .then((response) => {
          console.log(response);
          let data = response.data.data;
          console.log("DATA====>", data);
          data.forEach(async (recipe, idx) => {
            let recipeId = recipe.recipeId;
            console.log(recipe);
            console.log(recipe.recipeId);
            let userId = localStorage.getItem("email");
            const recipeFromBackend = await axios.get(
              "https://cook-with-dal-final.onrender.com/api/recipe/details/getRecipe/" +
                recipeId
            );
            console.log("recipe from backend");
            console.log(recipeFromBackend);

            let finalRecipe = recipeFromBackend.data.data;
            console.log("printing final recipe");
            console.log(finalRecipe);

            setmyBookmarkRecipes((prevRecipe) => [...prevRecipe, finalRecipe]);
          });

          setIsLoaded(true);
        });
    }
    fetchRecipes();
    fetchBookmarkRecipes();
  }, []);

  const handleDeleteProfile = () => {
    axios
      .delete(
        `https://cook-with-dal-final.onrender.com/api/users/deleteUser/${loggedinEmail}`
      )
      .then((response) => {
        alert("User successfully deleted!");
        localStorage.clear();
        navigate("/");
      })
      .catch((error) => {
        // Handle the error if the user could not be deleted
        console.error(error);
        alert("Error deleting user.");
      });
  };

  const handleRecipeOnClick = (recipe) => {
    console.log("RECIPE=====>", recipe);
    navigate("/view-recipe", { state: recipe });
  };

  const handleClose = () => setShow(false);

  const handleRecipeOnClickFromBookmark = (recipe) => {
    console.log("RECIPE=====>", recipe);
    navigate("/view-recipe", { state: recipe });
  };

  const handleBookmarkDeleteClick = (recipeId) => {
    console.log("inside bookmark");
    console.log(recipeId);
    const userId = localStorage.getItem("email");

    axios
      .delete(
        `https://cook-with-dal-final.onrender.com/api/bookmarkRecipe/bookmark/${recipeId}/${userId}`
      )
      .then((response) => {
        console.log(response.data.statusMessage);
        setmyBookmarkRecipes(
          myBookmarkRecipes.filter((recipe) => recipe.recipe_id !== recipeId)
        );
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // render content based on displayType
  const renderContent = () => {
    if (displayType === "created") {
      return (
        <div>
          <div className="d-flex justify-content-between align-items-center mb-4">
            {isLoaded ? (
              <ImageList
                sx={{ width: 1000, height: 1000 }}
                cols={3}
                rowHeight={170}
              >
                {myRecipes.map((recipe, idx) => (
                  <ImageListItem
                    key={idx}
                    onClick={(e) => {
                      handleRecipeOnClick(recipe);
                    }}
                  >
                    <span>{recipe.name}</span>
                    <img src={recipe.image} srcSet={recipe.image} />
                  </ImageListItem>
                ))}
              </ImageList>
            ) : (
              <div>Loading...</div>
            )}
          </div>
        </div>
      );
    } else if (displayType === "saved") {
      return (
        <div className="d-flex justify-content-between align-items-center mb-4">
          {isLoaded ? (
            <ImageList
              sx={{ width: 1000, height: 1000 }}
              cols={3}
              rowHeight={170}
            >
              {myBookmarkRecipes.map((recipe, idx) => (
                <ImageListItem
                  key={idx}
                  onClick={(e) => {
                    handleRecipeOnClickFromBookmark(recipe);
                  }}
                >
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      position: "relative",
                    }}
                  >
                    <span>{recipe.name}</span>
                    <img
                      style={{ width: "100%", height: "auto" }}
                      src={recipe.image}
                      srcSet={recipe.image}
                    />
                    <ImageListItemBar
                      sx={{ position: "absolute", bottom: -50 }}
                      actionIcon={
                        <IconButton
                          sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                          aria-label={`info about ${recipe.name}`}
                          onClick={(e) => {
                            e.stopPropagation(); // prevent click event from propagating
                            handleBookmarkDeleteClick(recipe.recipe_id);
                          }}
                        >
                          <Bookmark />
                        </IconButton>
                      }
                    />
                  </div>
                </ImageListItem>
              ))}
            </ImageList>
          ) : (
            <div>Loading...</div>
          )}
        </div>
      );
    }
  };

  return (
    <div className="gradient-custom-2">
      <MDBContainer className="py-5 h-100">
        <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCol lg="10" xl="10">
            <MDBCard>
              <div
                className="rounded-top text-white d-flex flex-row"
                style={{ backgroundColor: "#000", height: "250px" }}
              >
                <div
                  className="ms-4 mt-5 d-flex flex-column"
                  style={{ width: "150px" }}
                >
                  <MDBCardImage
                    src={photo ? photo : "/default_profile.jpg"}
                    alt="Generic placeholder image"
                    className="mt-4 mb-2 img-thumbnail"
                    fluid
                    style={{
                      width: "150px",
                      maxHeight: "80%",
                      zIndex: "1",
                      objectFit: "cover",
                    }}
                  />
                </div>

                <div className="ms-3" style={{ marginTop: "130px" }}>
                  <MDBTypography tag="h5">
                    {firstName} {lastName}
                  </MDBTypography>
                </div>
              </div>

              <div
                className="p-4 text-black"
                style={{ backgroundColor: "#f8f9fa" }}
              >
                <div>
                  <MDBBtn
                    outline
                    color="dark"
                    onClick={() => navigate("/updateProfile")}
                    style={{ height: "36px", overflow: "visible" }}
                  >
                    Edit Profile
                  </MDBBtn>
                  &nbsp; &nbsp; &nbsp;
                  <MDBBtn
                    outline
                    color="dark"
                    onClick={handleDeleteProfile}
                    style={{ height: "36px", overflow: "visible" }}
                  >
                    Delete Account
                  </MDBBtn>
                </div>
              </div>

              <MDBCardBody className="text-black p-4">
                <div className="mb-5">
                  <p className="lead fw-normal mb-1">Bio</p>

                  <div className="p-4" style={{ backgroundColor: "#f8f9fa" }}>
                    <MDBCardText className="font-italic mb-1">
                      {bio}
                    </MDBCardText>
                  </div>
                </div>

                <div>
                  <MDBBtn
                    outline
                    focus
                    color="dark"
                    style={{ height: "36px", overflow: "visible" }}
                    className={displayType === "created" ? "active" : ""}
                    onClick={onCreatedHandler}
                  >
                    Created
                  </MDBBtn>
                  &nbsp; &nbsp; &nbsp;
                  <MDBBtn
                    outline
                    color="dark"
                    style={{ height: "36px", overflow: "visible" }}
                    className={displayType === "saved" ? "active" : ""}
                    onClick={onSavedHandler}
                  >
                    Saved
                  </MDBBtn>
                </div>

                <div className="mt-5">{renderContent()}</div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
}
//https://www.geeksforgeeks.org/react-mui-image-list-layout/
