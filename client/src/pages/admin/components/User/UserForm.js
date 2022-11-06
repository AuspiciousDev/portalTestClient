import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import UserTable from "./UserTable";
import { useTheme } from "@mui/material";
import { tokens } from "../../../../theme";
import { useUsersContext } from "../../../../hooks/useUserContext";

const UserHome = () => {
  const { subjects, dispatch } = useUsersContext();

  const [isFormOpen, setIsFormOpen] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("P@");
  const [roles, setRole] = useState([]);
  const [active, setActive] = useState(true);
  return (
    <div style={{ margin: "20px" }}>
      <TextField variant="outlined" label="Last Name" />
      <TextField variant="outlined" label="First Name" />
    </div>
  );
};

export default UserHome;
