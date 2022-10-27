import { EmployeesContext } from "../context/EmployeeContext";
import { useContext } from "react";

export const useEmployeesContext = () => {
  const context = useContext(EmployeesContext);

  if (!context) {
    throw Error(
      "useWorkoutsContext must be used inside a EmployeeContextProvider"
    );
  }

  return context;
};
