import React, { useContext, useState } from 'react';
import { IoMdAdd } from "react-icons/io";
import style from '../component css/Home.module.css'
import Table, { TableCalorie } from "./Table";
import { Outlet, useNavigate } from 'react-router';
import AddFood from './addFood';
import { Auth } from '../store/auth-details';
// import { authenticate } from '../assets/authenticate'
const Diet = ({ dayDiet, fetchUserDiet, savedDiet }) => {

  const navigate = useNavigate();
  const auth = useContext(Auth)
  const [isFetchingBreakfast, setIsFetchingBreakfast] = useState(false);
  const [isFetchingLunch, setIsFetchingLunch] = useState(false);
  const [isFetchingDinner, setIsFetchingDinner] = useState(false);

  const [showBreakfastForm, setShowBreakfastForm] = useState(false);
  const [showLunchForm, setShowLunchForm] = useState(false);
  const [showDinnerForm, setShowDinnerForm] = useState(false);

  const toggleBreakfastForm = () => {
    setShowBreakfastForm(!showBreakfastForm);
  };

  const toggleLunchForm = () => {
    setShowLunchForm(!showLunchForm);
  };

  const toggleDinnerForm = () => {
    setShowDinnerForm(!showDinnerForm);
  };

  if (!dayDiet) {
    return (
      <div className='auth'>
        <h2>Please Authenticate...To Continue</h2>
        <img src="/src/assets/Authenticate.png" alt="Please Authenticate...To Continue" width={"50%"} />
      </div>
    ); // Render nothing if diet data is not available yet
  }

  const { Breakfast, Lunch, Dinner } = dayDiet;


  return (
    <div className={style.dietContainer}>
      <h1>Diet</h1>
      <hr />
      <Table dayDiet={dayDiet} />
      <h3>Breakfast <button className="badge text-bg-success" onClick={toggleBreakfastForm}><IoMdAdd /> </button></h3>
      {showBreakfastForm && !isFetchingBreakfast && (
        <>
          <AddFood foodTime="Breakfast" fetchUserDiet={fetchUserDiet} savedDiet={savedDiet} setIsFetching={setIsFetchingBreakfast} />
        </>
      )}
      {isFetchingBreakfast && (
        <>
          <h4 style={{textAlign:"center"}}>Adding... <div className="spinner-border text-info" role="status">
            <span className="visually-hidden">Loading...</span>
          </div></h4>
        </>
      )}
      <div>
        {Breakfast && Breakfast.length === 0 && <h4>Food is not Added for Breakfast Yet</h4>}
        {Breakfast && Breakfast.length !== 0 && <TableCalorie foodTime={Breakfast} time={"Breakfast"} savedDiet={savedDiet} fetchUserDiet={fetchUserDiet} />}
      </div>

      <hr />

      <h3>Lunch <button className="badge text-bg-success" onClick={toggleLunchForm}><IoMdAdd /> </button></h3>
      {showLunchForm && !isFetchingLunch && (
        <>
          <AddFood foodTime="Lunch" fetchUserDiet={fetchUserDiet} savedDiet={savedDiet} setIsFetching={setIsFetchingLunch} />
        </>
      )}
      {isFetchingLunch && (
        <>
          <h4 style={{textAlign:"center"}}>Adding... <div className="spinner-border text-info" role="status">
            <span className="visually-hidden">Loading...</span>
          </div></h4>
        </>
      )}
      <div>
        {Lunch && Lunch.length === 0 && <h4>Food is not Added for Lunch Yet</h4>}
        {Lunch && Lunch.length !== 0 && <TableCalorie foodTime={Lunch} time={"Lunch"} savedDiet={savedDiet} fetchUserDiet={fetchUserDiet} />}
      </div>

      <hr />

      <h3>Dinner <button className="badge text-bg-success" onClick={toggleDinnerForm}><IoMdAdd /> </button></h3>
      {showDinnerForm && !isFetchingDinner && (
        <>
          <AddFood foodTime="Dinner" fetchUserDiet={fetchUserDiet} savedDiet={savedDiet} setIsFetching={setIsFetchingDinner} />
        </>
      )}
      {isFetchingDinner && (
        <>
          <h4 style={{textAlign:"center"}}>Adding... <div className="spinner-border text-info" role="status">
            <span className="visually-hidden">Loading...</span>
          </div></h4>
        </>
      )}
      <div>
        {Dinner && Dinner.length === 0 && <h4>Food is not Added for Dinner Yet</h4>}
        {Dinner && Dinner.length !== 0 && <TableCalorie foodTime={Dinner} time={"Dinner"} savedDiet={savedDiet} fetchUserDiet={fetchUserDiet} />}
      </div>
    </div>
  );
}

export default Diet;
