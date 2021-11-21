import axios from "axios";
import React, { useState, useContext, useEffect } from "react";
import { useParams } from "react-router";
import { AuthContext } from "../../contexts/context";
import "./Comments.css";
import TimeAgo from "react-timeago";
import frenchStrings from "react-timeago/lib/language-strings/en";
import buildFormatter from "react-timeago/lib/formatters/buildFormatter";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import Comment from "./Comment";
import { commentContext } from "../../App";
import { profimgContext } from "../../App";
import Feed from "../feed/feed";

const Comments = () => {
  const formatter = buildFormatter(frenchStrings);

  const { token, userId } = useContext(AuthContext);
  const {comment,setComment } = useContext(commentContext);
  const {profimg, setProfimg} = useContext(profimgContext);
  const [post, setpost] = useState();
  const [comments, setComments] = useState(); // For create new
  const [newComment, setnewComment] = useState();
  const { postId } = useParams();

  useEffect(() => {
    // console.log(comment,"comment")
    axios
    .get(`/posts/getpostbyid/${postId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((result) => {
      // console.log("coments", result.data.post.comments)
      setComments(result.data.post.comments);
      setpost(result.data.post);
    })
    .catch((err) => {
      setComments([]);
      console.log("err" + err);
    });
  }, []);

  const createNewComment = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post(
        `/posts/${postId}/comment`,
        { comment: newComment },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
         console.log(res.data.commentAdded," Mai test")
      setComments(prev => [...prev,res.data.commentAdded]);
      setnewComment("")
     
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="feeds">
  <div className="feed">
  <div className="head">
  <div className="user">
            <img className="profile" src={profimg} alt={profimg} />
            <div className="info">
              <h4>{post && post.user.firstName}</h4>
              <small><TimeAgo date={post && post.date} formatter={formatter} /></small>
</div>
          </div>
        </div>
        <div className="Comcaption">{post && post.body}</div>
        <hr style={{ fontSize: "20px", color: "gray", marginTop: "30px" }} />
        <form className="create-post" onSubmit={createNewComment}>
      <img src={profimg}  alt="profimg" className="profile1" />
      <input type="text"
              value={newComment}
              placeholder="Enter your comment ..."
              onChange={(e) => {
                setnewComment(e.target.value);
              }} />

      <input type="submit" value="Comment"  className="btn3" />
    </form>
        
        {comments &&
          comments.map((c) => {
            // console.log("c",c)
            // console.log("postid",postId)
            return <Comment setComments={setComments} comments={comments} key={c._id} c={c} postId={postId} />;
          })}
      </div>
    </div>
  );
};

export default Comments;
