import { MdSaveAlt } from "react-icons/md";
import { CiSaveUp2 } from "react-icons/ci";

import style from "../component css/Home.module.css";
import Diet from "./Diet";
import HomePageControll from "./HomePageControll";

import { Auth } from "../store/auth-details";
import { Diet as DietContext } from "../store/diet-details";
import { useContext, useEffect, useState } from "react";
import axios from "axios"; // Import Axios for making HTTP requests
import { useNavigate } from "react-router";

const Home = () => {
  const auth = useContext(Auth);
  const navigate = useNavigate();

  const [userDiet, setUserDiet] = useState(null); // State to store user's diet information

  const fetchUserDiet = async () => {
    try {
      const response = await axios.get(
        "https://bitecounter-backend.onrender.com/user/diet",
        {
          headers: {
            Authorization: `Bearer ${auth.token}`, // Assuming you're using JWT token for authentication
          },
        }
      );
      setUserDiet(response.data);
    } catch (error) {
      console.error("Error fetching user diet:", error);
    }
  };

  useEffect(() => {
    fetchUserDiet(); // Call the fetch function
  }, [auth.token]);
  const addFood = async (foodTime, food) => {
    try {
      const response = await fetch(
        `${import.meta.VITE_BACKEND_URL}/${foodTime.toLowerCase()}/added`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.token}`, // Assuming you're using JWT token for authentication
          },
          body: JSON.stringify(food),
        }
      );

      if (response.ok) {
        const food = await response.json();

        await fetchUserDiet();
      } else {
        console.error("Server responded with status", response.status);
        // Handle error
      }
    } catch (error) {
      console.error("Error adding food:", error);
      // Handle error
    }
  };

  const handleSavedUse = async () => {
    try {
      const response = await fetch(
        `${import.meta.VITE_BACKEND_URL}/user/diet/save`,
        {
          method: "get",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.token}`, // Assuming you're using JWT token for authentication
          },
        }
      );
      const diet = await response.json();
      setTimeout(() => {
        diet.Breakfast.forEach((food) => {
          addFood("breakfast", food);
        });
        diet.Lunch.forEach((food) => {
          addFood("lunch", food);
        });
        diet.Dinner.forEach((food) => {
          addFood("dinner", food);
        });
      }, 1000);

      await fetchUserDiet();
    } catch (error) {
      console.error("Error fetching user diet:", error);
    }
  };

  const handleSavedSave = () => {
    navigate("/home/save-diet");
  };

  const weight = Number(auth.user.weight);
  const height = Number(auth.user.height) / 100;

  const BMI = (weight / (height * height)).toFixed(2);

  const diet = ["Breakfast", "Lunch", "Dinner"];

  let name;
  if (auth.user.name) {
    name = auth.user.name;
  } else {
    name = "";
  }
  return (
    <center>
      <div className={`${style.container}`}>
        <div className="container text-center ">
          <div className="row">
            <h1>Welcome Back ! </h1>
            <h2> Hope You are doing Great {auth.user.name}...</h2>
          </div>
        </div>
        <hr />

        <div className={`${style.bmiDetails}container text-center`}>
          <div className="row">
            <div className="col">
              <span type="button" className="btn btn-primary">
                Your BMI : {BMI}
              </span>
            </div>
            <div className="col">
              {BMI > 18.4 && BMI <= 24.3 ? (
                <span type="button" className="btn btn-success">
                  You BMI is Perfect
                </span>
              ) : BMI < 18.4 ? (
                <span type="button" className="btn btn-warning">
                  You are Underweight
                </span>
              ) : (
                <span type="button" className="btn btn-warning">
                  Your are overweight
                </span>
              )}
            </div>
          </div>
        </div>
        <div
          className={`${style.saveDiet} container text-center`}
          style={{ margin: "10px 0px 0px 0px" }}
        >
          <div className="row">
            {diet.map((item, index) => {
              return (
                <div className="col" key={index}>
                  <span
                    key={item}
                    type="button"
                    className="btn btn-info"
                    style={{
                      fontWeight: "Bold",
                      color: "white",
                      margin: "10px 0",
                    }}
                  >
                    <h3>Save {item}</h3>

                    <div className="row">
                      <div className={`${style.colm} col`}>
                        <button
                          type="button"
                          className={`${style.btnn} btn btn-success`}
                          onClick={handleSavedUse}
                        >
                          Use___
                          <MdSaveAlt />
                        </button>
                      </div>
                      <div className={`${style.colm} col`}>
                        <button
                          type="button"
                          className={`${style.btnn} btn btn-warning`}
                          onClick={handleSavedSave}
                        >
                          Save__
                          <CiSaveUp2 />
                        </button>
                      </div>
                    </div>
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <Diet
          dayDiet={userDiet}
          fetchUserDiet={fetchUserDiet}
          savedDiet={"onetime"}
        />
      </div>
    </center>
  );
};

export default Home;
