import React from "react";
import Sidebar from "../../components/Sidebar";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Users from "./Users";
const Navpage = () => {
  return (
    <React.Fragment>
      <section>
        <Routes>
          <Route path="/users" exact element={<Users />} />
        </Routes>
      </section>
    </React.Fragment>
  );
};

export default Navpage;
