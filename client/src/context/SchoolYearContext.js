import { createContext, useReducer } from "react";
export const SchoolYearsContext = createContext();

export const schoolYearsReducer = (state, action) => {
  switch (action.type) {
    case "SET_SCHOOLYEARS":
      return {
        schoolyears: action.payload,
      };
    case "CREATE_SCHOOLYEAR":
      return {
        schoolyears: [action.payload, ...state.schoolyears],
      };
    case "DELETE_SCHOOLYEAR":
      return {
        schoolyears: state.schoolyears.filter(
          (w) => w._id !== action.payload._id
        ),
      };
    default:
      return state;
  }
};

export const SchoolYearsContextProvider = ({ children }) => {
  const [state, sydispatch] = useReducer(schoolYearsReducer, {
    users: null,
  });

  return (
    <SchoolYearsContext.Provider value={{ ...state, sydispatch }}>
      {children}
    </SchoolYearsContext.Provider>
  );
};
