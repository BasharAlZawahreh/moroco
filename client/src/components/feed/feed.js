
import React, {  useState ,useContext, useEffect} from 'react';
import './feed.css';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import axios from 'axios';
import { AuthContext } from '../../contexts/context';
import { postContext } from '../../App';
import { profimgContext } from '../../App';
import moment from 'moment';

const Feed = () => {
   
    const [postBody,setPostBody]=useState([]);
    const { validateToken, token, isLoggedIn , userId } = useContext(AuthContext);
    const [nameUserFeed, setNameUserFeed] = useState("");
    const {value,setValue}=useContext(postContext);
    const {profimg, setProfimg} = useContext(profimgContext);
    let date1 = new Date (Date.now())
    date1= moment(date1).format('lll'); 
    
        const Addpost=(e)=>{
          e.preventDefault()
            console.log(date1,"date1")
            axios.post("http://localhost:5000/posts",{body:postBody,date:date1},{
            headers: {
              Authorization: `Bearer ${token}`,
            }}).then(result=>setValue([...value,result]))
            setPostBody('')
          }

  const nameUsersFeed = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res.data.posts.firstName);
      setNameUserFeed(res.data.posts.firstName);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    nameUsersFeed();
  }, []);
  return (
    <form className="create-post" onSubmit={Addpost}>
      <img src={profimg}  alt="profimg" className="profile1" />
      <input type="text"
              value={postBody}
              onChange={(e) => setPostBody(e.target.value)}
      placeholder={`What's on your mind ${ nameUserFeed} ? `} />

      <input type="submit" value="Post"  className="btn3" />
    </form>
  );
};
export default Feed;
