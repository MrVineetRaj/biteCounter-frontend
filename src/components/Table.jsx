import React, { useContext } from "react";
import style from "../component css/Table.module.css";
import { MdDelete } from "react-icons/md";
import { Auth } from "../store/auth-details";

export const TableCalorie = ({ foodTime, time, savedDiet, fetchUserDiet }) => {
  const auth = useContext(Auth);
  time = time.toLowerCase();
  const deleteFood = async (food) => {
    try {
      const response = await fetch(
        `${import.meta.VITE_BACKEND_URL}/${time}/food/${savedDiet}/delete`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.token}`, // Assuming you're using JWT token for authentication
          },
          body: JSON.stringify(food),
        }
      );
      if (response.ok) {
        await fetchUserDiet();
      } else {
        console.error("Server responded with status", response.status);
      }
    } catch (error) {
      console.error("Error Deleting food:", error);
    }
  };
  return (
    <>
      <table className={style.Table}>
        <thead>
          <tr>
            <th>Food</th>
            <th>Servings</th>
            <th>Calorie</th>
          </tr>
        </thead>
        <tbody>
          {foodTime.map((food, index) => (
            <>
              <tr key={index}>
                <td>{food.name}</td>
                <td>{food.serving_size_g} gm</td>
                <td>{food.calories}</td>
              </tr>
              <tr>
                <td colSpan={3}>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => deleteFood(food)}
                  >
                    Delete <MdDelete />
                  </button>
                </td>
              </tr>
            </>
          ))}
        </tbody>
      </table>
    </>
  );
};

const Table = ({ dayDiet }) => {
  const { Breakfast, Lunch, Dinner } = dayDiet;
  let Neutrient = {
    calories: 0,
    serving_size_g: 0,
    fat_total_g: 0,
    protein_g: 0,
    sodium_mg: 0,
    potassium_mg: 0,
    cholesterol_mg: 0,
    carbohydrates_total_g: 0,
    fiber_g: 0,
    sugar_g: 0,
  };
  Breakfast.forEach((food) => {
    Neutrient.calories += food.calories;
    Neutrient.serving_size_g += food.serving_size_g;
    Neutrient.fat_total_g += food.fat_total_g;
    Neutrient.protein_g += food.protein_g;
    Neutrient.sodium_mg += food.sodium_mg;
    Neutrient.potassium_mg += food.potassium_mg;
    Neutrient.cholesterol_mg += food.cholesterol_mg;
    Neutrient.carbohydrates_total_g += food.carbohydrates_total_g;
    Neutrient.fiber_g += food.fiber_g;
    Neutrient.sugar_g += food.sugar_g;
  });
  Lunch.forEach((food) => {
    Neutrient.calories += food.calories;
    Neutrient.serving_size_g += food.serving_size_g;
    Neutrient.fat_total_g += food.fat_total_g;
    Neutrient.protein_g += food.protein_g;
    Neutrient.sodium_mg += food.sodium_mg;
    Neutrient.potassium_mg += food.potassium_mg;
    Neutrient.cholesterol_mg += food.cholesterol_mg;
    Neutrient.carbohydrates_total_g += food.carbohydrates_total_g;
    Neutrient.fiber_g += food.fiber_g;
    Neutrient.sugar_g += food.sugar_g;
  });
  Dinner.forEach((food) => {
    Neutrient.calories += food.calories;
    Neutrient.serving_size_g += food.serving_size_g;
    Neutrient.fat_total_g += food.fat_total_g;
    Neutrient.protein_g += food.protein_g;
    Neutrient.sodium_mg += food.sodium_mg;
    Neutrient.potassium_mg += food.potassium_mg;
    Neutrient.cholesterol_mg += food.cholesterol_mg;
    Neutrient.carbohydrates_total_g += food.carbohydrates_total_g;
    Neutrient.fiber_g += food.fiber_g;
    Neutrient.sugar_g += food.sugar_g;
  });

  return (
    <>
      <table className={style.Table}>
        <thead>
          <tr>
            <th>Neutrients</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Calories</td>
            <td>{Neutrient.calories.toFixed(2)} calories</td>
          </tr>
          <tr>
            <td>Serving (in gm )</td>
            <td>{Neutrient.serving_size_g.toFixed(2)} gm</td>
          </tr>
          <tr>
            <td>Protien (int gm)</td>
            <td>{Neutrient.protein_g.toFixed(2)} gm</td>
          </tr>
          <tr>
            <td>Fat (in gm)</td>
            <td>{Neutrient.fat_total_g.toFixed(2)} gm</td>
          </tr>
          <tr>
            <td>cholestrol (in mg)</td>
            <td>{Neutrient.cholesterol_mg.toFixed(2)} mg</td>
          </tr>
          <tr>
            <td>Suger (in gm)</td>
            <td>{Neutrient.sugar_g.toFixed(2)} gm</td>
          </tr>
          <tr>
            <td>carbohydrates (in g)</td>
            <td>{Neutrient.carbohydrates_total_g.toFixed(2)} gm</td>
          </tr>
          <tr>
            <td>Sodium (in mg)</td>
            <td>{Neutrient.sodium_mg.toFixed(2)} mg</td>
          </tr>
          <tr>
            <td>Potassium (in mg)</td>
            <td>{Neutrient.potassium_mg.toFixed(2)} mg</td>
          </tr>
          <tr>
            <td>Fiber (in gm)</td>
            <td>{Neutrient.fiber_g.toFixed(2)} gm</td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default Table;
