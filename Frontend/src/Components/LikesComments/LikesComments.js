/* Author: Anuj Dawar */

import "./LikesComments.css";
import "bootstrap/dist/css/bootstrap.css";
import { useState, useEffect } from "react";
import { Button, Grid } from "@mui/material";
import CommentIcon from "@mui/icons-material/Comment";
import IconButton from "@mui/material/IconButton";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import SaveAsIcon from "@mui/icons-material/SaveAs";
import Box, { BoxProps } from "@mui/material/Box";

function Recipe(props) {
  const recipeId = props.recipe_id;
  const userId = localStorage.getItem("email");
  const showComments = props.showComments;
  const showLikes = props.showLikes;
  const [openCommentsDialog, setOpenCommentsDialog] = React.useState(false);
  const [openDialogForError, setOpenDialogForError] = useState(false);
  const [alertDialogForErrorTitle, setAlertDialogForErrorTitle] = useState("");
  const [alertDialogForErrorContext, setAlertDialogForErrorContext] =
    useState("");
  const dense = false;
  const [likeState, setLikeState] = useState(false);
  const [likeCounter, setLikeCounter] = useState(0);
  const [editableIndex, setEditableIndex] = useState(-1);
  const [commentsList, setCommentsList] = useState([]);
  const [openBackdrop, setOpenBackdrop] = useState(false);

  const [openDialogConfirmDelete, setOpenDialogConfirmDelete] = useState(false);
  const [isConfirmedDelete, setIsConfirmedDelete] = useState(false);
  const [deleteCommentModel, setDeleteCommentModel] = useState("");

  let updatedCommentText = "";

  useEffect(() => {
    async function renderLikesAndComments() {
      await setTimeout(async () => {
        await updateCommentsList();
      }, 100);
    }
    renderLikesAndComments();
  }, []);

  const handleCloseDialogConfirmDelete = () => {
    setOpenDialogConfirmDelete(false);
  };

  const handleConfirmDeleteYes = async () => {
    setIsConfirmedDelete(true);
    await onDeleteCommentClick();
  };

  const handleCloseDialogForError = () => {
    setOpenDialogForError(false);
  };

  const handleOpenDialogForError = () => {
    setOpenDialogForError(true);
  };

  const handleCloseBackdrop = () => {
    setOpenBackdrop(false);
  };

  const handleOpenBackdrop = () => {
    setOpenBackdrop(true);
  };

  const handleOpenCommentsDialog = async () => {
    setOpenCommentsDialog(true);
  };

  const handleCloseCommentsDialog = async () => {
    setOpenCommentsDialog(false);
  };

  function validateForEmpty(newComment) {
    if (newComment && newComment.length > 0) return true;
    return false;
  }

  const handleAddComment = async () => {
    // validate comment here

    const newComment = document.getElementById("newCommentField").value;
    const isCommentValid = validateForEmpty(newComment);

    if (!isCommentValid) {
      setAlertDialogForErrorTitle("Add Comment");
      setAlertDialogForErrorContext(
        "Comment cannot be empty.  enter some text."
      );

      await handleOpenDialogForError();

      return;
    }

    const data = {
      comment: document.getElementById("newCommentField").value,
      createdBy: userId,
    };

    fetch(
      "https://cook-with-dal-final.onrender.com/api/recipe/comment/add/" +
        recipeId,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    )
      .then(async (response) => (response = response.json()))
      .then(async (data) => {
        document.getElementById("newCommentField").value = "";

        if (data.success) {
          await setAlertDialogForErrorTitle("Add Comment");
          await setAlertDialogForErrorContext("Comment added successfully.");
          await updateCommentsList(true);
        }
      });
  };

  const updateCommentsList = async (...isCommentsDialogOpen) => {
    await timeout(500);
    console.log("recipe Id", recipeId);

    fetch(
      "https://cook-with-dal-final.onrender.com/api/recipe/" +
        recipeId +
        "/" +
        userId,
      {
        method: "GET",
      }
    )
      .then(async (response) => (response = response.json()))
      .then(async (data) => {
        if (data.success) {
          setLikeCounter(data["data"]["likes"]);
          setLikeState(!data["data"]["liked"]);

          if (isCommentsDialogOpen.length > 0) {
            // handleCloseCommentsDialog();
            await handleOpenBackdrop();
            await timeout(500);
          }

          let tempCommentList = [];

          data["data"]["comments"].forEach((element) => {
            tempCommentList.push({
              comment: element["comment"],
              owner: element["createdBy"],
              createdOn: element["createdAt"].substring(0, 10),
              id: element["_id"],
            });
          });

          setCommentsList(tempCommentList);

          if (isCommentsDialogOpen.length > 0) {
            await handleCloseCommentsDialog();
            await handleCloseBackdrop();
            await handleOpenDialogForError();
          }
        }
      });
  };

  const clickLikeHandler = async () => {
    setLikeState(!likeState);

    if (likeState) {
      const data = { likes: likeCounter + 1 };

      fetch(
        "https://cook-with-dal-final.onrender.com/api/recipe/like/" +
          recipeId +
          "/" +
          userId,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      )
        .then((response) => (response = response.json()))
        .then((data) => {
          setLikeCounter(likeCounter + 1);
        });
    } else {
      const data = { likes: likeCounter - 1 };

      fetch(
        "https://cook-with-dal-final.onrender.com/api/recipe/unlike/" +
          recipeId +
          "/" +
          userId,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      )
        .then((response) => (response = response.json()))
        .then((data) => {
          setLikeCounter(likeCounter - 1);
        });
    }
  };

  const onEditCommentClick = (index) => {
    if (editableIndex != -1) {
      //  don't change the editable index
      //  TODO: give an alert message that changes not allowed yet.
      return;
    }

    setEditableIndex(index);
  };

  const handleCommentOnChange = (e) => {
    updatedCommentText = e.target.value;
  };

  const onSaveCommentClick = async (index, commentId, e) => {
    //  validate comment here
    const isCommentValid = validateForEmpty(updatedCommentText);

    if (!isCommentValid) {
      setAlertDialogForErrorTitle("Update Comment");
      setAlertDialogForErrorContext(
        "Comment not updated! No change or empty field."
      );
      handleOpenDialogForError();
      setEditableIndex(-1);

      return;
    }

    setEditableIndex(-1);
    const data = { comment: updatedCommentText };

    fetch(
      "https://cook-with-dal-final.onrender.com/api/recipe/comment/" +
        recipeId +
        "/" +
        commentId,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    )
      .then(async (response) => (response = response.json()))
      .then(async (data) => {
        setAlertDialogForErrorTitle("Update Comment");
        setAlertDialogForErrorContext("Comment updated successfully.");
        handleOpenDialogForError();
        await updateCommentsList(true);
      });
  };

  const onDeleteCommentButtonClick = async (index, comment) => {
    handleCloseCommentsDialog();
    setOpenDialogConfirmDelete(true);
    // setDeleteCommentIndex(index);
    setDeleteCommentModel(comment);
  };

  const onDeleteCommentClick = async () => {
    fetch(
      "https://cook-with-dal-final.onrender.com/api/recipe/comment/" +
        recipeId +
        "/" +
        deleteCommentModel.id,
      { method: "DELETE" }
    )
      .then(async (response) => (response = response.json()))
      .then(async (data) => {
        if (data.success) {
          setAlertDialogForErrorTitle("Delete Comment");
          setAlertDialogForErrorContext("Comment deleted successfully.");
          // handleOpenDialogForError();
          handleCloseDialogConfirmDelete();
          await updateCommentsList(true);
        }
      });
  };

  function timeout(delay) {
    return new Promise((res) => setTimeout(res, delay));
  }

  function Item(props) {
    const { sx, ...other } = props;
    return (
      <Box
        sx={{
          p: 1,
          m: 1,
          bgcolor: (theme) =>
            theme.palette.mode === "dark" ? "#101010" : "grey.100",
          color: (theme) =>
            theme.palette.mode === "dark" ? "grey.300" : "grey.800",
          border: "1px solid",
          borderColor: (theme) =>
            theme.palette.mode === "dark" ? "grey.800" : "grey.300",
          borderRadius: 2,
          fontSize: "0.875rem",
          fontWeight: "700",
          ...sx,
        }}
        {...other}
      />
    );
  }

  return (
    <div>
      <Dialog
        open={openDialogForError}
        onClose={handleCloseDialogForError}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {alertDialogForErrorTitle}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {alertDialogForErrorContext}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialogForError} autoFocus>
            Okay
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openDialogConfirmDelete}
        onClose={handleCloseDialogConfirmDelete}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Delete?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {"Are you sure you want to delete the comment?"}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialogConfirmDelete} autoFocus>
            Cancel
          </Button>

          <Button onClick={handleConfirmDeleteYes} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Backdrop sx={{ color: "#fff", zIndex: 100 }} open={openBackdrop}>
        <CircularProgress color="inherit" />
      </Backdrop>

      <Box sx={{ display: "flex", gap: 2 }}>
        <Item hidden={showLikes}>
          {likeCounter}
          {likeState ? (
            <IconButton aria-label="likeButton" onClick={clickLikeHandler}>
              <FavoriteBorderIcon />
            </IconButton>
          ) : (
            <IconButton
              color="red"
              aria-label="likeButton"
              onClick={clickLikeHandler}
            >
              <FavoriteIcon />
            </IconButton>
          )}
        </Item>
        <Item hidden={showComments}>
          <Button
            variant="contained"
            onClick={handleOpenCommentsDialog}
            startIcon={<CommentIcon />}
          >
            Comments
          </Button>
        </Item>
      </Box>

      <Dialog open={openCommentsDialog} onClose={handleCloseCommentsDialog}>
        <DialogTitle>Comments</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Write your comments in the input box and click Add to post the
            comment.
          </DialogContentText>

          <List dense={dense}>
            {commentsList.map((comment, index) => (
              <ListItem
                secondaryAction={
                  <div>
                    {editableIndex != index ? (
                      <IconButton
                        onClick={async () => await onEditCommentClick(index)}
                        edge="end"
                        aria-label="edit"
                      >
                        <EditIcon />
                      </IconButton>
                    ) : (
                      <IconButton
                        onClick={async (e) =>
                          await onSaveCommentClick(index, comment.id, e)
                        }
                        edge="end"
                        aria-label="save"
                      >
                        <SaveAsIcon />
                      </IconButton>
                    )}
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={async () =>
                        await onDeleteCommentButtonClick(index, comment)
                      }
                    >
                      <DeleteIcon />
                    </IconButton>
                  </div>
                }
              >
                <TextField
                  className="commentsTextField"
                  defaultValue={comment.comment}
                  autoFocus
                  InputProps={{
                    readOnly: editableIndex != index,
                  }}
                  margin="dense"
                  label={
                    "created by " + comment.owner + " on " + comment.createdOn
                  }
                  type="text"
                  fullWidth
                  disabled={editableIndex != index}
                  onChange={handleCommentOnChange}
                  variant="standard"
                />
              </ListItem>
            ))}
          </List>

          <TextField
            autoFocus
            margin="dense"
            id="newCommentField"
            label="New Comment"
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseCommentsDialog}>Cancel</Button>
          <Button onClick={handleAddComment}>Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Recipe;
