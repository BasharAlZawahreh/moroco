import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../../contexts/context";
import axios from "axios";
import Follower from "./Follower";

const Followers = () => {
  const [followers, setFollowers] = useState([]);
  const { token, userId } = useContext(AuthContext);
  //useEffect in app which has a dependancy followers if followers change it will refire /reupdate ( cus maybe some will follow me
  //while i am using the website) then
  //useeffect in Followers component, gets followers from user res.data.posts.followers
  //put followers in the setFollowers usestate
  //in return
  // map over followers and return follower name and follower img

  useEffect(async () => {
    try {
      // const userid = await token.userId
      const res = await axios.get(`http://localhost:5000/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("followers", res.data.posts.followers);
      setFollowers(res.data.posts.followers); 
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <>
<div className="searchContainer">
    {followers.length&& followers.map((f,i)=>{
       return <Follower className="Follower" key={i} f={f}/>
    })}
    </div>
    </>
    
  );
};
export default Followers;
