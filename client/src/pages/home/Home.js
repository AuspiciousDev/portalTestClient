import React from "react";
import "./Home.css"
const Home = () => {
  return (
    <div>
      <svg xmlns="http://www.w3.org/2000/svg">
        <filter id="motion-blur-filter" filterUnits="userSpaceOnUse">
          <feGaussianBlur stdDeviation="100 0"></feGaussianBlur>
        </filter>
      </svg>

      <span filter-content="S">STUDENT PORTAL HOME</span>
    </div>
  );
};

export default Home;
