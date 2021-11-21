import { React, useContext, useEffect, useState } from "react";
import { searchContext } from "../../App";

import axios from "axios";
import { AuthContext } from "../../contexts/context";

const SearchedUser = ({ e }) => {
  const { token, userId } = useContext(AuthContext);
  const [isFollower, setisFollower] = useState(false);
  const addFollower = async (id) => {
    try {
      await axios.put(
        `http://localhost:5000/users/test/${id}/follow `,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setisFollower((prev) => !prev);
      console.log("done");
    } catch (error) {
      console.log(error);
    }
  };

  const checkIsFollower = async () => {
    // /
    try {
      const result = await axios.get(
        `http://localhost:5000/users/${userId}/${e._id} `,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(result, "check is follower");
      setisFollower(result.data.success);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkIsFollower();
  }, []);

  return (
    <>
      <div className="pro">
        <div className="momo">
          <img
            style={{ width: "70px", height: "70px" }}
            className="profile"
            alt=""
            src={e.avatar}
          />
          <div className="handle">
            <h4>
              {e.firstName} {e.lastName}
            </h4>
          </div>
        </div>
        <div
          style={{ display: "flex", justifyContent: "flex-end", width: "55%" }}
        >
          <button
            onClick={() => {
              addFollower(e._id);
            }}
            className="btnF"
          >
            {!isFollower ? "Follow" : "Unfollow"}
          </button>
        </div>
      </div>
    </>
  );
};

export default SearchedUser;
