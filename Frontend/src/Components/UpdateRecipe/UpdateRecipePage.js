import React, { useEffect, useState } from "react";
import { navigate, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "./UpdateRecipe.css";
import "react-dropdown/style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { MDBContainer, MDBRow, MDBCol } from "mdb-react-ui-kit";

/* Author : Sagarkumar Vaghasia */
const UpdateRecipePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const recipeId = location.state;
  console.log(recipeId);

  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [ingredientName, setIngredientName] = useState("");
  const [ingredientQuantity, setIngredientQuantity] = useState("");
  const [instructions, setInstructions] = useState("");
  const [servings, setServings] = useState("");
  const [prepTime, setPrepTime] = useState("");

  useEffect(() => {
    axios
      .get(
        `https://cook-with-dal-final.onrender.com/api/recipe/details/getRecipe/${recipeId}`
      )
      .then((response) => {
        console.log("inside useeffect response");

        console.log(response);

        response = response.data;

        setName(response.data.name);
        setImage(response.data.image);
        setDescription(response.data.description);
        setIngredients(response.data.ingredients);
        setIngredientName(response.data.ingredientName);
        setIngredientQuantity(response.data.ingredientQuantity);
        setInstructions(response.data.instructions);
        setServings(response.data.servings);
        setPrepTime(response.data.prepTime);
      })
      .catch((error) => console.log(error));
  }, [recipeId]);

  const handleIngredientAdd = (event) => {
    event.preventDefault();
    if (ingredientName && ingredientQuantity) {
      setIngredients([
        ...ingredients,
        { name: ingredientName, quantity: ingredientQuantity },
      ]);
      setIngredientName("");
      setIngredientQuantity("");
    }
  };

  const imageUpload = async (event) => {
    const selectedFile = event.target.files[0];
    const base64 = await convertToBase64(selectedFile);
    console.log("printing base64 ");
    console.log(base64);
    setImage(base64);
  };

  function convertToBase64(file) {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("image", image);
    formData.append("name", name);

    ingredients.forEach((ingredient, index) => {
      formData.append(`ingredients[${index}][name]`, ingredient.name);
      formData.append(`ingredients[${index}][quantity]`, ingredient.quantity);
    });

    formData.append("instructions", instructions);
    formData.append("servings", servings);
    formData.append("prepTime", prepTime);
    formData.append("description", description);
    console.log("Inside formData");

    console.log(formData);

    axios
      .put(
        `https://cook-with-dal-final.onrender.com/api/recipe/updateRecipe/${recipeId}`,
        formData,
        {
          headers: { "Content-Type": "application/json" },
        }
      )
      .then((response) => {
        console.log("Recipe updated successfully:", response.data);
        navigate("/feed");
      })
      .catch((error) => {
        console.error("Error updating recipe:", error);
      });
  };

  return (
    <MDBContainer className="py-5 h-100">
      <MDBRow className="justify-content-center align-items-center h-100">
        <MDBCol lg="14" xl="10">
          <div className="add-recipe">
            <form onSubmit={handleSubmit} id="add-recipe-form">
              <h2 className="text-dark mb-4">Update Recipe</h2>

              <div className="form-group row mt-2">
                <label
                  className="text-dark col-sm-4 col-form-label fw-bold"
                  htmlFor="title"
                >
                  Recipe Name:
                </label>
                <div className="col-sm-8">
                  <input
                    className="form-control"
                    type="text"
                    id="title"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="form-group row mt-2">
                <label
                  className="text-dark col-sm-4 col-form-label fw-bold"
                  htmlFor="upload-image"
                >
                  Upload Image
                </label>
                <div className="col-sm-8">
                  <input
                    className="form-control"
                    type="file"
                    id="upload-image"
                    onChange={imageUpload}
                  />
                </div>
              </div>

              <div className="form-group row mt-2">
                <label
                  className="text-dark col-sm-4 col-form-label fw-bold"
                  htmlFor="description"
                >
                  Description
                </label>
                <div className="col-sm-8">
                  <textarea
                    className="form-control"
                    type="text"
                    id="description"
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                    required
                  />
                </div>
              </div>

              <ul>
                {ingredients.map((ingredient, index) => (
                  <li key={index}>
                    {ingredient.name} - {ingredient.quantity}
                  </li>
                ))}
              </ul>

              <div className="form-group row mt-2">
                <label
                  className="text-dark col-sm-4 col-form-label fw-bold"
                  htmlFor="ingredients"
                >
                  Ingredients
                </label>

                <div className="col-sm-8">
                  <input
                    className="form-control"
                    type="text"
                    id="ingredients"
                    placeholder="Ingredient Name"
                    value={ingredientName}
                    onChange={(event) => setIngredientName(event.target.value)}
                  />

                  <input
                    className="form-control"
                    type="text"
                    id="ingredients"
                    placeholder="Quantity"
                    value={ingredientQuantity}
                    onChange={(event) =>
                      setIngredientQuantity(event.target.value)
                    }
                  />
                  <button onClick={handleIngredientAdd}>Add Ingredient</button>
                </div>

                <div className="col-sm-8"></div>
              </div>

              <div className="form-group row mt-2">
                <label
                  className="text-dark col-sm-4 col-form-label fw-bold"
                  htmlFor="instructions"
                >
                  Instructions
                </label>
                <div className="col-sm-8">
                  <textarea
                    className="form-control"
                    type="text"
                    id="instructions"
                    value={instructions}
                    onChange={(event) => setInstructions(event.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="form-group row mt-2">
                <label
                  className="text-dark col-sm-4 col-form-label fw-bold"
                  htmlFor="servings"
                >
                  Servings
                </label>
                <div className="col-sm-8">
                  <input
                    className="form-control"
                    type="number"
                    id="servings"
                    value={servings}
                    onChange={(event) => setServings(event.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="form-group row mt-2">
                <label
                  className="text-dark col-sm-4 col-form-label fw-bold"
                  htmlFor="prepTime"
                >
                  Preparation Time:
                </label>
                <div className="col-sm-8">
                  <input
                    className="form-control"
                    type="text"
                    id="prepTime"
                    placeholder="e.g 1 hour"
                    value={prepTime}
                    onChange={(event) => setPrepTime(event.target.value)}
                    required
                  />
                </div>
              </div>
              <div>
                <button className="btn btn-dark mt-5 mb-4" type="submit">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default UpdateRecipePage;
