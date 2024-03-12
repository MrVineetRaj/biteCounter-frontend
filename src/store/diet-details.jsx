import { createContext, useReducer } from "react";

export const Diet = createContext({
  Breakfast: [],
  Lunch: [],
  Dinner: [],

  addBreakFastItem: () => { },
  deleteBreakFastItem: () => { },

  addLunchItem: () => { },
  deleteLunchItem: () => { },

  addDinnerItem: () => { },
  deleteDinnerItem: () => { },

})

const DietReducer = (currAuth, action) => {
  switch (action.type) {
    case "ADD_BREAKFAST_ITEM":
      return {
        ...currAuth,
        Breakfast: [...currAuth.Breakfast, action.payload.Breakfast]
      };
    case "ADD_LUNCH_ITEM":
      return {
        ...currAuth,
        Lunch: [...currAuth.Lunch, action.payload.Lunch]
      };
    case "ADD_DINNER_ITEM":
      return {
        ...currAuth,
        Dinner: [...currAuth.Dinner, action.payload.Dinner]
      };
    default:
      return currAuth;
  }
};


const DietProvider = ({ children }) => {
  const [dietState, dispatchDiet] = useReducer(DietReducer, {
    Breakfast: [],
    Lunch: [],
    Dinner: [],
  });

  const addBreakFastItem = (Breakfast) => {
    dispatchDiet({
      type: "ADD_BREAKFAST_ITEM",
      payload: {
        Breakfast
      }
    })
  };

  const addLunchItem = (Lunch) => {
    dispatchDiet({
      type: "ADD_LUNCH_ITEM",
      payload: {
        Lunch
      }
    })
  };

  const addDinnerItem = (Dinner) => {
    dispatchDiet({
      type: "ADD_DINNER_ITEM",
      payload: {
        Dinner
      }
    })
  };



  return (
    <Diet.Provider value={{
      Breakfast: dietState.Breakfast,
      Lunch: dietState.Lunch,
      Dinner: dietState.Dinner,

      addBreakFastItem,

      addLunchItem,

      addDinnerItem,

    }}>
      {children}
    </Diet.Provider>
  );

};

export default DietProvider
