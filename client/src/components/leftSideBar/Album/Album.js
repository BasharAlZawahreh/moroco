import React,{useState,useContext, useEffect} from "react";
import "./Album.css"
import Images from "./Images";
import { AuthContext } from "../../../contexts/context";
import axios from "axios";
import { profimgContext } from "../../../App";
const Album = () => {
    const [selectedImg, setSelectedImg]= useState()
    const [album,setAlbum]= useState([])
    let { userId,token } = useContext(AuthContext);
    const {profimg, setProfimg} = useContext(profimgContext);

useEffect(()=>{
    axios.get(`/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }})
    .then(result=>{
      setAlbum(result.data.posts.album)
      console.log(result.data.posts.album)
    })
    .catch(err=>console.log(err))
},[])


const ChangeProfPhoto = async ()=>{
  console.log("ff",selectedImg)
    try {
      await axios.put(`/users/${userId}`,{
        avatar:selectedImg
       
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        }}
      ).then(results=>{console.log("batee5",results)
      setProfimg(selectedImg) 
    })
    } catch (error) {
      console.log(error);
    }
  }

    return (
      <div class="container-gallery">
                        <div class="head">
                            <h3>Gallery</h3>
                            <div class="box1">
                                <img onClick={()=> {ChangeProfPhoto()}} src={selectedImg} alt=""/>
                            </div>
                        </div>
                        <div class="imgs-con">
                          {album.map((imgurl,i)=>{
                            return <div key={i} class="box">
                                <img onClick={()=>setSelectedImg(imgurl)} src={imgurl} alt=""/>
                            </div>
                          })}
                          </div>
                    </div>

    )
}

export default Album




{/* <div className="Album">
            <div className="container">
                <div className="perant">
                
                    <div className='Child'>
                <img onClick={()=> {ChangeProfPhoto();
              
              }
                
                } src = {selectedImg} width= "400px" height="100px" alt="Selected" className="selected"/>
                </div>
                </div>
                <br/>
                <div className="imgContainer">
                    {album&&album.map((img, index)=> (
                        <img className="imgu"
                        width= "250px"
                        height="250px"
                        style={{border:selectedImg === img ? "4px solid purple" : "" }}
                        key = {index}
                        src = {img}
                        alt = "test" 
                        onClick={()=> {setSelectedImg(img) 
                        }
                        }  
                        />
                    ))}
                </div>
            </div>
        </div>  */}