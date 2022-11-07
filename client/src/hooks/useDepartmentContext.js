import { DepartmentsContext } from "../context/DepartmentContext";
import { useContext } from "react";

export const useDepartmentsContext = () => {
  const context = useContext(DepartmentsContext);

  if (!context) {
    throw Error(
      "useDepartmentsContextContext must be used inside a DepartmentsContextProvider"
    );
  }

  return context;
};
