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
import { useSubjectsContext } from "../../../../hooks/useSubjectsContext";
const SubjectEditForm = ({ data }) => {
  const { subjects, dispatch } = useSubjectsContext();
  const [subjectID, setSubjectID] = useState();
  const [subjectLevel, setSubjectLevel] = useState();
  const [title, setTitle] = useState();

  const [subjectIDError, setSubjectIDError] = useState(false);
  const [subjectLevelError, setSubjectLevelError] = useState(false);
  const [titleError, setTitleError] = useState(false);

  const setData = async () => {
    if (data) {
      setSubjectID(data.subjectID);
      setSubjectLevel(data.subjectLevel);
      setTitle(data.title);
    }
  };

  useEffect(() => {
    setData();
  }, []);
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
      const response = await fetch("/api/subjects/update/" + data.subjectID, {
        method: "PATCH",
        body: JSON.stringify(subject),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        dispatch({ type: "SET_SUBJECTS", payload: null });

        const response2 = await fetch("/api/subjects", {});
        const json = await response2.json();
        if (response2.ok) {
          dispatch({ type: "SET_SUBJECTS", payload: json });
        }
      }
    } else {
      console.log("MADAME ERROR");
    }
  };
  return (
    <Popup
      trigger={
        <IconButton sx={{ cursor: "pointer" }}>
          <DriveFileRenameOutline />
        </IconButton>
      }
      modal
      nested
    >
      {(close) => (
        <div className="modal-small-form">
          <button className="close" onClick={close}>
            &times;
          </button>
          <div className="header">
            <Typography variant="h4">
              UPDATE SUBJECT DETAILS
            </Typography>
          </div>
          <div className="content">
            <Box
              className="formContainer"
              display="block"
              width="100%"
              height="800px"
              flexDirection="column"
              justifyContent="center"
            >
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
                        setSubjectID(e.target.value);
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
                        setTitle(e.target.value);
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
                          setSubjectLevel(e.target.value);
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
                  <div className="actions">
                    <Button
                      type="button"
                      variant="contained"
                     
                      sx={{
                        width: "200px",
                        height: "50px",
                        marginLeft: "20px",
                      }}
                      onClick={() => {
                        close();
                      }}
                    >
                      <Typography  variant="h6" fontWeight="500">
                        CANCEL
                      </Typography>
                    </Button>
                    <Button
                      type="submit"
                      variant="contained"
                      sx={{
                        width: "200px",
                        height: "50px",
                        marginLeft: "20px",
                      }}
                    >
                      <Typography variant="h6" fontWeight="500">
                        Confirm
                      </Typography>
                    </Button>
                  </div>
                </Box>
              </form>
            </Box>
          </div>
        </div>
      )}
    </Popup>
  );
};

export default SubjectEditForm;
