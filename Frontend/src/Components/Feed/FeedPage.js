import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/system";
import axios from "axios";
import { MDBBtn, MDBContainer, MDBRow } from "mdb-react-ui-kit";
import { React, useEffect, useState } from "react";
import "react-calendar/dist/Calendar.css";
import { useNavigate } from "react-router-dom";
import "./Feed.css";
import { MyCardComponent } from "./MyCardComponent";

/* Author : Parul Raich*/
export default function FeedPage() {
  const navigate = useNavigate();

  const options = [
    { value: "name", label: "Name" },
    { value: "description", label: "Description" },
    { value: "servings", label: "Servings" },
  ];

  const SearchContainer = styled("div")({
    display: "flex",
    justifyContent: "center",
    gap: 10,
  });

  const [isLoaded, setIsLoaded] = useState(false);
  const [recipes, setRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState("name");
  const [autofocus, setAutoFocus] = useState(false);

  useEffect(() => {
    async function fetchRecipes() {
      await axios
        .get(`https://cook-with-dal-final.onrender.com/api/recipe`)
        .then((response) => {
          console.log("printing fetch recipes");
          console.log(response.data.data);
          setRecipes(response.data.data);
          setIsLoaded(true);
        });
    }
    fetchRecipes();
  }, []);

  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchTerm(query);
    console.log(query);
  };

  const handleTypeChange = (event) => {
    const type = event.target.value;
    setSearchType(type);
    console.log("handle type change");
    console.log(type);
  };

  const handleMouseDown = (event) => {
    setAutoFocus(true);
  };

  function search(recipes) {
    return recipes.filter((recipe) => {
      if (searchType === "name") {
        return recipe.name.toLowerCase().includes(searchTerm.toLowerCase());
      } else if (searchType === "description") {
        return recipe.description
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      } else if (searchType === "servings") {
        if (searchTerm === "") {
          return true;
        } else {
          return recipe.servings === parseInt(searchTerm);
        }
      } else {
        return true; // Return all recipes if search type is not specified
      }
    });
  }

  return (
    <>
      <MDBContainer className="py-5 h-100">
        <MDBRow className="justify-content-center align-items-center h-100">
          <SearchContainer>
            <TextField
              label="Search Recipes"
              variant="outlined"
              value={searchTerm}
              autoFocus={autofocus}
              onChange={handleSearchChange}
              onMouseDown={handleMouseDown}
            />

            <Select
              label="Search Type"
              value={searchType}
              onChange={handleTypeChange}
            >
              {options.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </SearchContainer>
        </MDBRow>
        <MDBRow
          className="justify-content-center align-items-center h-100"
          style={{ marginTop: "20px" }}
        >
          {isLoaded ? (
            <div>
              <Grid
                container
                spacing={5}
                direction="row"
                justifyContent="flex-start"
              >
                {search(recipes).map((item, index) => (
                  <Grid item xs={12} sm={6} md={4} lg={4} key={item.recipe_id}>
                    <MyCardComponent
                      recipe_id={item.recipe_id}
                      index={index}
                      recipe={item}
                    ></MyCardComponent>
                  </Grid>
                ))}
              </Grid>
            </div>
          ) : (
            <div>Loading...</div>
          )}

          <br />
          <br />
          <br />
        </MDBRow>
        <MDBRow
          className="justify-content-center align-items-center h-100"
          style={{ marginTop: "20px" }}
        >
          <div>
            <MDBBtn
              color="dark"
              onClick={() => navigate("/addrecipe")}
              style={{ height: "36px", overflow: "visible" }}
            >
              Add Recipe
            </MDBBtn>
          </div>
        </MDBRow>
      </MDBContainer>
    </>
  );
}
