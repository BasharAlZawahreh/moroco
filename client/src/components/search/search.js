import { React, useContext, useEffect, useState } from "react";
import { searchContext } from "../../App";
import "./search.css"
import axios from "axios";
import { AuthContext } from "../../contexts/context";
import SearchedUser from "./SearchedUser";
const Search = () => {
  const { token,userId } = useContext(AuthContext);
  const [ssValue, setssValue] = useState();
  const { sValue } = useContext(searchContext);
  // const [fname,setFname]= useContext();
  const [follow,setFollow] = useState();

  useEffect(() => {
    // console.log("eeeeee   "+e._id)
     function test() {
      setssValue(sValue);
    }
    test();
  }, [sValue]);

  console.log("token",token)





/*
 const addFollower = async()=> {  // no es6 @ farhan
  console.log("hi")
  try {
    const res = await axios.put(`http://localhost:5000/users/${f._id}/follow`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(res,"addFollower")
  } catch (error) {
    console.log(error);
  }
 }

*/


  return (

    <div className="searchContainer">
      {sValue &&
        sValue.map((e, i) => {

          return (

           <SearchedUser e={e} key={i}/>

           

          );
        })}

    </div>
    
  );
};

export default Search
