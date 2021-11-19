import React, { useState, useContext, useEffect } from "react";
import "./Followers.css"
import { AuthContext } from "../../../contexts/context";
import axios from "axios";
import { purple } from "@material-ui/core/colors";

function Follower({f}) {
  const { token, userId } = useContext(AuthContext);
  const [isFollower, setisFollower] = useState(false);
// console.log("f",f)
  // /:id/follow
  const addFollower = async (id) => {
   
    try {
      
     await axios.put(`http://localhost:5000/users/test/${id}/follow `, {}, {
      headers: {
        Authorization: `Bearer ${token}`,
      }})
      setisFollower((prev) => !prev);
    } catch (error) {
      console.log(error);
    }
    
  }
 


    return (
 
      <div className="pro">
        <div className="momo">
      <img style={{width:"70px",height:"70px"}} className="profile"  alt="" src={f.avatar}/>
      <div className="handle">
          <h4>{f.firstName}</h4>
      </div>
        </div>
  <div  style={{display:"flex",justifyContent:"flex-end",width:"55%"}}>
      <button onClick={()=> {addFollower(f._id)}} className="btnF" >{!isFollower?"Unfollow":"Follow"}</button>
  </div> 
  </div>      
    )
}
export default Follower
{/* <div className="searchContainer">
      {sValue &&
        sValue.map((e, i) => {
          return (

            <div className="searchedUser" key={i}>
              <p>
                {e.firstName} {e.lastName}
              </p>
              <img height="250px" width="250px" src={e.avatar} alt=""/>
            </div>
            

          );
        })}

    </div> */}