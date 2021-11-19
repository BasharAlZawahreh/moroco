import React, { useEffect, useState,useContext } from "react";
import "./rightSideBar.css";
import axios from "axios";
import Trending from "./trending";
import { profimgContext, isNewLiked } from "../../App";
const RightSideBar = () => {
  const [trends, setTrends] = useState([])
  const { isNewLiked1 } = useContext(isNewLiked);
    useEffect(() => {
      axios.get("http://localhost:5000/trends").then((res) => {
        // console.log("res mraish", res)
        res.data.trends.sort((a,b) => (a.post.likesCounter < b.post.likesCounter) ? 1 : ((b.post.likesCounter < a.post.likesCounter) ? -1 : 0))
        setTrends(res.data.trends);
      }).catch((err)=>{
        console.log(err);
      });
    },[isNewLiked1]);
    
  return (
    <div class="right">
          <div className="trindPost">
      <h4 class="fri-name">
        Trending Posts{" "}
        <span>
          <img className="trindingIcon" src="/assets/popularity.png" />
        </span>
      </h4>
     
     
      { 
        
        trends.length && trends.map((t,i)=>{
          return <Trending key={i} t={t}/>
        })
      }
    </div>
    </div>
  );
};

export default RightSideBar;
