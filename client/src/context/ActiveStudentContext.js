import { createContext, useReducer } from "react";
export const ActiveStudentsContext = createContext();

export const activeStudentsReducer = (state, action) => {
  switch (action.type) {
    case "SET_ACTIVES":
      return {
        actives: action.payload,
      };
    case "CREATE_ACTIVE":
      return {
        actives: [action.payload, ...state.actives],
      };
    case "DELETE_ACTIVE":
      return {
        actives: state.actives.filter((w) => w._id !== action.payload._id),
      };
    default:
      return state;
  }
};

export const ActiveStudentsContextProvider = ({ children }) => {
  const [state, activeDispatch] = useReducer(activeStudentsReducer, {
    actives: null,
  });

  return (
    <ActiveStudentsContext.Provider value={{ ...state, activeDispatch }}>
      {children}
    </ActiveStudentsContext.Provider>
  );
};
