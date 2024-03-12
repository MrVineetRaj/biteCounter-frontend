import React, { useRef } from 'react'
import style from '../component css/SignUp.module.css'
import { Link, Form, useNavigate, redirect } from 'react-router-dom';
import BackendWarning from './BackendWarning';
function SignUp() {
  const navigate = useNavigate()
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    const formData = new FormData(event.target); // Get form data
    const userData = {
      name: formData.get('name'),
      email: formData.get('email'),
      password: formData.get('password'),
      weight: formData.get('weight'),
      height: formData.get('height'),
      age: formData.get('age'),
      activity: formData.get('activity')
    };

    try {
      const response = await fetch('https://bitecounter-backend.onrender.com/user/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        const user = await response.json();
        if (user) {
          alert(`User with name ${user.name} is saved. Log in using Email and Password.`);
          navigate("/")
        }
      } else {
        console.error('Server responded with status', response.status);
        // Handle error
      }
    } catch (error) {
      console.error('Error signing up:', error);
      // Handle error
    }
  };

  return (
    <>
      <center className={style.bg}>
        <form method='POST' className={style.form} onSubmit={handleSubmit}>
          <BackendWarning/>
          <legend><h2>Sign Up Here !</h2></legend>


          <div className="mb-3">
            <label htmlFor="name" className="form-label"  >Name</label>
            <input type="text" className="form-control" id="name" name="name"
              placeholder="Name" />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label" >Email</label>
            <input type="email" className="form-control" id="email" name='email'
              placeholder="Email" />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label" >Password</label>
            <input type="password" className="form-control" id="password" name='password'
              placeholder="Password" />
          </div>


          <div className="row">
            <div className="col">
              <label htmlFor="weight" className="form-label">Weight</label>
              <input type="number"
                id="weight" className="form-control" placeholder="Weight" name='weight'
              />
            </div>
            <div className="col">
              <label htmlFor="height" className="form-label">Height</label>
              <input type="number"
                id="height" className="form-control" placeholder="Height" name='height' />
            </div>
            <div className="col">
              <label htmlFor="age" className="form-label">Age</label>
              <input type="number"
                id="age" className="form-control" placeholder="Age" name='age' />
            </div>
          </div>
          <div className="form-floating">
            <select className="form-select" id="floatingSelect" aria-label="Floating label select example" name='activity'>
              <option value="">-- Select Option --</option>
              <option value="low">Low</option>
              <option value="moderate">Moderate</option>
              <option value="high">High</option>

            </select>
            <label htmlFor="floatingSelect">Level of Activity</label>
          </div>
          <button type="submit" className="btn btn-warning">Sign Up</button>
          <p>Already had an account ? <span><Link to={"/"}>Login</Link></span></p>
        </form>
      </center >
    </>
  )
}

export const createUser = async () => {

  const formData = await data.request.formData();
  const userData =  Object.fromEntries(formData);
  const response = await fetch('https://bitecounter-backend.onrender.com/user/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });

  if (response.ok) {
    const user = await response.json();
    if (user) {
      alert(`User with name ${user.name} is saved\n Loggin using Email and Password `)
      navigate("/")
    }
  } else {
    console.error('Server responded with status', response.status);

  }

  return redirect("/")

}


export default SignUp
