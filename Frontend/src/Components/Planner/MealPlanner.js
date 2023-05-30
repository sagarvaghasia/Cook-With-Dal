import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import DeleteIcon from "@mui/icons-material/Delete";
import { Container } from "@mui/material";
import { styled } from "@mui/material/styles";
import axios from "axios";
import { MDBContainer } from "mdb-react-ui-kit";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./MealPlanner.css";

/* Author : Parul Raich */

const MealPlanner = () => {
  const [events, setEvents] = useState([]);
  const userId = localStorage.getItem("email");
  const [isDeleted, setIsDeleted] = useState(false);

  const navigate = useNavigate();

  const convertDate = async (isoDate) => {
    const date = new Date(isoDate);
    const year = date.getFullYear(); // get the year (4 digits)
    const month = String(date.getMonth() + 1).padStart(2, "0"); // get the month (0-11) and add leading zero if necessary
    const day = String(date.getDate()).padStart(2, "0"); // get the day of the month (1-31) and add leading zero if necessary
    const formattedDate = `${year}-${month}-${day}`;
    console.log("formatted date");
    console.log(formattedDate);
    return formattedDate;
  };

  useEffect(() => {
    async function fetchRecipes() {
      try {
        const response = await axios.get(
          `https://cook-with-dal-final.onrender.com/api/mealPlan/${localStorage.getItem(
            "email"
          )}`
        );
        console.log(response);
        console.log(response.data.data);
        let recipes = response.data.data;
        console.log("recipe from mealplans");
        console.log(recipes);

        let eventsArray = await Promise.all(
          recipes.map(async (recipe) => {
            let recipeDate = await convertDate(recipe.mealDate);
            let recipeId = recipe.recipeId;
            let mealPlanId = recipe._id;

            console.log("printing mealplan id");
            console.log(mealPlanId);

            const recipeResponse = await axios.get(
              "https://cook-with-dal-final.onrender.com/api/recipe/" +
                recipeId +
                "/" +
                userId
            );
            console.log("inside get response");
            console.log(recipeResponse.data);
            const recipeFromBackend = recipeResponse.data;
            let finalRecipe = recipeFromBackend.data;
            console.log("finalRecipe");
            console.log(finalRecipe);
            const image = finalRecipe.image;

            let displayData = {
              title: finalRecipe.name,
              start: recipeDate,
              end: recipeDate,
              extendedProps: {
                image: image,
                id: mealPlanId,
                recipe: finalRecipe,
              },
            };
            console.log("displayData");
            console.log(displayData);
            return displayData;
          })
        );
        console.log("printing events array");
        console.log(eventsArray);
        setEvents(eventsArray);
      } catch (error) {
        console.error(error);
      }
    }
    fetchRecipes();
  }, []);

  const StyledContainer = styled(Container)(({ theme }) => ({
    padding: theme.spacing(2),
    boxShadow: theme.shadows[2],
    borderRadius: theme.shape.borderRadius,
    width: "100%",
    height: "calc(100% - 60px)",
    maxWidth: "none",
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    backgroundColor: "white",
    overflow: "auto",
    zIndex: 0,
  }));

  const handleDelete = (event) => {
    event.preventDefault();
    const id = event.currentTarget.parentNode.dataset.id;
    console.log(id);
    axios
      .delete(`https://cook-with-dal-final.onrender.com/api/mealPlan/${id}`)
      .then((response) => {
        console.log(response);
        setEvents(events.filter((event) => event.extendedProps.id !== id));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleImgClick = (event, recipe) => {
    event.preventDefault();
    console.log("printing recipe inside handle image click");
    console.log(recipe);
    navigate("/view-recipe", { state: recipe });
  };

  function renderEventContent(eventInfo) {
    console.log("eventInfo");
    console.log(eventInfo.event.extendedProps.recipe);
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <div className="calendar-image-wrapper">
          <img
            src={eventInfo.event.extendedProps.image}
            style={{ objectFit: "cover", width: "100%", height: "100%" }}
            className="calendar-image"
            onClick={(event) => {
              handleImgClick(event, eventInfo.event.extendedProps.recipe);
            }}
          />
          <div
            className="delete-icon"
            data-id={eventInfo.event.extendedProps.id}
          >
            <i className="fas fa-trash-alt" onClick={handleDelete}>
              <DeleteIcon />
            </i>
          </div>
        </div>
      </div>
    );
  }
  return (
    <MDBContainer className="py-5 h-100">
      <StyledContainer>
        {console.log(events)}
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          events={events}
          eventContent={renderEventContent}
        />
      </StyledContainer>
    </MDBContainer>
  );
};

export default MealPlanner;
