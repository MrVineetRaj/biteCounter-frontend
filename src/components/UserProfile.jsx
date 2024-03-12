import { useContext, useState, useEffect } from 'react';
import { Auth } from '../store/auth-details';

import style from '../component css/UserProfile.module.css'
import { useNavigate } from 'react-router';

const UserProfile = () => {
  const navigate = useNavigate()

  const { user, token } = useContext(Auth)
  const [showUpdateProfileForm, setUpdateProfileForm] = useState(false);


  const [updatedUser, setUpdatedUser] = useState({
    name: '',
    email: '',
    weight: '',
    height: '',
    age: '',
    activity: ''
  });


  const [isEditing, setIsEditing] = useState(false);
  const toggleUpdateProfile = () => {
    setUpdateProfileForm(!showUpdateProfileForm);
    setIsEditing(true);
  };

  // Fetch user data from API
  useEffect(() => {
    setUpdatedUser(user);
  }, []);

  const handleSave = async (event) => {
    event.preventDefault();
    let conf = confirm("Yoy are going to update your profile\nare you sure ?")
    // Save the updated user data here
    if (conf) {
      try {
        const response = await fetch('https://bitecounter-backend.onrender.com/user/update', {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify(updatedUser),
        });

        if (response.ok) {
          const updatedUser = await response.json(); // Parse JSON only for successful response
          if (updatedUser) {
            alert(`User with name ${updatedUser.name} is updated now !`);
          }
        } else {
          // Handle error response
          const errorMessage = await response.text(); // Get error message or HTML content
          console.error('Server responded with status', response.status, errorMessage);
          // Handle error
        }
      } catch (error) {
        console.error('Error updating :', error);
        // Handle error
      }
      // Then set isEditing back to false
      toggleUpdateProfile()

      if (!user) return 'Loading...';

      
    alert("To See Updated Result Login again !")

    }
    else{
      alert("Ok ! we will not update your profile")
    }
  };

  return (
    <div>


      <div className={style.userProfile}>
        <p>Your Name : {user.name}</p>
        <p>Your Email : {user.email}</p>
        <p>Your Age : {user.age} years</p>
        <p>Your Weight : {user.weight} kg</p>
        <p>Your Height : {user.height} cm</p>
        <p>Your Activity : {user.activity} level of activity</p>


        <button className="badge text-bg-warning" onClick={toggleUpdateProfile}>Update Profile</button>
        {showUpdateProfileForm && isEditing && (
          <>
            <form method='POST' className={style.form} onSubmit={handleSave}>
              <legend><h2>Update Your Profile Here !</h2></legend>

              <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input type="text" className="form-control" id="name" name="name"
                  placeholder="Name" value={updatedUser.name} onChange={e => setUpdatedUser({ ...updatedUser, name: e.target.value })} />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input type="email" className="form-control" id="email" name='email'
                  placeholder="Email" value={updatedUser.email} onChange={e => setUpdatedUser({ ...updatedUser, email: e.target.value })} />
              </div>

              <div className="row">
                <div className="col">
                  <label htmlFor="weight" className="form-label">Weight</label>
                  <input type="number" id="weight" className="form-control" placeholder="Weight" name='weight'
                    value={updatedUser.weight} onChange={e => setUpdatedUser({ ...updatedUser, weight: e.target.value })} />
                </div>
                <div className="col">
                  <label htmlFor="height" className="form-label">Height</label>
                  <input type="number" id="height" className="form-control" placeholder="Height" name='height'
                    value={updatedUser.height} onChange={e => setUpdatedUser({ ...updatedUser, height: e.target.value })} />
                </div>
                <div className="col">
                  <label htmlFor="age" className="form-label">Age</label>
                  <input type="number" id="age" className="form-control" placeholder="Age" name='age'
                    value={updatedUser.age} onChange={e => setUpdatedUser({ ...updatedUser, age: e.target.value })} />
                </div>
              </div>
              <div className="form-floating">
                <select className="form-select" id="floatingSelect" aria-label="Floating label select example" name='activity'
                  value={updatedUser.activity} onChange={e => setUpdatedUser({ ...updatedUser, activity: e.target.value })}>
                  <option value="">-- Select Option --</option>
                  <option value="low">Low</option>
                  <option value="moderate">Moderate</option>
                  <option value="high">High</option>
                </select>
                <label htmlFor="floatingSelect">Level of Activity</label>
              </div>
              <button type="submit" className="btn btn-primary">Update</button>
            </form>
          </>
        )}
      </div>

    </div>
  );
}

export default UserProfile