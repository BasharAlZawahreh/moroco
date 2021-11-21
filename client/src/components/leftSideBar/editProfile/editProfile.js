import React,{useState,useContext, useEffect} from "react";
import './editProfile.css';
import { AuthContext } from "../../../contexts/context";
import axios from "axios";
import { storage } from "../../../Firebase/Firebase";
import { profimgContext } from "../../../App";
// import Form from "react-bootstrap/Form";
// import Col from "react-bootstrap/Col";
// import Row from "react-bootstrap/Row";
// import Button from "react-bootstrap/Button";

// import 'bootstrap/dist/css/bootstrap.min.css';




const EditProfile=()=>{
  let { userId,token } = useContext(AuthContext);
    const [lastName, setLastName] = useState('');
    const [age, setAge] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [gender, setGender] = useState('');
    const {profimg, setProfimg} = useContext(profimgContext);
    const [url, setUrl] = useState(profimg); // url that we get from firebase to send to the db
    const [backupImage, setbackupImage] = useState("")
    useEffect(()=>{
        axios.get(`/users/${userId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            }})
        .then(result=>{
            setLastName(result.data.posts.lastName)
            setAge(result.data.posts.age)
            setEmail(result.data.posts.email)
            setPassword(result.data.posts.password)
            setGender(result.data.posts.gender)
            setbackupImage(result.data.posts.avatar)
            })

        .catch(err=>console.log(err))
    },[])

    const handler2 = (e) => {
      setGender(e.target.value);
    };

    const onSave=async (e)=>{
        e.preventDefault();
        console.log("here");
       
        try {
          await axios.put(`/users/${userId}`,{
            lastName:lastName,
            age:age,
            email: email,
            password:password,
            gender:gender,
            avatar:url||backupImage,
          }, {
            headers: {
              Authorization: `Bearer ${token}`,
            }}
          ).then(resu=>{console.log("onsave",resu.data)
          setProfimg(resu.data.post.avatar) 
        })
        } catch (error) {
          console.log(error);
        }
      }

      //firebase
      const handleUpload =  (e) => {
        let image = e.target.files[0]
        console.log("image",image)
           const uploadTask =  storage.ref(`images/${image.name}`).put(image);
        uploadTask.on(
          "state_changed",
          (snapshot) => {},
          (error) => {
            console.log(error);
          },
          () => {
            storage
              .ref("images")
              .child(image.name)
              .getDownloadURL()
              .then((url) => {
                setUrl(url);
                console.log("url",url)
              });
          }
          
        );
      };



    return (
<div className="cont">
        <div className="formEdit">
            <img src="https://th.bing.com/th/id/OIP.eIqbtcobXSQQKk07fCCGpQAAAA?pid=ImgDet&w=256&h=256&rs=1"/>
            <h3>Edit Profile</h3>
        <form onSubmit={onSave}>
         <div className="container-form">
          <input type="text"  value={lastName}    placeholder={lastName}
            onChange={(e)=>setLastName(e.target.value)}/>
          <input type="text"       value={age}    placeholder={age}
          onChange={(e)=>setAge(e.target.value)}/>
          <input type="text"     value={email}      placeholder={email}
          onChange={(e)=>setEmail(e.target.value)}/>
          <select onChange={handler2}> 
          
          <option value='Choose Gender'>Choose Gender</option>
          <option hidden value={gender} >{gender}</option>
         <option value='Male'>Male</option>
         <option value='Female'>Female</option>
          </select>
          <input onChange={handleUpload}  type="file"/>
          <div>
              <button type="submit" className="signupbtn">save change</button>
            </div>
    </div>
      </form>
        </div>
      </div>
    );
  };

export default EditProfile;

