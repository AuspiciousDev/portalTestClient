import React from "react";
import { createContext, useReducer } from "react";

export const StudentsContext = createContext();

export const studentsReducer = (state, action) => {
  switch (action.type) {
    case "SET_STUDENTS":
      return {
        students: action.payload,
      };
    case "CREATE_STUDENT":
      return {
        students: [action.payload, ...state.students],
      };

    case "DELETE_STUDENT":
      return {
        students: state.students.filter((w) => w._id !== action.payload._id),
      };
    default:
      return state;
  }
};

export const StudentsContextProvider = ({ children }) => {
  const [state, studDispatch] = useReducer(studentsReducer, {
    students: null,
  });

  return (
    <StudentsContext.Provider value={{ ...state, studDispatch }}>
      {children}
    </StudentsContext.Provider>
  );
};
