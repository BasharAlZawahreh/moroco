import React, { useState, useContext } from "react";
import axios from "axios";
import "./Comments.css";
import TimeAgo from "react-timeago";
import frenchStrings from "react-timeago/lib/language-strings/en";
import buildFormatter from "react-timeago/lib/formatters/buildFormatter";
import { AuthContext } from "../../contexts/context";
import { commentContext } from "../../App";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import EditIcon from "@material-ui/icons/Edit";

const Comment = ({ c, postId, setComments, comments }) => {
  const formatter = buildFormatter(frenchStrings);
  const { token, userId } = useContext(AuthContext);
  const [NewBody, setNewBody] = useState(c.comment); //For update
  const {setComment } = useContext(commentContext);
   const isAuthorized =  c.commenter._id === userId;

  const updateComment = async (id) => {
    try {
      const res = await axios.put(
        `http://localhost:5000/posts/${id}/comment/`,
        { body: NewBody },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(res.data.comment);
      setComment(res.data.comment)

    } catch (error) {
      console.log(error);
    }
  };

  const deleteComment = async (id) => {
    console.log("comment id",id)
    console.log("post",postId)
    try {
      const res = await axios.delete(
        `http://localhost:5000/posts/${postId}/comment/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
        let filteredComments = comments.filter((c)=>{
          return c._id !== id
        })
        setComments(filteredComments)
      setComment(res.data)

      

    } catch (error) {
      console.log(error);
    }
  };
      // <div className="feeds">
      //   <div className="feed">
      //   <div className="head">
      //       <div className="user">
      //         <img className="profile"  src={c.commenter.avatar} alt="" />
      //         <div className="info">

      //         </div>
      //       </div>
  if (isAuthorized) {
    return (
      <div className="feeds">
        <div className="feed">
        <div className="head">
            <div className="user">
              <img className="profile"  src={c.commenter.avatar} alt="" />
              <div className="info">
              <h4>{c.commenter.firstName}</h4>
              <small>
                <TimeAgo date={c.date} formatter={formatter} />
              </small>
              </div>
            </div>
            <div className="postTopRight">
            <HighlightOffIcon className="deleteIconn"
                onClick={() => {
                  // console.log("hololooolo",c._id)
                  deleteComment(c._id);
                }}
              
                Delete
              />

              <EditIcon
              id="editIconn"
                onClick={() => {
                  updateComment(c._id);
                }}
              
                Update
              />
            </div>
          </div>
          <div className="postCenter">
            <input
              type="text"
              onChange={(e) => {
                setNewBody(e.target.value);
              }}
              style={{ background: "none", border: "none" }}
              value={NewBody}
            />
          </div>
        </div>
        <hr style={{ fontSize: "20px", color: "gray", marginTop: "30px" }} />
      </div>
    );
  }

  return (
    <div className="feeds">
    <div className="feed">
    <div className="head">
        <div className="user">
          <img className="profile"  src={c.commenter.avatar} alt="" />
          <div className="info">
          <h4>{c.commenter.firstName}</h4>
          <small>
            <TimeAgo date={c.date} formatter={formatter} />
          </small>
          </div>
        </div>
          <div className="postTopRight"></div>
        </div>
        <div className="Comcaption">{c.comment}</div>
      </div>
      <hr style={{ fontSize: "20px", color: "gray", marginTop: "30px" }} />
    </div>
  );
};

export default Comment;
