import React from "react";
import Popup from "reactjs-popup";
import { useEffect, useState } from "react";
import { Search } from "@mui/icons-material";
import {
  Box,
  Button,
  IconButton,
  InputBase,
  Paper,
  Typography,
  TableContainer,
  Table,
  TableRow,
  TableHead,
  TableCell,
  TableBody,
  TextField,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { AutoStories, DeleteOutline } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import Loading from "../../../../global/Loading";
import { useLevelsContext } from "../../../../hooks/useLevelsContext";
import { DriveFileRenameOutline } from "@mui/icons-material";
import axios from "axios";
export const LevelForm = () => {
  const { levels, levelDispatch } = useLevelsContext();
  const [levelID, setLevelID] = useState("");
  const [title, setTitle] = useState("");

  const [levelIDError, setLevelIDError] = useState(false);
  const [titleError, setTitleError] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      levelID,
      title,
    };
    console.log(data);

    if (!levelID) {
      setLevelIDError(true);
    } else {
      setLevelIDError(false);
    }
    if (!title) {
      setTitleError(true);
    } else {
      setTitleError(false);
    }

    if (!levelIDError && !titleError) {
      try {
        const response = await axios.post(
          "/api/levels/register",
          JSON.stringify(data),
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );
        const json = await response.data;
        if (response.status === 201) {
          levelDispatch({ type: "CREATE_LEVEL", payload: json });
          console.log(response.data.message);
        }
      } catch (error) {
        if (!error?.response) {
          console.log("no server response");
        } else if (error.response.status === 400) {
          console.log(error.response.data.message);
        } else if (error.response.status === 409) {
          console.log(error.response.data.message);
        } else {
          console.log(error);
        }
      }
    } else {
      console.log("Validation Error!");
    }
  };
  return (
    // <Popup
    //   trigger={
    //     <IconButton sx={{ cursor: "pointer" }}>
    //       <DriveFileRenameOutline />
    //     </IconButton>
    //   }
    //   modal
    //   nested
    // >
    //   {(close) => (
    <div className="modal-small-form">
      <button className="close">
        &times;
      </button>
      <div className="header">
        <Typography variant="h4">UPDATE SUBJECT DETAILS</Typography>
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
                <FormControl required fullWidth>
                  <InputLabel required id="demo-simple-select-label">
                    Level
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    error={levelIDError}
                    value={levelID}
                    label="Level"
                    onChange={(e) => {
                      setLevelID(e.target.value);
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
                    // close();
                  }}
                >
                  <Typography variant="h6" fontWeight="500">
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
    //   )}
    // </Popup>
  );
};
