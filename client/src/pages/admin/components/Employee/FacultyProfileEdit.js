import React from "react";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Paper,
  Typography,
  Divider,
  Button,
  capitalize,
  TextField,
  Select,
  InputLabel,
  FormControl,
  IconButton,
  MenuItem,
  InputAdornment,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers";

import {
  DriveFileRenameOutline,
  DeleteOutline,
  AccountCircle,
  Person2,
  Delete,
  CheckCircle,
  Cancel,
  AdminPanelSettings,
  Badge,
  School,
} from "@mui/icons-material";

import ConfirmDialogue from "../../../../global/ConfirmDialogue";
import SuccessDialogue from "../../../../global/SuccessDialogue";
import ErrorDialogue from "../../../../global/ErrorDialogue";
import LoadingDialogue from "../../../../global/LoadingDialogue";

import { useEmployeesContext } from "../../../../hooks/useEmployeesContext";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import { format } from "date-fns-tz";
import ValidateDialogue from "../../../../global/ValidateDialogue";
import { ModeEditOutlineOutlined } from "@mui/icons-material";
import axios from "../../../../api/axios";
import { useTheme } from "@mui/material";
import { tokens } from "../../../../theme";
const FacultyProfileEdit = (props) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const CHARACTER_LIMIT = 10;
  const isLetters = (str) => /^[A-Za-z]*$/.test(str);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [val, setVal] = useState([]);
  const [isloading, setIsLoading] = useState(false);
  const axiosPrivate = useAxiosPrivate();

  const { employees, empDispatch } = useEmployeesContext();

  const [empID, setEmpID] = useState("");
  const [empType, setEmpType] = useState({ types: [] });
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [suffix, setSuffix] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("12/31/1991");
  const [gender, setGender] = useState("");

  const [placeOfBirth, setPlaceOfBirth] = useState("");

  const [civilStatus, setCivilStatus] = useState("");
  const [nationality, setNationality] = useState("");
  const [religion, setReligion] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");

  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [telephone, setTelephone] = useState("");

  const [emergencyName, setEmergencyName] = useState("");
  const [emergencyRelationship, setEmergencyRelationship] = useState("");
  const [emergencyNumber, setEmergencyNumber] = useState("");

  const [emailError, setEmailError] = useState(false);
  const [mobileError, setMobileError] = useState(false);
  const [telephoneError, setTelephoneError] = useState(false);

  const [emergencyNameError, setEmergencyNameError] = useState(false);
  const [emergencyRelationshipError, setEmergencyRelationshipError] =
    useState(false);
  const [emergencyNumberError, setEmergencyNumberError] = useState(false);

  const [empIDError, setEmpIDError] = useState(false);
  const [empTypeError, setEmpTypeError] = useState(false);
  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [dateOfBirthError, setDateOfBirthError] = useState(false);
  const [genderError, setGenderError] = useState(false);
  const [validation, setValidation] = useState(true);
  const [value, setValue] = React.useState("");

  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
  });
  const [successDialog, setSuccessDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
  });
  const [errorDialog, setErrorDialog] = useState({
    isOpen: false,
    title: "",
    message: "",
  });

  const [loadingDialog, setLoadingDialog] = useState({
    isOpen: false,
    title: "",
    message: "",
  });

  const handleDate = (newValue) => {
    setDateOfBirth(newValue);
    setDateOfBirthError(false);
  };
  const clearFields = () => {
    setEmpID("");
    setFirstName("");
    setMiddleName("");
    setLastName("");
    setSuffix("");
    setDateOfBirth("");
    setPlaceOfBirth("");
    setGender("");
    setCivilStatus("");
    setNationality("");
    setReligion("");
    setAddress("");
    setCity("");
    setProvince("");
    setEmail("");
    setMobile("");
    setTelephone("");
    setEmergencyName("");
    setEmergencyRelationship("");
    setEmergencyNumber("");
  };
  const handleFieldChange = (event) => {
    console.log(event);
    event.preventDefault();
    setEmpType((empType) => ({
      ...empType,
      [event.target.name]:
        event.target.type === "checkbox"
          ? event.target.checked
          : event.target.value,
    }));
  };
  useEffect(() => {
    const getUsersDetails = async () => {
      try {
        setIsLoading(true);
        setLoadingDialog({ isOpen: true });
        const response = await axiosPrivate.get(`/api/employees/search/${id}`);
        if (response.status === 200) {
          const json = await response.data;
          console.log("Employees GET : ", json);
          setIsLoading(false);
          setLoadingDialog({ isOpen: false });
          setVal(json);
        }
      } catch (error) {
        setIsLoading(false);
        setLoadingDialog({ isOpen: false });
        if (!error.response) {
          console.log("no server response");
        } else if (error.response.status === 204) {
          console.log(error.response.data.message);
        } else {
          console.log(error);
        }
      }
      // if (response.statusText === "OK") {
      //   await setEmployees(response.data);
      //
      //   if (!response.data || response.data.length === 0) {
      //     setWithData(false);
      //     return;
      //   } else {
      //     setWithData(true);
      //   }
      // } else {
      //   return;
      // }
    };
    getUsersDetails();
  }, []);

  useEffect(() => {
    setFirstName(val.firstName);
    setMiddleName(val.middleName);
    setLastName(val.lastName);
    setSuffix(val.suffix);
    setDateOfBirth(val.dateOfBirth);
    setPlaceOfBirth(val.placeOfBirth);
    setNationality(val.nationality);
    setReligion(val.religion);
    setAddress(val.address);
    setCity(val.city);
    setProvince(val.province);
    setEmail(val.email);
    setMobile(val.mobile);
    setTelephone(val.telephone);
    setEmergencyName(val.emergencyName);
    setEmergencyRelationship(val.emergencyRelationship);
    setEmergencyNumber(val.emergencyNumber);
  }, [val.firstName]);
  const handleSubmit = async (e) => {
    e.preventDefault();

    const employee = {
      empID: id,
      empType,
      firstName,
      middleName,
      lastName,
      suffix,
      dateOfBirth,
      placeOfBirth,
      gender,
      civilStatus,
      nationality,
      religion,
      address,
      city,
      province,
      email,
      mobile,
      telephone,
      emergencyName,
      emergencyRelationship,
      emergencyNumber,
    };
    console.log(employee);

    try {
      const response = await axiosPrivate.patch(
        `/api/employees/update/${id}`,
        JSON.stringify(employee)
      );
      if (response.status === 200) {
        const json = await response.data;
        console.log("response;", json);
        setSuccessDialog({
          isOpen: true,
          message: "Employee has been updated!",
        });
        clearFields();
        navigate(-1);
      }
    } catch (error) {
      if (!error?.response) {
        console.log("no server response");
        setEmpIDError(true);
        setErrorDialog({
          isOpen: true,
          message: `${"No server response!"}`,
        });
      } else if (error.response.status === 400) {
        setEmpIDError(true);
        console.log(error.response.data.message);
        setErrorDialog({
          isOpen: true,
          message: `${error.response.data.message}`,
        });
      } else if (error.response.status === 409) {
        console.log(error.response.data.message);
        if (error.response.data.message.includes("Employee")) {
          setEmpIDError(true);
        }
        if (error.response.data.message.includes("Email")) {
          setEmailError(true);
        }
        setErrorDialog({
          isOpen: true,
          message: `${error.response.data.message}`,
        });
      } else {
        console.log(error);
        setErrorDialog({
          isOpen: true,
          message: `${error}`,
        });
      }
    }

    // console.log(empType);
  };

  return (
    <Box>
      <ConfirmDialogue
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
      <SuccessDialogue
        successDialog={successDialog}
        setSuccessDialog={setSuccessDialog}
      />
      <ErrorDialogue
        errorDialog={errorDialog}
        setErrorDialog={setErrorDialog}
      />
      <LoadingDialogue
        loadingDialog={loadingDialog}
        setLoadingDialog={setLoadingDialog}
      />
      {isloading ? (
        <></>
      ) : (
        <Box
          className="deleteScroll"
          gap={1}
          mt="20px"
          display="grid"
          sx={{
            height: { xs: "750px", sm: "100%" },
            width: { xs: "100%", sm: "100%" },
            gridTemplateColumns: { xs: "1fr", sm: "1fr 3fr" },
            padding: { xs: "0 20px 20px 20px" },
            overflow: "scroll",
          }}
          paddingBottom="20px"
        >
          <Paper
            elevation={2}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              padding="20px"
              gap={2}
            >
              <School sx={{ fontSize: "100px" }} />
              <Typography
                variant="h2"
                fontWeight="bold"
                textTransform="capitalize"
                sx={{ mt: "20px" }}
              >
                {val?.middleName
                  ? val?.firstName +
                    " " +
                    val?.middleName.charAt(0) +
                    ". " +
                    val?.lastName
                  : val?.firstName + " " + val?.lastName}
              </Typography>
              <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                gap={1}
              >
                <Typography variant="h4">{val?.empID}</Typography>
                <Typography variant="h4" color="primary">
                  {val?.email}
                </Typography>
              </Box>
            </Box>
          </Paper>
          <Paper elevation={2}>
            <Box
              display="flex"
              margin="20px"
              sx={{
                maxWidth: { xs: "400px", sm: "100%" },
              }}
            >
              <form onSubmit={handleSubmit} style={{ width: "100%" }}>
                {/* <Typography variant="h5">Registration</Typography> */}
                <Box marginBottom="40px">
                  <Typography variant="h4" sx={{ margin: "0 0 10px 0" }}>
                    Employment Information
                  </Typography>
                  <Box
                    sx={{
                      display: "grid",
                      width: "100%",
                      gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr 1fr " },
                      gap: "20px",
                    }}
                  >
                    <TextField
                      required
                      select
                      name="types"
                      type="number"
                      id="types"
                      variant="outlined"
                      label="Employee Type"
                      SelectProps={{
                        multiple: true,
                        value: empType.types,
                        onChange: handleFieldChange,
                      }}
                    >
                      <MenuItem value={2001}>System Administrator</MenuItem>
                      <MenuItem value={2002}>Teacher</MenuItem>
                    </TextField>
                    <TextField
                      required
                      autoComplete="off"
                      variant="outlined"
                      label="Email"
                      type="email"
                      error={emailError}
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setEmailError(false);
                      }}
                    />
                  </Box>
                </Box>
                <Typography variant="h4" sx={{ margin: "25px 0 10px 0" }}>
                  Personal Information
                </Typography>
                <Box marginBottom="40px">
                  <Typography sx={{ margin: "10px 0" }} variant="h5">
                    Name
                  </Typography>
                  <Box
                    sx={{
                      display: "grid",
                      width: "100%",
                      gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr 1fr " },
                      gap: "20px",
                    }}
                  >
                    <TextField
                      required
                      type="text"
                      autoComplete="off"
                      variant="outlined"
                      label="First Name"
                      placeholder="Given Name"
                      error={firstNameError}
                      value={firstName}
                      onChange={(e) => {
                        if (isLetters(e.target.value)) {
                          setFirstNameError(false);
                          setFirstName(e.target.value);
                        }
                      }}
                      inputProps={{ style: { textTransform: "capitalize" } }}
                    />
                    <TextField
                      autoComplete="off"
                      variant="outlined"
                      label="Middle Name"
                      placeholder="Optional"
                      value={middleName}
                      onChange={(e) => {
                        if (isLetters(e.target.value)) {
                          setMiddleName(e.target.value);
                        }
                      }}
                      inputProps={{ style: { textTransform: "capitalize" } }}
                    />
                    <TextField
                      required
                      autoComplete="off"
                      variant="outlined"
                      label="Last Name"
                      placeholder="Last Name"
                      error={lastNameError}
                      value={lastName}
                      onChange={(e) => {
                        if (isLetters(e.target.value)) {
                          setLastNameError(false);
                          setLastName(e.target.value);
                        }
                      }}
                      inputProps={{ style: { textTransform: "capitalize" } }}
                    />
                    <TextField
                      autoComplete="off"
                      variant="outlined"
                      label="Suffix"
                      placeholder="Sr./Jr./III"
                      value={suffix}
                      onChange={(e) => {
                        if (isLetters(e.target.value)) {
                          setSuffix(e.target.value);
                        }
                      }}
                      inputProps={{ style: { textTransform: "capitalize" } }}
                    />
                  </Box>

                  <Box sx={{ mb: "40px" }}>
                    <Box
                      sx={{
                        display: "grid",
                        width: "100%",
                        gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr 1fr " },
                        gap: "20px",
                        marginTop: "20px",
                      }}
                    >
                      <LocalizationProvider required dateAdapter={AdapterDayjs}>
                        <DesktopDatePicker
                          required
                          label="Date of Birth"
                          inputFormat="MM/DD/YYYY"
                          error={dateOfBirthError}
                          value={dateOfBirth}
                          onChange={handleDate}
                          renderInput={(params) => (
                            <TextField
                              required
                              autoComplete="off"
                              {...params}
                            />
                          )}
                        />
                      </LocalizationProvider>
                      <TextField
                        required
                        autoComplete="off"
                        variant="outlined"
                        label="Place of Birth"
                        placeholder="City"
                        value={placeOfBirth}
                        onChange={(e) => {
                          setPlaceOfBirth(e.target.value.toLowerCase());
                        }}
                      />
                      <FormControl required fullWidth>
                        <InputLabel id="demo-simple-select-label">
                          Gender
                        </InputLabel>
                        <Select
                          required
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={gender}
                          error={genderError}
                          label="Gender"
                          onChange={(e) => {
                            setGenderError(false);
                            setGender(e.target.value);
                          }}
                        >
                          <MenuItem value={"male"}>Male</MenuItem>
                          <MenuItem value={"female"}>Female</MenuItem>
                        </Select>
                      </FormControl>
                      <FormControl required fullWidth>
                        <InputLabel id="demo-simple-select-label">
                          Civil Status
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={civilStatus}
                          label="Civil Status"
                          onChange={(e) => {
                            setCivilStatus(e.target.value.toLowerCase());
                          }}
                        >
                          <MenuItem value={"single"}>Single</MenuItem>
                          <MenuItem value={"married"}>Married</MenuItem>
                          <MenuItem value={"divorced"}>Divorced</MenuItem>
                          <MenuItem value={"widowed"}>Widowed</MenuItem>
                        </Select>
                      </FormControl>
                      <TextField
                        required
                        autoComplete="off"
                        variant="outlined"
                        label="Nationality"
                        value={nationality}
                        onChange={(e) => {
                          setNationality(e.target.value.toLowerCase());
                        }}
                      />
                      <TextField
                        autoComplete="off"
                        variant="outlined"
                        label="Religion"
                        value={religion}
                        onChange={(e) => {
                          setReligion(e.target.value.toLowerCase());
                        }}
                      />
                    </Box>
                  </Box>
                  <Box marginTop="20px">
                    <Typography sx={{ margin: "10px 0" }} fontSize="14pt">
                      Address
                    </Typography>
                    <Box
                      sx={{
                        display: "grid",
                        width: "100%",
                        gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr 1fr " },
                        gap: "20px",
                      }}
                    >
                      <TextField
                        required
                        autoComplete="off"
                        variant="outlined"
                        label="Address"
                        value={address}
                        onChange={(e) => {
                          setAddress(e.target.value.toLowerCase());
                        }}
                      />
                      <TextField
                        required
                        autoComplete="off"
                        variant="outlined"
                        label="Municipality/City"
                        value={city}
                        onChange={(e) => {
                          setCity(e.target.value.toLowerCase());
                        }}
                      />
                      <TextField
                        required
                        autoComplete="off"
                        variant="outlined"
                        label="Province/Region"
                        value={province}
                        onChange={(e) => {
                          setProvince(e.target.value.toLowerCase());
                        }}
                      />
                    </Box>
                  </Box>
                  <Box
                    display="flex"
                    width="100%"
                    flexDirection="column"
                    justifyContent="center"
                    marginBottom="40px"
                  >
                    <Typography variant="h5" sx={{ margin: "0 0 10px 0" }}>
                      Contact Information
                    </Typography>
                    <Box
                      sx={{
                        display: "grid",
                        width: "100%",
                        gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr 1fr " },
                        gap: "20px",
                      }}
                    >
                      <TextField
                        required
                        autoComplete="off"
                        variant="outlined"
                        label="Email"
                        value={email}
                        error={emailError}
                        onChange={(e) => {
                          setEmail(e.target.value.toLowerCase());
                        }}
                      />
                      <TextField
                        required
                        autoComplete="off"
                        variant="outlined"
                        label="Mobile Number"
                        error={mobileError}
                        value={mobile}
                        onChange={(e) => {
                          setMobile(e.target.value.toLowerCase());
                        }}
                      />
                      <TextField
                        autoComplete="off"
                        variant="outlined"
                        label="Telephone Number"
                        value={telephone}
                        onChange={(e) => {
                          setTelephone(e.target.value.toLowerCase());
                        }}
                      />
                    </Box>
                  </Box>
                  <Box marginBottom="40px">
                    <Typography variant="h4" sx={{ margin: "25px 0 10px 0" }}>
                      Emergency Information
                    </Typography>
                    <Box
                      sx={{
                        display: "grid",
                        width: "100%",
                        gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr 1fr " },
                        gap: "20px",
                      }}
                    >
                      <TextField
                        required
                        autoComplete="off"
                        variant="outlined"
                        label="Contact Name"
                        error={emergencyNameError}
                        value={emergencyName}
                        onChange={(e) => {
                          setEmergencyName(e.target.value.toLowerCase());
                        }}
                      />
                      <TextField
                        required
                        autoComplete="off"
                        variant="outlined"
                        label="Relationship"
                        error={emergencyNameError}
                        value={emergencyRelationship}
                        onChange={(e) => {
                          setEmergencyRelationship(
                            e.target.value.toLowerCase()
                          );
                        }}
                      />
                      <TextField
                        required
                        autoComplete="off"
                        variant="outlined"
                        label="Contact Number"
                        error={emergencyNumberError}
                        value={emergencyNumber}
                        onChange={(e) => {
                          setEmergencyNumber(e.target.value.toLowerCase());
                        }}
                      />
                    </Box>
                  </Box>
                </Box>

                <Box display="flex" justifyContent="end" height="70px">
                  <Button
                    type="submit"
                    color="secondary"
                    variant="contained"
                    sx={{ width: "250px", height: "50px" }}
                  >
                    <Typography variant="h6" fontWeight="500">
                      SUBMIT
                    </Typography>
                  </Button>
                  <Button
                    type="button"
                    variant="contained"
                    sx={{ width: "250px", height: "50px", ml: "20px" }}
                    onClick={() => {
                      navigate(-1);
                      clearFields();
                    }}
                  >
                    <Typography variant="h6" fontWeight="500">
                      CANCEL
                    </Typography>
                  </Button>
                </Box>
              </form>
            </Box>
          </Paper>
        </Box>
      )}
    </Box>
  );
};

export default FacultyProfileEdit;
