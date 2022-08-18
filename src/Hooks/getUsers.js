import { useState } from "react";
import Profile from "../Assets/Avatars/profile.png";
const axios = require("axios");

const useGetUsers = () => {
  const [Users, setUsers] = useState([]);
  const getList = (Data) => {
    axios
      .get("http://localhost:3001/getUsers")
      .then((res) => {
        // console.log(`statusCode: ${res.status}`);
        let NewUsers = [];
        res.data.map((user) => {
          if (Data.email !== user.email) {
            const People = {
              image: Profile,
              id: user._id,
              name: user.name,
              active: true,
              isOnline: true,
            };
            NewUsers.push(People);
          }
        });
        setUsers(NewUsers);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return {
    getList,
    Users,
  };
};

export default useGetUsers;
