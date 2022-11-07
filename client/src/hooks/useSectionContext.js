import { SectionsContext } from "../context/SectionsContext";
import { useContext } from "react";

export const useSectionsContext = () => {
  const context = useContext(SectionsContext);

  if (!context) {
    throw Error(
      "useSectionsContextContext must be used inside a SectionsContextProvider"
    );
  }

  return context;
};
