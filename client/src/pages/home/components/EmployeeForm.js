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
import EmployeeTable from "./EmployeeTable";
const EmployeeForm = () => {
  const [isFormOpen, setIsFormOpen] = useState(true);
  const [empID, setEmpID] = useState("");
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [suffix, setSuffix] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [placeOfBirth, setPlaceOfBirth] = useState("");
  const [gender, setGender] = useState("");
  const [civilStatus, setCivilStatus] = useState("");
  const [religion, setReligion] = useState("");
  const [nationality, setNationality] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [telephone, setTelephone] = useState("");
  const [department, setDepartment] = useState("");
  const [position, setPosition] = useState("");
  const [contactName, setContactName] = useState("");
  const [relationship, setRelationship] = useState("");
  const [emergencyNumber, setEmergencyNumber] = useState("");

  const [empIDError, setEmpIDError] = useState(false);
  const [firstNameError, setFirstNameError] = useState(false);
  const [middleNameError, setMiddleNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [suffixError, setSuffixError] = useState(false);
  const [dateOfBirthError, setDateOfBirthError] = useState(false);
  const [placeOfBirthError, setPlaceOfBirthError] = useState(false);
  const [genderError, setGenderError] = useState(false);
  const [civilStatusError, setCivilStatusError] = useState(false);
  const [nationalityError, setNationalityError] = useState(false);
  const [addressError, setAddressError] = useState(false);
  const [cityError, setCityError] = useState(false);
  const [provinceError, setProvinceError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [mobileError, setMobileError] = useState(false);
  const [telephoneError, setTelephoneError] = useState(false);
  const [departmentError, setDepartmentError] = useState(false);
  const [positionError, setPositionError] = useState(false);
  const [contactNameError, setContactNameError] = useState(false);
  const [relationshipError, setRelationshipError] = useState(false);
  const [emergencyNumberError, setEmergencyNumberError] = useState(false);
  const [validation, setValidation] = useState(true);

  const handleDate = (newValue) => {
    setDateOfBirth(newValue);
    setDateOfBirthError(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const employee = {
      empID,
      firstName,
      middleName,
      lastName,
      suffix,
      placeOfBirth,
      gender,
      dateOfBirth,
      civilStatus,
      nationality,
      address,
      city,
      province,
      email,
      mobile,
      telephone,
      department,
      position,
      contactName,
      relationship,
      emergencyNumber,
    };

    if (!firstName) {
      setFirstNameError(true);
    } else {
      setFirstNameError(false);
    }
    if (!lastName) {
      setLastNameError(true);
    } else {
      setLastNameError(false);
    }
    if (!dateOfBirth) {
      setDateOfBirthError(true);
    } else {
      setDateOfBirthError(false);
    }
    if (!placeOfBirth) {
      setPlaceOfBirthError(true);
    } else {
      setPlaceOfBirthError(false);
    }
    if (!gender) {
      setGenderError(true);
    } else {
      setGenderError(false);
    }
    if (!civilStatus) {
      setCivilStatusError(true);
    } else {
      setCivilStatusError(false);
    }
    if (!nationality) {
      setNationalityError(true);
    } else {
      setNationalityError(false);
    }
    if (!address) {
      setAddressError(true);
    } else {
      setAddressError(false);
    }
    if (!city) {
      setCityError(true);
    } else {
      setCityError(false);
    }
    if (!province) {
      setProvinceError(true);
    } else {
      setProvinceError(false);
    }
    if (!email) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }
    if (!mobile) {
      setMobileError(true);
    } else {
      setMobileError(false);
    }
    if (!empID) {
      setEmpIDError(true);
    } else {
      setEmpIDError(false);
    }
    if (!department) {
      setDepartmentError(true);
    } else {
      setDepartmentError(false);
    }
    if (!position) {
      setPositionError(true);
    } else {
      setPositionError(false);
    }
    if (!contactName) {
      setContactNameError(true);
    } else {
      setContactNameError(false);
    }
    if (!relationship) {
      setRelationshipError(true);
    } else {
      setRelationshipError(false);
    }
    if (!emergencyNumber) {
      setEmergencyNumberError(true);
    } else {
      setEmergencyNumberError(false);
    }

    if (
      !empIDError &&
      !firstNameError &&
      !lastNameError &&
      !dateOfBirthError &&
      !placeOfBirthError &&
      !genderError &&
      !civilStatusError &&
      !nationalityError &&
      !addressError &&
      !cityError &&
      !provinceError &&
      !emailError &&
      !mobileError &&
      !departmentError &&
      !positionError &&
      !contactNameError &&
      !relationshipError &&
      !emergencyNumberError
    ) {
      const response = await fetch("/api/employees/register", {
        method: "POST",
        body: JSON.stringify(employee),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const json = await response.json();
      console.log(json);
      if (response.ok) {
        setIsFormOpen(false);
      }
    } else {
      console.log("MADAME ERROR");
    }
  };
  const clearForm = () => {
    setIsFormOpen(false);
  };
  return (
    <>
      {!isFormOpen ? (
        <EmployeeTable />
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
              EMPLOYEES
            </Typography>
          </Box>
          <form onSubmit={handleSubmit} style={{ width: "100%" }}>
            {/* <Typography variant="h5">Registration</Typography> */}

            <Typography variant="h5" sx={{ margin: "25px 0 10px 0" }}>
              General Information
            </Typography>
            <Box marginBottom="40px">
              <Typography sx={{ margin: "10px 0" }} fontSize="14pt">
                Name
              </Typography>
              <Box
                sx={{
                  display: "grid",
                  width: "100%",
                  gridTemplateColumns: "1fr 1fr 1fr 1fr ",
                  gap: "20px",
                }}
              >
                <TextField
                  variant="outlined"
                  label="First Name"
                  placeholder="Given Name"
                  error={firstNameError}
                  value={firstName}
                  onChange={(e) => {
                    setFirstName(e.target.value.toLowerCase);
                  }}
                />
                <TextField
                  variant="outlined"
                  label="Middle Name"
                  placeholder="Optional"
                  value={middleName}
                  onChange={(e) => {
                    setMiddleName(e.target.value.toLowerCase);
                  }}
                />
                <TextField
                  variant="outlined"
                  label="Last Name"
                  placeholder="Last Name"
                  error={lastNameError}
                  value={lastName}
                  onChange={(e) => {
                    setLastName(e.target.value.toLowerCase);
                  }}
                />
                <TextField
                  variant="outlined"
                  label="Suffix"
                  placeholder="Sr./Jr./III"
                  value={suffix}
                  onChange={(e) => {
                    setSuffix(e.target.value.toLowerCase);
                  }}
                />
              </Box>

              <Box sx={{ mb: "40px" }}>
                <Box
                  sx={{
                    display: "grid",
                    width: "100%",
                    gridTemplateColumns: "1fr 1fr 1fr 1fr ",
                    gap: "20px",
                    marginTop: "20px",
                  }}
                >
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DesktopDatePicker
                      label="Date of Birth"
                      inputFormat="MM/DD/YYYY"
                      error={dateOfBirthError}
                      value={dateOfBirth}
                      onChange={handleDate}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider>

                  <TextField
                    variant="outlined"
                    label="Place of Birth"
                    placeholder="City"
                    error={placeOfBirthError}
                    value={placeOfBirth}
                    onChange={(e) => {
                      setPlaceOfBirth(e.target.value.toLowerCase);
                    }}
                  />

                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Gender
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={gender}
                      error={genderError}
                      label="Gender"
                      onChange={(e) => {
                        setGender(e.target.value.toLowerCase);
                      }}
                    >
                      <MenuItem value={"male"}>Male</MenuItem>
                      <MenuItem value={"female"}>Female</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Civil Status
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={civilStatus}
                      error={civilStatusError}
                      label="Civil Status"
                      onChange={(e) => {
                        setCivilStatus(e.target.value.toLowerCase);
                      }}
                    >
                      <MenuItem value={"single"}>Single</MenuItem>
                      <MenuItem value={"married"}>Married</MenuItem>
                      <MenuItem value={"divorced"}>Divorced</MenuItem>
                      <MenuItem value={"widowed"}>Widowed</MenuItem>
                    </Select>
                  </FormControl>
                  <TextField
                    variant="outlined"
                    label="Nationality"
                    value={nationality}
                    onChange={(e) => {
                      setNationality(e.target.value.toLowerCase);
                    }}
                    error={nationalityError}
                  />
                  <TextField variant="outlined" label="Religion" />
                </Box>

                <Box marginTop="20px">
                  <Typography sx={{ margin: "10px 0" }} fontSize="14pt">
                    Address
                  </Typography>
                  <Box
                    sx={{
                      display: "grid",
                      width: "100%",
                      gridTemplateColumns: "1fr 1fr 1fr 1fr ",
                      gap: "20px",
                    }}
                  >
                    <TextField
                      variant="outlined"
                      label="Address"
                      error={addressError}
                      value={address}
                      onChange={(e) => {
                        setAddress(e.target.value.toLowerCase);
                      }}
                    />
                    <TextField
                      variant="outlined"
                      label="Municipality/City"
                      error={cityError}
                      value={city}
                      onChange={(e) => {
                        setCity(e.target.value.toLowerCase);
                      }}
                    />
                    <TextField
                      variant="outlined"
                      label="Province/Region"
                      error={provinceError}
                      value={province}
                      onChange={(e) => {
                        setProvince(e.target.value.toLowerCase);
                      }}
                    />
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box
              display="flex"
              width="100%"
              flexDirection="column"
              justifyContent="center"
              marginBottom="40px"
            >
              <Typography margin="0 0 25px 0" variant="h5">
                Contact Information
              </Typography>
              <Box
                sx={{
                  display: "grid",
                  width: "100%",
                  gridTemplateColumns: "1fr 1fr 1fr ",
                  gap: "20px",
                }}
              >
                <TextField
                  variant="outlined"
                  label="Email"
                  value={email}
                  error={emailError}
                  onChange={(e) => {
                    setEmail(e.target.value.toLowerCase);
                  }}
                />
                <TextField
                  variant="outlined"
                  label="Mobile Number"
                  error={mobileError}
                  value={mobile}
                  onChange={(e) => {
                    setMobile(e.target.value.toLowerCase);
                  }}
                />
                <TextField variant="outlined" label="Telephone Number" />
              </Box>
            </Box>
            <Box marginBottom="40px">
              <Typography variant="h5" sx={{ margin: "25px 0 10px 0" }}>
                Employment Information
              </Typography>
              <Box
                sx={{
                  display: "grid",
                  width: "100%",
                  gridTemplateColumns: "1fr 1fr 1fr ",
                  gap: "20px",
                }}
              >
                <TextField
                  disabled
                  variant="outlined"
                  label="Employee ID"
                  error={empIDError}
                  value={empID}
                  onChange={(e) => {
                    setEmpID(e.target.value.toLowerCase);
                  }}
                />
                <TextField
                  variant="outlined"
                  label="Department"
                  error={departmentError}
                  value={department}
                  onChange={(e) => {
                    setDepartment(e.target.value.toLowerCase);
                  }}
                />
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Position
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={position}
                    error={positionError}
                    label="Position"
                    onChange={(e) => {
                      setPosition(e.target.value.toLowerCase);
                    }}
                  >
                    <MenuItem value={"admin"}>Administrator</MenuItem>
                    <MenuItem value={"teacher"}>Teacher</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Box>
            <Box marginBottom="40px">
              <Typography variant="h5" sx={{ margin: "25px 0 10px 0" }}>
                Emergency Information
              </Typography>
              <Box
                sx={{
                  display: "grid",
                  width: "100%",
                  gridTemplateColumns: "1fr 1fr 1fr ",
                  gap: "20px",
                }}
              >
                <TextField
                  variant="outlined"
                  label="Contact Name"
                  error={contactNameError}
                  value={contactName}
                  onChange={(e) => {
                    setContactName(e.target.value.toLowerCase);
                  }}
                />
                <TextField
                  variant="outlined"
                  label="Relationship"
                  error={relationshipError}
                  value={relationship}
                  onChange={(e) => {
                    setRelationship(e.target.value.toLowerCase);
                  }}
                />
                <TextField
                  variant="outlined"
                  label="Contact Number"
                  error={emergencyNumberError}
                  value={emergencyNumber}
                  onChange={(e) => {
                    setEmergencyNumber(e.target.value.toLowerCase);
                  }}
                />
              </Box>
            </Box>
            <Box display="flex" justifyContent="end" height="70px">
              <Button
                type="button"
                variant="contained"
                sx={{ width: "250px", height: "50px" }}
                onClick={() => {
                  clearForm();
                }}
              >
                <Typography color="white" variant="h6" fontWeight={500}>
                  Cancel
                </Typography>
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="red"
                sx={{ width: "250px", height: "50px", ml: "20px" }}
              >
                <Typography color="white" variant="h6" fontWeight={500}>
                  Submit
                </Typography>
              </Button>
            </Box>
          </form>
        </Box>
      )}
    </>
  );
};

export default EmployeeForm;
