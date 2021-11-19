import React, { useEffect, useState, useContext } from "react";
import "./post.css";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import axios from "axios";
import { postContext,isNewLiked } from "../../App";
import { AuthContext } from "../../contexts/context";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import TimeAgo from "react-timeago";
import frenchStrings from "react-timeago/lib/language-strings/en";
import buildFormatter from "react-timeago/lib/formatters/buildFormatter";
import CommentIcon from "@material-ui/icons/Comment";
import { FaRegCommentDots } from 'react-icons/fa';
import { FaShare } from 'react-icons/fa';
import { BsBookmark } from 'react-icons/bs';

import Comments from "../comments/Comments";
import { Link, useHistory } from "react-router-dom";
import { profimgContext } from "../../App";
import moment from "moment";

const Post = () => {
  const formatter = buildFormatter(frenchStrings);
  const [posts, setPosts] = useState([]);
  const { value, setValue } = useContext(postContext);
  const { isNewLiked1, setIsNewLiked } = useContext(isNewLiked);
  const { token, userId } = useContext(AuthContext);
  const [nameUser, setNameUser] = useState("");
  const [imgUser, setImgUser] = useState("");
  const { profimg, setProfimg } = useContext(profimgContext);

  const choose = (body) => {
    const arraybody = body.split(" ");

    return (
      <span>
        {arraybody.map((x) => {
          if (x.startsWith("http")) {
            return(
              <div className="photo">
              <img src={x} alt="" width="100%" />
            </div>
            ) 
          }
          return x + " ";
        })}
      </span>
    );
  };
  /*
  
  */
  const getAllPosts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/posts");
      // console.log("")
      // console.log("naif",res);
      setPosts(res.data.posts);
    } catch (error) {
      setPosts([]);
      console.log(error);
    }
  };
  useEffect(() => {
    getAllPosts();
  }, [value]);

  const deletePost = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/posts/deletepost/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      let afterDelete = posts.filter((p) => {
        return p._id !== id;
      });
      setPosts(afterDelete);
      // getAllPosts();
    } catch (error) {
      console.log(error);
    }
  };
  const Likeit = async (id) => {
    try {
      await axios
        .put(
          `http://localhost:5000/posts/${id}/like`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        //data.post.likescounter
        .then((resu) => {
          let newpost = resu.data.post;
          const afterLiking = posts.map((post) => {
            return post._id === id ? newpost : post;
          });
          setPosts(afterLiking);
          setIsNewLiked(prev=>!prev)
        });

      //  getAllPosts();
    } catch (error) {
      console.log(error);
    }
  };

  // const getNameInPost = async () => {
  //   try {
  //     const res = await axios.get(`http://localhost:5000/users/${userId}`, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  //     console.log(res.data.posts.firstName);
  //     setNameUser(res.data.posts.firstName);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // useEffect(() => {
  //   getNameInPost();
  // }, []);

  return (
    <>
      <div className="feeds">
      {posts &&
    posts.map((p, i) => (
        <div  key={i} className="feed">
          <div className="head">
            <div className="user">
              <img src={p.user.avatar} alt="" className="profile" />

              <div className="info">
                <h4>{p.user.firstName}</h4>
                <small>{ moment(p.date).fromNow()}</small>

              </div>
            </div>
            <span className="edit">
            <HighlightOffIcon
                  onClick={() => deletePost(p._id)}
                  classNameName="deleteIcon"
                />
            </span>
          </div>

      <div className="caption" style={{padding:"20px"}}>
            <p>
            {choose(p.body)}
            </p>
          </div>
          <div className="photo">
            {/* <img src="assets/b-2.jpg" alt="" width="100%" /> */}
          </div>

          <div className="action">
            <div className="interaction">
              <span>
              <FavoriteBorderIcon onClick={() => Likeit(p._id)} />{" "}
                <small style={{marginRight:"10px"}}>
              {p.likes.length}
              </small >
              </span>
              <span>
              <Link to={`/${p._id}/comments`}>
              
                  <FaRegCommentDots style={{color:"#333",marginRight:"10px"}} />
                </Link>
              </span>
              <span>
                  <FaShare style={{color:"#333"}} />
              </span>
            </div>
            <div className="mark">
              <span>
                  <BsBookmark style={{color:"#333"}} />
              </span>
            </div>
          </div>
          
        </div>
    ))}
      </div>
    </>
  );
};

export default Post;
// {/* <div classNameName="colreverse">
//   {posts &&
//     posts.map((p, i) => (
//       <div key={i} classNameName="post">
//         <div classNameName="postdevid">
//           <div classNameName="postTop">
//             <div classNameName="postTopLeft">
//               <img classNameName="postProfileImg" src={p.user.avatar} alt="" />
//               {/* inpostname inpostimg */}
//               <span classNameName="postUsername">{p.user.firstName}</span>
//               <span classNameName="postDate">
//                 <TimeAgo date={p.date} formatter={formatter} />
//               </span>
//             </div>
//             <div classNameName="postTopRight">
//               <span classNameName="postDate">
//                 <HighlightOffIcon
//                   onClick={() => deletePost(p._id)}
//                   classNameName="deleteIcon"
//                 />
//               </span>
//             </div>
//           </div>
//           <div classNameName="postCenter">{choose(p.body)}</div>
//           <div classNameName="postBottom">
//             <div classNameName="postBottomLeft">
//               <span classNameName="postLikeIcon">
//                 <ThumbUpAltIcon onClick={() => Likeit(p._id)} />
//               </span>
//               <span classNameName="postLikeCounter">{p.likes.length} like</span>
//             </div>
//             <div classNameName="postBottomRight">
//               <span classNameName="postCommentIcom">
//                 <Link to={`/${p._id}/comments`}>
//                   <CommentIcon />
//                 </Link>
//               </span>
//             </div>
//           </div>
//         </div>
//       </div>
//     ))}
// </div>; */}
