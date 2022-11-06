import React from "react";
import { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  FormControl,
  InputLabel,
  IconButton,
  Select,
  MenuItem,
} from "@mui/material";
import Popup from "reactjs-popup";
import { DriveFileRenameOutline } from "@mui/icons-material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import { useUsersContext } from "../../../../hooks/useUserContext";

const UserEditForm = ({ val }) => {
  const { users, dispatch } = useUsersContext();
  const [username, setUsername] = useState();
  const [roles, setRoles] = useState([]);
  const [title, setTitle] = useState();

  const [subjectIDError, setSubjectIDError] = useState(false);
  const [subjectLevelError, setSubjectLevelError] = useState(false);
  const [titleError, setTitleError] = useState(false);

  return <div>UserEditForm</div>;
};

export default UserEditForm;
