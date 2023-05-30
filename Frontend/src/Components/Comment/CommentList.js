import { useState } from "react";
import Comment from "./Comment";
import "./Comment.css";
import "bootstrap/dist/css/bootstrap.css";
import Row from "react-bootstrap/Row";
import { Col } from "react-bootstrap";

/* Author : Anuj Dawar*/

function CommentList(props) {
  const [comment, setComment] = useState("");

  const addCommentHandler = (e) => {
    console.log("Add comment button clicked");
    console.log("size: " + props.commentList.length);
    props.onCommentListUpdate(comment);
    setComment("");
    document.getElementById("addCommentInputBox").value = "";
  };

  const updateCommentListHandler = (e) => {
    console.log(e.target.value);
    setComment(e.target.value);
  };

  const deleteComment = (index) => {
    console.log("From commentList. Index received = " + index);
    props.deleteCommentHandler(index);
  };

  const updateCommentHandler = (updatedComment, index) => {
    props.updateCommentHandler(updatedComment, index);
  };

  return (
    <Col md={12}>
      <div className="comments-section-main">
        <Row className="comment-list-section-header">
          <button
            onClick={props.closeCommentsSection}
            className="comment-section-close-button"
          >
            X
          </button>
        </Row>
        <hr />
        <br />
        <div>
          {props.commentList.length > 0 ? (
            props.commentList.map((comment, index) => (
              <Comment
                comment={comment}
                value={comment}
                setComment={setComment}
                deleteCommentHandler={deleteComment}
                itemId={index}
                updateCommentHandler={updateCommentHandler}
              />
            ))
          ) : (
            <h2 className="comments-line-no-comments-text">No comments yet.</h2>
          )}
        </div>
        <br />
        <br />
        <Row>
          <Col md={9}>
            <input
              type="text"
              id="addCommentInputBox"
              onChange={updateCommentListHandler}
              placeholder="Enter your comments here"
              className="comment-section-input-comment"
            />
          </Col>

          <Col md={3}>
            <button
              id="addCommentButtonId"
              type="submit"
              className="comment-section-add-button"
              onClick={addCommentHandler}
            >
              Add Comment
            </button>
          </Col>
        </Row>

        <hr />
      </div>
    </Col>
  );
}

export default CommentList;
