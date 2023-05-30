import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import ModeEditOutlineTwoToneIcon from "@mui/icons-material/ModeEditOutlineTwoTone";
import { Box } from "@mui/material";
import CardHeader from "@mui/material/CardHeader";
import IconButton from "@mui/material/IconButton";
import axios from "axios";
import React, { useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import LikesComments from "../LikesComments/LikesComments";
import "./viewRecipe.css";

/* Author : Sagarkumar Vaghasia */

export default function ViewRecipe() {
  const navigate = useNavigate();
  const [imageSrc, setImageSrc] = useState(null);
  const location = useLocation();
  const recipe = location.state;
  console.log("printing recipe inside view recipe");
  console.log(recipe);
  const currentUserEmail = localStorage.getItem("email");
  // const image = recipe.image.replace("uploads\\", "");

  const image = recipe.image;

  const handleUpdate = () => {
    navigate("/updateRecipe", { state: recipe.recipe_id });
  };

  const handleDelete = (recipeId) => {
    axios
      .delete(
        `https://cook-with-dal-final.onrender.com/api/recipe/deleteRecipe/${recipeId}/${localStorage.getItem(
          "email"
        )}`
      )
      .then((response) => {
        alert("Recipe successfully deleted!");
        navigate("/feed");
      })
      .catch((error) => {
        // Handle the error if the user could not be deleted
        console.error(error);
        alert("Error deleting recipe.");
      });

    console.log("Delete clicked");
  };

  return (
    <div className="card-container">
      <Card>
        <Row>
          <Col md={6}>
            <Card.Img variant="top" src={image} height={700} width={250} />
          </Col>
          <Col md={6}>
            <CardHeader
              sx={{ mb: -3 }}
              action={
                currentUserEmail === recipe.emailId ? (
                  <>
                    <IconButton aria-label="edit" onClick={handleUpdate}>
                      <ModeEditOutlineTwoToneIcon fontSize="large" />
                    </IconButton>
                    <IconButton
                      aria-label="delete"
                      onClick={(e) => {
                        handleDelete(recipe.recipe_id);
                      }}
                    >
                      <DeleteTwoToneIcon fontSize="large" />
                    </IconButton>
                  </>
                ) : null
              }
            />
            <Card.Body>
              <Card.Title>{recipe.name}</Card.Title>
              <div className="recipe-container-view">
                <Card.Text>
                  <h3 className="card-description-title">Description</h3>
                  <span className="card-description">{recipe.description}</span>
                  <h3 className="card-description-title">
                    Recipe Instructions
                  </h3>
                  <span className="card-description">
                    {recipe.instructions}
                  </span>
                  <h3 className="card-description-title">Ingredients</h3>
                  <ul className="list-alignment">
                    {recipe.ingredients.map((ingredient, idx) => (
                      <li key={idx}>
                        {ingredient.name} - {ingredient.quantity}
                      </li>
                    ))}
                  </ul>
                  <h3 className="card-description-title">
                    Serves: {recipe.servings}
                  </h3>
                  <h3 className="card-description-title">
                    Preparation Time: {recipe.prepTime}
                  </h3>
                </Card.Text>
              </div>
            </Card.Body>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                p: 1,
                m: 1,
                bgcolor: "background.paper",
                borderRadius: 1,
              }}
            >
              <LikesComments
                showLikes={false}
                showComments={false}
                recipe_id={recipe.recipe_id}
              />
            </Box>
            {/* <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                p: 1,
                m: 1,
                bgcolor: "background.paper",
                borderRadius: 1,
              }}
            >
              {currentUserEmail === recipe.emailId && (
                <div>
                  <MDBBtn
                    color="dark"
                    onClick={handleUpdate}
                    style={{
                      height: "36px",
                      overflow: "visible",
                      marginRight: "20px",
                    }}
                  >
                    Update Recipe
                  </MDBBtn>
                  <MDBBtn
                    color="dark"
                    onClick={(e) => {
                      handleDelete(recipe.recipe_id);
                    }}
                    style={{
                      height: "36px",
                      overflow: "visible",
                      marginLeft: "20px",
                    }}
                  >
                    Delete Recipe
                  </MDBBtn>
                </div>
              )}
            </Box> */}
          </Col>
        </Row>
      </Card>
    </div>
  );
}
