import { Bookmark, BookmarkBorder } from "@mui/icons-material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  CardActionArea,
  CardActions,
  Menu,
  MenuItem,
  Popover,
} from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useNavigate } from "react-router-dom";
import LikesComments from "../LikesComments/LikesComments";

/* Author : Parul Raich*/
export const MyCardComponent = (props) => {
  const { recipe_id, index, recipe } = props;
  const userId = localStorage.getItem("email");
  const minDate = new Date();

  const [anchorEl, setAnchorEl] = useState(null);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [popoverAnchorEl, setPopoverAnchorEl] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [initialBookmarkStatus, setInitialBookmarkStatus] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isBookmarkIconSelected, setIsBookmarkIconSelected] = useState(false);
  const [src, setSrc] = useState(null);
  const initialImage = recipe.image;
  const dateString = recipe.createdAt;
  const date = new Date(dateString);

  const formattedDate = date.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const cardRef = useRef(null);
  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCalendarClose = () => {
    setCalendarOpen(false);
  };

  const handleCalendarOpen = (event) => {
    setPopoverAnchorEl(cardRef.current);
    handleClose();
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    handleCalendarClose();
    const convdate = date.toISOString();
    const data = {
      userId,
      recipeId: recipe_id,
      mealDate: convdate,
    };

    axios
      .post("https://cook-with-dal-final.onrender.com/api/mealPlan/", data)
      .then((response) => {
        // handle success
        console.log(response);
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });

    console.log("console convdate");
    console.log(convdate);
    setPopoverAnchorEl(null);
  };

  const handleRecipeOpen = () => {
    navigate("/view-recipe", { state: recipe });
  };

  const handleLikeClick = () => {
    setIsLiked(!isLiked);
  };

  const handleBookmarkClick = async () => {
    const newBookmarkStatus = !isBookmarked;
    setIsBookmarked(newBookmarkStatus);
    if (newBookmarkStatus !== initialBookmarkStatus) {
      if (newBookmarkStatus) {
        axios
          .put(
            `https://cook-with-dal-final.onrender.com/api/bookmarkRecipe/bookmark/${userId}`,
            {
              recipe_id,
            }
          )
          .then((response) => {
            console.log(response.data.statusMessage);
            setIsBookmarkIconSelected(true);
          })
          .catch((error) => {
            console.error(error);
          });
      } else {
        axios
          .delete(
            `https://cook-with-dal-final.onrender.com/api/bookmarkRecipe/bookmark/${recipe_id}/${userId}`
          )
          .then((response) => {
            console.log(response.data.statusMessage);
            setIsBookmarkIconSelected(false);
          })
          .catch((error) => {
            console.error(error);
          });
      }
    } else {
      axios
        .delete(
          `https://cook-with-dal-final.onrender.com/api/bookmarkRecipe/bookmark/${recipe_id}/${userId}`
        )
        .then((response) => {
          console.log(response.data.statusMessage);
          setIsBookmarkIconSelected(false);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  useEffect(() => {
    axios
      .get(
        `https://cook-with-dal-final.onrender.com/api/bookmarkRecipe/bookmark/${recipe_id}/${userId}`
      )
      .then((response) => {
        setInitialBookmarkStatus(response.data.data);
        setIsBookmarkIconSelected(response.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [recipe_id, userId]);

  const popoverOpen = Boolean(popoverAnchorEl);

  return (
    <Card key={index} index={index} ref={cardRef}>
      <CardHeader
        action={
          <IconButton aria-label="settings" onClick={handleClick}>
            <MoreVertIcon />
          </IconButton>
        }
        title={recipe.name}
        subheader={formattedDate}
      />
      {anchorEl && (
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleCalendarOpen}>Add to Meal Plan</MenuItem>
        </Menu>
      )}
      {popoverAnchorEl && (
        <Popover
          open={popoverOpen}
          anchorEl={popoverAnchorEl}
          onClose={handleCalendarClose}
          anchorOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
        >
          <Calendar
            value={selectedDate}
            onChange={handleDateChange}
            onClose={handleCalendarClose}
            minDate={minDate}
          />
        </Popover>
      )}
      <CardActionArea onClick={handleRecipeOpen}>
        <CardMedia
          component="img"
          image={initialImage}
          alt="Paella dish"
          height="300"
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {recipe.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* <Box sx={{ display: 'inline-flex' }}> */}
        <LikesComments
          showLikes={false}
          showComments={true}
          recipe_id={recipe.recipe_id}
        />
        {/* </Box> */}
        <IconButton
          onClick={handleBookmarkClick}
          size="large"
          aria-label="add to bookmarks"
        >
          {isBookmarkIconSelected ? <Bookmark /> : <BookmarkBorder />}
        </IconButton>
      </CardActions>
    </Card>
  );
};
