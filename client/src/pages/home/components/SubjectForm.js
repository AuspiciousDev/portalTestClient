import React, { useState } from "react";
import "../../../App.css";
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
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import StudentTable from "./StudentTable";
import { useSubjectsContext } from "../../../hooks/useSubjectsContext";

const SubjectForm = () => {
  const { subjects, dispatch } = useSubjectsContext();

  const [isFormOpen, setIsFormOpen] = useState(true);
  const [subjectID, setSubjectID] = useState();
  const [subjectLevel, setSubjectLevel] = useState();
  const [title, setTitle] = useState();

  const [subjectIDError, setSubjectIDError] = useState(false);
  const [subjectLevelError, setSubjectLevelError] = useState(false);
  const [titleError, setTitleError] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();

    const student = {
      subjectID,
      subjectLevel,
      title,
    };

    if (!subjectID) {
      setSubjectIDError(true);
    } else {
      setSubjectIDError(false);
    }
    if (!subjectLevel) {
      setSubjectLevelError(true);
    } else {
      setSubjectLevelError(false);
    }
    if (!title) {
      setTitleError(true);
    } else {
      setTitleError(false);
    }
    if (!subjectIDError && !subjectLevelError && !titleError) {
      const response = await fetch("/api/subjects/update/" + subjectID, {
        method: "PATCH",
        body: JSON.stringify(student),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        dispatch({ type: "CREATE_SUBJECT", payload: null });
      }
      setIsFormOpen(false);
    } else {
      console.log("MADAME ERROR");
    }
  };
  return <div>SubjectForm</div>;
};

export default SubjectForm;
