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
import { useSubjectsContext } from "../../../hooks/useSubjectsContext";
import SubjectTable from "./SubjectTable";
import axios from "axios";

const SubjectForm = () => {
  const { subjects, dispatch } = useSubjectsContext();

  const [isFormOpen, setIsFormOpen] = useState(true);
  const [subjectID, setSubjectID] = useState();
  const [subjectLevel, setSubjectLevel] = useState("");
  const [title, setTitle] = useState();

  const [subjectIDError, setSubjectIDError] = useState(false);
  const [subjectLevelError, setSubjectLevelError] = useState(false);
  const [titleError, setTitleError] = useState(false);

  const clearForm = () => {
    setIsFormOpen(false);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const subject = {
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
      try {
        const response = await axios.post(
          "/api/subjects/register",
          JSON.stringify(subject),
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );
        const json = await response.data;
        console.log(json);
        if (response?.status === 201) {
          dispatch({ type: "CREATE_SUBJECT", payload: json });
          setIsFormOpen(false);
        }
      } catch (error) {
        if (!error?.response) {
          console.log("no server response");
        } else if (error.response?.status === 409) {
          console.log("subject taken");
        } else {
          console.log(error);
        }
      }

      // const response = await fetch("/api/subjects/register", {
      //   method: "POST",
      //   body: JSON.stringify(subject),
      //   headers: {
      //     "Content-Type": "application/json",
      //     withCredentials: true,
      //   },
      // });
    } else {
      console.log("MADAME ERROR");
    }
  };
  return (
    <>
      {!isFormOpen ? (
        <SubjectTable />
      ) : (
        <Box
          className="formContainer"
          display="block"
          width="100%"
          height="800px"
          flexDirection="column"
          justifyContent="center"
        >
          <Box>
            <Typography variant="h3" fontWeight={600}>
              SUBJECTS
            </Typography>
          </Box>
          <form onSubmit={handleSubmit} style={{ width: "100%" }}>
            {/* <Typography variant="h5">Registration</Typography> */}

            <Typography variant="h5" sx={{ margin: "25px 0 10px 0" }}>
              Subject Information
            </Typography>
            <Box marginBottom="40px">
              <Box
                sx={{
                  display: "grid",
                  width: "100%",
                  gridTemplateColumns: "1fr 1fr 1fr",
                  gap: "20px",
                }}
              >
                <TextField
                  required
                  autoComplete="off"
                  variant="outlined"
                  label="Subject ID"
                  placeholder="5-6 characters"
                  error={subjectIDError}
                  value={subjectID}
                  onChange={(e) => {
                    setSubjectID(e.target.value.toLowerCase());
                  }}
                />

                <TextField
                  required
                  autoComplete="off"
                  variant="outlined"
                  label="Subject Title"
                  placeholder="Subject Title"
                  error={titleError}
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value.toLowerCase());
                  }}
                />
                <FormControl required fullWidth>
                  <InputLabel required id="demo-simple-select-label">
                    Level
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={subjectLevel}
                    error={subjectLevelError}
                    label="Level"
                    onChange={(e) => {
                      setSubjectLevel(e.target.value.toLowerCase());
                    }}
                  >
                    <MenuItem value={"1"}>1</MenuItem>
                    <MenuItem value={"2"}>2</MenuItem>
                    <MenuItem value={"3"}>3</MenuItem>
                    <MenuItem value={"4"}>4</MenuItem>
                    <MenuItem value={"5"}>5</MenuItem>
                    <MenuItem value={"6"}>6</MenuItem>
                    <MenuItem value={"7"}>7</MenuItem>
                    <MenuItem value={"8"}>8</MenuItem>
                    <MenuItem value={"9"}>9</MenuItem>
                    <MenuItem value={"10"}>10</MenuItem>
                    <MenuItem value={"11"}>11</MenuItem>
                    <MenuItem value={"12"}>12</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Box>

            <Box
              display="flex"
              justifyContent="end"
              height="70px"
              sx={{ margin: "20px 0" }}
            >
              <Button
                type="button"
                variant="contained"
                sx={{ width: "250px", height: "50px" }}
                onClick={() => {
                  clearForm();
                }}
              >
                <Typography color="white" variant="h6" fontWeight="500">
                  CANCEL
                </Typography>
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="red"
                sx={{
                  width: "200px",
                  height: "50px",
                  marginLeft: "20px",
                }}
              >
                <Typography color="white" variant="h6" fontWeight="500">
                  Confirm
                </Typography>
              </Button>
            </Box>
          </form>
        </Box>
      )}
    </>
  );
};

export default SubjectForm;
