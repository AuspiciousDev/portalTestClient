import { Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
const Unauthorized = () => {
  const navigate = useNavigate();
  const goBack = () => navigate(-1);
  return (
    <div>
      <h1>Unauthorized</h1>
      <br />
      <p>You do not have access to the requested page.</p>
      <div className="mainpage-container">
        <Button type="button" onClick={goBack}>
          Go Back
        </Button>
      </div>
    </div>
  );
};

export default Unauthorized;
