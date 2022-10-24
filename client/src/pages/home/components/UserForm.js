import React from "react";
import { TextField, Button } from "@mui/material";
const UserHome = () => {
  return (
    <div style={{margin: "20px"}}>
      <TextField variant="outlined" label="Last Name" />
      <TextField variant="outlined" label="First Name" />
    </div>
  );
};

export default UserHome;
