import { useContext } from "react";
import { Auth } from "../store/auth-details";
import { redirect, useNavigate } from "react-router";
const AddFood = ({ foodTime, fetchUserDiet, savedDiet, setIsFetching }) => {
  const navigate = useNavigate();
  const auth = useContext(Auth);

  const addFoodHandeler = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    const formData = new FormData(event.target); // Get form data
    const foodData = {
      foodName: formData.get("food"),
      serving_size: formData.get("serving_size"),
    };

    setIsFetching(true);
    try {
      const response = await fetch(
        `${
          import.meta.VITE_BACKEND_URL
        }/${foodTime.toLowerCase()}/${savedDiet}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.token}`, // Assuming you're using JWT token for authentication
          },
          body: JSON.stringify(foodData),
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
    setIsFetching(false);
  };

  return (
    <>
      <form className="row g-3" onSubmit={addFoodHandeler}>
        <div className="col-auto">
          <label htmlFor="inputFood" className="visually-hidden">
            Food
          </label>
          <input
            type="text"
            className="form-control"
            id="inputFood"
            placeholder="Food"
            name="food"
          />
        </div>
        <div className="col-auto">
          <label htmlFor="inputServing" className="visually-hidden">
            Serving
          </label>
          <input
            type="number"
            className="form-control"
            id="inputServing"
            placeholder="Serving"
            name="serving_size"
          />
        </div>
        <div className="col-auto">
          <button type="submit" className="btn btn-primary mb-3">
            Add Food
          </button>
        </div>
      </form>
    </>
  );
};

export default AddFood;
