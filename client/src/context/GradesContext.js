import React from "react";import { createContext, useReducer } from "react";
export const GradesContext = createContext();

export const gradesReducer = (state, action) => {
  switch (action.type) {
    case "SET_GRADES":
      return {
        grades: action.payload,
      };
    case "CREATE_GRADE":
      return {
        grades: [action.payload, ...state.grades],
      };
    case "DELETE_GRADE":
      return {
        grades: state.grades.filter((w) => w._id !== action.payload._id),
      };
    default:
      return state;
  }
};

export const GradesContextProvider = ({ children }) => {
  const [state, gradeDispatch] = useReducer(gradesReducer, {
    grades: null,
  });

  return (
    <GradesContext.Provider value={{ ...state, gradeDispatch }}>
      {children}
    </GradesContext.Provider>
  );
};
