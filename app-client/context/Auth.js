import React, { useMemo, useReducer, useContext, useEffect } from "react";
import client from "../client";

const AuthContext = React.createContext(null);

let initialState = {
  user: null,
  isAuthenticated: false,
  token: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "authenticate":
      let { user, token } = action.payload;

      if (!user && !token) {
        return state;
      }
      // set client token
      client.setToken(token);

      return {
        ...state,
        user,
        token,
        isAuthenticated: true,
      };
    case "logout":
      return initialState;
    default:
      return state;
  }
};

export const AuthContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  let contextValue = useMemo(
    () => ({
      state,
      dispatch,
    }),
    [state, dispatch]
  );

  return <AuthContext.Provider {...props} value={contextValue} />;
};

export const useAuth = () => {
  const value = useContext(AuthContext);
  return value;
};
