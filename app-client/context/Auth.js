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
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
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

  useEffect(() => {
    let { isAuthenticated, token } = state;
    if (isAuthenticated) {
      client.setToken(token);
    }
  }, [state]);

  return <AuthContext.Provider {...props} value={contextValue} />;
};

export const useAuth = () => {
  const value = useContext(AuthContext);
  return value;
};
