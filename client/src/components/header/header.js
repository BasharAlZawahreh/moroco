import { React, useContext, useState } from "react";
import axios from "axios";
import { ReactComponent as Search } from "@material-design-icons/svg/filled/search.svg";
import { searchContext } from "../../App";
import { AuthContext } from "../../contexts/context";
import { useHistory } from "react-router-dom";
import { Link } from 'react-router-dom';
import { profimgContext } from "../../App";
import "./header.css";

const Header = () => {
  const history = useHistory();
  const { setsValue } = useContext(searchContext);
  const { token,logout } = useContext(AuthContext);
  const {profimg} = useContext(profimgContext)
  const [data, setData] = useState("");
  const [error, setError] = useState("");
  // useState for userName
  // useState for userImg

//get axios mn db
// res..blablabla 
// setImg(res....avatar)




  const searchSend = (e) => {
     e.preventDefault();
    axios
      .post(
        `/users/search?name=${data}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((result) => {
		  console.log("frontend",result.data.users)
        console.log(result.data.users.length);
        console.log("123test",result.data.users);
        setsValue(result.data.users);
        // send query via axios to backend
      })
      .then(() => {
        history.push("/search");
      })
      .catch((err) => {
        if (err.message == "Name doesn't exist") {
          // backend error
          setError("No user found with this name"); //frontend error display
        }
        if (err.message == `Server Error`) {
          // backend error
          setError(`Server Error`); //frontend error display
        }
        /*
            pass result into main.js via context? 
            render them in /search  how :D ??????????
            result.img
            result.usename               //i know i am not useing correct names in db just thinking
            */
      });
  };



  
  //------------------------------------------------------------------------------------------------
  return (
    <nav>
<div className="container">
        <h2 classNameName="logo">
        <Link style={{textDecoration:"none"}} to="/Home">Moroco</Link>
        </h2>
            <div className="search-box">
              
            <Search style={{marginRight:"10px"}} classNameName="searchIcon" />
            <form onSubmit={searchSend}>
             <input
                  onChange={(e) => {
                    setData(e.target.value);
                  }}
            type="search" placeholder="Search" />
            </form>
            </div>
            <div className="btn">
                <button onClick={logout}> LOGOUT</button>
                <img src={profimg} alt="profimg" className="profile"/>
            </div>
        </div>
    </nav>
  );
};
export default Header;
