import React, { useContext, useState, createContext, useEffect } from "react";
import { useHistory, Route, Switch, useLocation } from "react-router-dom";
import Header from "./components/header/header";
import Search from "./components/search/search";
import SignUp from "./components/auth/signUp/Signup"
import Login from "./components/auth/login/Login";
import Post from "./components/post/post";
import Feed from "./components/feed/feed";
import LeftSideBar from "./components/leftSideBar/leftSideBar";
import RightSideBar from "./components/rightSideBar/rightSideBar";
import EditProfile from "./components/leftSideBar/editProfile/editProfile";
import Main from "./components/main/main";
import "./components/main/main.css";
import "./App.css";
import { AuthContext } from "./contexts/context";
import Album from "./components/leftSideBar/Album/Album";
import Comments from "./components/comments/Comments";
import axios from "axios";
import Followers from "./components/leftSideBar/Followers/Followers";
import Story from "./components/story/story";

export const postContext = createContext({ value: [], setValue: () => {} });
export const searchContext = createContext({});
export const profimgContext = createContext({});   // main image
export const commentContext = createContext({});
export const isNewLiked = createContext({});

const App = () => {
  let { setIsLoggedIn, isLoggedIn, saveToken ,token,userId} = useContext(AuthContext);
  const location = useLocation();
  const history = useHistory();
  const [value, setValue] = useState([]);
  const [sValue, setsValue] = useState([]);
  const [profimg, setProfimg] = useState(""); //main image
  const [comment, setComment] = useState([]);
  const [isNewLiked1,setIsNewLiked] = useState(false)
  const [nameUser1,setNameuser1] = useState("")
  // const {token ,userId} =  useContext(AuthContext);

  
   //use
                      // this function will run on page load and gets img from avatar field in the db
                                   // if the user sets another image via album profile image change function it will update 
                                    // the db field via put function THEN--->
                                    // dependency will force the function to re-run and get the new updated img from db
  useEffect(async() => {
    try {
      console.log("mai hi",userId,"",token)
      // const userid = await token.userId
      const res = await axios.get(`/users/${userId}`, {headers: {Authorization: `Bearer ${token}`,},});
        console.log("mai res",res)
      // setNameUser(res.data.posts.firstName);
      setProfimg(res.data.posts.avatar) //check to know correct . . 
      setNameuser1(res.data.posts.firstName)
    } catch (error) {
      console.log(error);
    }               
  }, [userId]);


  return (
    <>
      <div>
        {!isLoggedIn ? (
          <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={SignUp} />
            {/* <Route path="*" component={() => "404 Page Not Found"} /> */}
          </Switch>
        ) : (
          <>
            <searchContext.Provider value={{ sValue, setsValue }}>
              <commentContext.Provider value={{ comment, setComment }}>
                <profimgContext.Provider value={{ profimg, setProfimg }}>      {/*  main image  */}
                <isNewLiked.Provider value={{ isNewLiked1, setIsNewLiked }}>      {/*  main image  */}
                  <Header />
                  <div className="App">
                  <div class="container">
                    {/* <Main/> */}
                    <LeftSideBar name={nameUser1}/>
                    <div className="main">
                      <Switch>
                        <Route exact path="/search">
                          <Search />
                        </Route>
                        <Route exact path="/edit">
                          <EditProfile />
                        </Route>
                        <Route exact path="/:postId/comments">
                          <Comments />
                        </Route>
                        <Route exact path="/Album">
                          <Album />
                        </Route>
                        <Route exact path="/Followers">
                          <Followers />
                        </Route>
                        <Route exact path="/Home">
                          <postContext.Provider value={{ value, setValue }}>
                            <Story/>
                            <Feed />
                            <Post />
                          </postContext.Provider>
                        </Route>
                      </Switch>
                    </div>
                    <RightSideBar />
                    
                  </div>
                  </div>
                </isNewLiked.Provider>
                </profimgContext.Provider>
              </commentContext.Provider>
            </searchContext.Provider>
          </>
        )}
      </div>
    </>
  );
};

export default App;
