import { useContext, useEffect, useState } from "react";
import Diet from "./Diet"
import { useNavigate } from "react-router";
import { Auth } from "../store/auth-details";

import axios from 'axios'; // Import Axios for making HTTP requests

const SaveDiet = () => {

  const auth = useContext(Auth);
  const navigate = useNavigate();

  const [userDiet, setUserDiet] = useState(null); // State to store user's diet information

  const fetchUserDiet = async () => {
    try {
      const response = await axios.get('https://bitecounter-backend.onrender.com/user/diet/save', {
        headers: {
          Authorization: `Bearer ${auth.token}` // Assuming you're using JWT token for authentication
        }
      });
      setUserDiet(response.data);
    } catch (error) {
      console.error('Error fetching user diet:', error);
    }
  };

  useEffect(() => {
    fetchUserDiet(); // Call the fetch function
  }, [auth.token]);

  return (
    <center>
      <div style={{ width: "60%" ,minWidth:"280px"}}>
        <Diet dayDiet={userDiet} fetchUserDiet={fetchUserDiet} savedDiet={"save"} />
      </div>
    </center>
  );
}

export default SaveDiet;