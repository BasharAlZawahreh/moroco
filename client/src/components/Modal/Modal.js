import React, { useEffect,useState,useContext } from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";
import axios from "axios";
import { AuthContext } from "../../contexts/context";
import { postContext } from "../../App";
import { profimgContext } from "../../App";
import "./Modal.css";

const Modal = props => {
    const [postBody, setPostBody] = useState([]);
    const { validateToken, token, isLoggedIn, userId } = useContext(AuthContext);
    const [nameUserFeed, setNameUserFeed] = useState("");
    const { value, setValue } = useContext(postContext);
    const { profimg, setProfimg } = useContext(profimgContext);
  
    const Addpost = (e) => {
        e.preventDefault()
      axios
        .post(
          "/posts",
          { body: postBody },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((result) => setValue([...value, result]));
      setPostBody("");
    };
    const nameUsersFeed = async () => {
      try {
        const res = await axios.get(`/users/${userId}`, {
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
  const closeOnEscapeKeyDown = e => {
    if ((e.charCode || e.keyCode) === 27) {
      props.onClose();
    }
  };

  useEffect(() => {
    document.body.addEventListener("keydown", closeOnEscapeKeyDown);
    return function cleanup() {
      document.body.removeEventListener("keydown", closeOnEscapeKeyDown);
    };
  }, []);

  return ReactDOM.createPortal(
    <CSSTransition
      in={props.show}
      unmountOnExit
      timeout={{ enter: 0, exit: 300 }}
    >
<div className="modal" onClick={props.onClose}>
<div className="modal-content" onClick={e => e.stopPropagation()}>
<div class="container2">
      <div class="wrapper">
        <section class="post">
          <header>Create Post</header>
          <form onSubmit={Addpost}>
            <div class="content">
              <img src={profimg} alt="logo"/>
              <div class="details">
                <p>{ nameUserFeed} </p>
              </div>
            </div>
            <textarea placeholder={`What's on your mind, ${ nameUserFeed} ?`}
                          value={postBody}
                          onChange={(e) => setPostBody(e.target.value)}
            spellcheck="false"></textarea>
            <button  type="submit">Post</button>
          </form>
        </section>
      </div>
    </div>
</div>
</div>
    </CSSTransition>,
    document.getElementById("root")
  );
};

export default Modal;
