import React from "react";import { createContext, useReducer } from "react";

export const EmployeesContext = createContext();

export const employeesReducer = (state, action) => {
  switch (action.type) {
    case "SET_EMPLOYEES":
      return {
        employees: action.payload,
      };
    case "CREATE_EMPLOYEE":
      return {
        employees: [action.payload, ...state.employees],
      };

    case "DELETE_EMPLOYEE":
      return {
        employees: state.employees.filter((w) => w._id !== action.payload._id),
      };
    default:
      return state;
  }
};

export const EmployeesContextProvider = ({ children }) => {
  const [state, empDispatch] = useReducer(employeesReducer, {
    employees: null,
  });

  return (
    <EmployeesContext.Provider value={{ ...state, empDispatch }}>
      {children}
    </EmployeesContext.Provider>
  );
};
