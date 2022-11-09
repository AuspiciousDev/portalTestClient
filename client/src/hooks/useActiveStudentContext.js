import { ActiveStudentsContext } from "../context/ActiveStudentContext";
import { useContext } from "react";

export const useActiveStudentsContext = () => {
  const context = useContext(ActiveStudentsContext);

  if (!context) {
    throw Error(
      "useActiveStudentsContextContext must be used inside a ActiveStudentsContextProvider"
    );
  }

  return context;
};
