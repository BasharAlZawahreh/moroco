import React, { useState, useContext, useEffect } from "react";
import "./leftSideBar.css";
import axios from "axios";
import { Link } from "react-router-dom";
import RssFeedIcon from "@material-ui/icons/RssFeed";
import PhotoAlbumIcon from "@material-ui/icons/PhotoAlbum";
import PeopleIcon from "@material-ui/icons/People";
import EditIcon from "@material-ui/icons/Edit";
import { AuthContext } from "../../contexts/context";
import { profimgContext, isNewLiked } from "../../App";
import Modal  from "../Modal/Modal";
const LeftSideBar = ({name}) => {
  const { token, userId } = useContext(AuthContext);

  const [nameUser, setNameUser] = useState("");

  const { profimg } = useContext(profimgContext);
  const [show, setShow] = useState(false);
  //  const [profimg, setProfimg] = useState(profimgContext); // use what is being sent from app context
// console.log(object)
  const getNameUser2 = async () => {
    try {
      await axios.get(`http://localhost:5000/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((res)=>{
console.log("fname",res.data)
        setNameUser(res.data.posts.firstName);
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getNameUser2();
  }, []);

  return (
    <div className="left">
        <div className="pro">
        <img src={profimg} alt="profimg"  className="profile" />
      
        <div className="handle">
            <h4>{nameUser || name}</h4>
            {/* <p className="text">
                @dai
            </p> */}
        </div>
    </div>
    <div className="side-bar">
        <Link to="/Home" className="menue-item">
            <span> <RssFeedIcon /></span><h3>Home</h3>
        </Link>
        <Link to="/edit" className="menue-item">
            <span> <EditIcon /> </span><h3>Edit</h3>
        </Link>
        <Link className="menue-item"  to="/Album">
            <span><PhotoAlbumIcon /> </span><h3>Album</h3>
        </Link>
        <Link className="menue-item" to="/Followers">
            <span><PeopleIcon /> </span><h3>Followers</h3>
        </Link>
        {/* <Link className="menue-item">
            <span> </span><h3>Settings</h3>
        <Link className="linkLeftSideBar" to="/Followers">
          <li>
            <PeopleIcon /> Followees
          </li>
        </Link>
        <Link className="menue-item">
            <span> </span><h3>Settings</h3>
        </Link> */}
        <div className="btn2">
            <button onClick={() => setShow(true)}> Create Post</button>
            <Modal title="My Modal" onClose={() => setShow(false)} show={show}>
        <p>This is modal body</p>
      </Modal>
        </div>  
       
    </div>
    
    </div>
      );
};
export default LeftSideBar;
