import { useState } from "react";
import "./Comment.css";

import "bootstrap/dist/css/bootstrap.css";
import Row from "react-bootstrap/Row";
import { Col } from "react-bootstrap";

/* Author : Anuj Dawar*/

function Comment(props) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [commentText, setCommentText] = useState(props.comment);

  const editComment = () => {
    console.log("edit Button called for comment");
    setIsEditMode(true);
  };

  const deleteComment = () => {
    console.log("delete button called for comment with id", props.itemId);
    props.deleteCommentHandler(props.itemId);
  };

  const updateCommentTextHandler = (e) => {
    console.log("updated comment " + e.target.value);
    setCommentText(e.target.value);
  };

  const updateComment = () => {
    props.updateCommentHandler(commentText, props.itemId);
    setIsEditMode(false);
  };

  return (
    <Row>
      <Col md={9}>
        {isEditMode ? (
          <input
            type="text"
            onChange={updateCommentTextHandler}
            defaultValue={props.comment}
            className="comment-section-input-comment"
          />
        ) : (
          <div>
            <h3 className="comment-non-editable-text">{props.comment}</h3>
            <hr />
          </div>
        )}
      </Col>
      <Col md={3}>
        <img src="save.png" onClick={updateComment} />
        <img src="edit.png" onClick={editComment} />
        <img src="delete.png" onClick={deleteComment} />
      </Col>
    </Row>
  );
}

export default Comment;
