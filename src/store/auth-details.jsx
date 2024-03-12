import { createContext, useReducer } from "react";

export const Auth = createContext({
  token: String,
  user: {},
  setUserAndToken: () => { },
  addTokenToLocalHost: () => { },
  deleteTokenToLocalHost: () => { },
})

const AuthReducer = (currAuth, action) => {
  if (action.type === "SET_USER_AND_TOKEN") {
    return {user:action.payload.user,token:action.payload.token};
  }
  return currAuth;
}

const AuthProvider = ({ children }) => {
  const [authState, dispatchAuth] = useReducer(AuthReducer, {
    user: {},
    token: ""
  });

  const setUserAndToken = (user,token) => {
    dispatchAuth({
      type: "SET_USER_AND_TOKEN",
      payload: {
        user:user,
        token:token,
      }
    })
  };

  return (
    <Auth.Provider value={{
      user: authState.user,
      token: authState.token,
      setUserAndToken,
    }}>
      {children}
    </Auth.Provider>
  );
  
};

export default AuthProvider;