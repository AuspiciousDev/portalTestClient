import { GradesContext } from "../context/GradesContext";
import { useContext } from "react";

export const useGradesContext = () => {
  const context = useContext(GradesContext);

  if (!context) {
    throw Error("useGradesContext must be used inside a GradesContextProvider");
  }

  return context;
};
