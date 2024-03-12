import React, { useContext, useState } from "react"; // Import useState
import style from "../component css/Header.module.css";
import { Auth } from "../store/auth-details";
import Nav from "./Nav";
import { useNavigate } from "react-router";
import { GiHamburgerMenu } from "react-icons/gi";

function Header() {
  const navigate = useNavigate();
  const [key, setKey] = useState(0); // Initialize key state
  const [showNav,setShowNav] = useState(false);

  const auth = useContext(Auth);

  // Function to handle logout
  const handleLogout = async () => {
    try {
      const response = await fetch("https://bitecounter-backend.onrender.com/user/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.token}`, // Assuming you have an access token
        },
      });
      if (response.ok) {
        // Logout successful, clear local storage or state, redirect, etc.
        auth.token = "";
        alert("Logout successful");
        navigate("/");
      } else {
        // Handle error
        console.error("Logout failed:", response.status);
      }
      setKey((prevKey) => prevKey + 1);
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const handleNav = ()=>{
    setShowNav(!showNav);
  }

  return (
    <>
      <div className={style.header} key={key}>
        {/* Use key prop */}
        <h3>biteCounter</h3>
        { auth.token &&  <GiHamburgerMenu onClick={handleNav}/>}
        {showNav && <Nav handleLogout={handleLogout} />}
      </div>
    </>
  );
}

export default Header;


