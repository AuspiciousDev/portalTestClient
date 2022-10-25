import { Box } from "@mui/system";
import { ValidationGroup, Validate, AutoDisabler } from "mui-validate";
import React, { useState } from "react";
import "../../../App.css";
import {
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
const EmployeeForm = () => {
  const [empID, setEmpID] = useState();
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [suffix, setSuffix] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [placeOfBirth, setPlaceOfBirth] = useState("");
  const [gender, setGender] = useState("");
  const [civilStatus, setCivilStatus] = useState("");
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

  function createData(Bulacan, Pampanga, Rizal) {
    return { Bulacan, Pampanga, Rizal };
  }

  const places = [createData("")];
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
    } else {
      console.log("MADAME ERROR");
    }
  };

  return (
    <Box
      className="tryLang"
      display="flex"
      width="100%"
      flexDirection="column"
      justifyContent="center"
    >
      <form onSubmit={handleSubmit} style={{ width: "100%" }}>
        {/* <Typography variant="h5">Registration</Typography> */}
        <Typography variant="h5" sx={{ margin: "25px 0 10px 0" }}>
          General Information
        </Typography>
        <Typography fontSize="14pt">Name</Typography>
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
              setFirstName(e.target.value);
            }}
          />
          <TextField
            variant="outlined"
            label="Middle Name"
            placeholder="Optional"
            value={middleName}
            onChange={(e) => {
              setMiddleName(e.target.value);
            }}
          />
          <TextField
            variant="outlined"
            label="Last Name"
            placeholder="Last Name"
            error={lastNameError}
            value={lastName}
            onChange={(e) => {
              setLastName(e.target.value);
            }}
          />
          <TextField
            variant="outlined"
            label="Suffix"
            placeholder="Sr./Jr./III"
            value={suffix}
            onChange={(e) => {
              setSuffix(e.target.value);
            }}
          />
        </Box>
        <Box>
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
                setPlaceOfBirth(e.target.value);
              }}
            />

            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Gender</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={gender}
                error={genderError}
                label="Gender"
                onChange={(e) => {
                  setGender(e.target.value);
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
                  setCivilStatus(e.target.value);
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
                setNationality(e.target.value);
              }}
              error={nationalityError}
            />
            <TextField variant="outlined" label="Religion" />
          </Box>

          <Box marginTop="20px">
            <Typography fontSize="14pt">Address</Typography>
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
                  setAddress(e.target.value);
                }}
              />
              <TextField
                variant="outlined"
                label="Municipality/City"
                error={cityError}
                value={city}
                onChange={(e) => {
                  setCity(e.target.value);
                }}
              />
              <TextField
                variant="outlined"
                label="Province/Region"
                error={provinceError}
                value={province}
                onChange={(e) => {
                  setProvince(e.target.value);
                }}
              />
            </Box>
          </Box>
        </Box>
        <Box
          display="flex"
          width="100%"
          flexDirection="column"
          justifyContent="center"
        >
          <Typography variant="h5" sx={{ margin: "25px 0 10px 0" }}>
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
              error={emailError}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <TextField
              variant="outlined"
              label="Mobile Number"
              error={mobileError}
              value={mobile}
              onChange={(e) => {
                setMobile(e.target.value);
              }}
            />
            <TextField variant="outlined" label="Telephone Number" />
          </Box>
        </Box>
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
            type="number"
            variant="outlined"
            label="Employee ID"
            error={empIDError}
            value={empID}
            onChange={(e) => {
              setEmpID(e.target.value);
            }}
          />
          <TextField
            variant="outlined"
            label="Department"
            error={departmentError}
            value={department}
            onChange={(e) => {
              setDepartment(e.target.value);
            }}
          />
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Position</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={position}
              error={positionError}
              label="Position"
              onChange={(e) => {
                setPosition(e.target.value);
              }}
            >
              <MenuItem value={"admin"}>Administrator</MenuItem>
              <MenuItem value={"teacher"}>Teacher</MenuItem>
            </Select>
          </FormControl>
          {/* <TextField
            variant="outlined"
            label="Position"
            error={positionError}
            value={position}
            onChange={(e) => {
              setPosition(e.target.value);
              setPositionError(false);
            }}
          /> */}
        </Box>
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
              setContactName(e.target.value);
            }}
          />
          <TextField
            variant="outlined"
            label="Relationship"
            error={relationshipError}
            value={relationship}
            onChange={(e) => {
              setRelationship(e.target.value);
            }}
          />
          <TextField
            variant="outlined"
            label="Contact Number"
            error={emergencyNumberError}
            value={emergencyNumber}
            onChange={(e) => {
              setEmergencyNumber(e.target.value);
            }}
          />
        </Box>

        <Box display="flex" sx={{ margin: "20px 0" }}>
          <Button
            type="submit"
            variant="contained"
            sx={{ width: "200px", height: "50px" }}
          >
            <Typography color="white" variant="h6" fontWeight={500}>
              Submit
            </Typography>
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default EmployeeForm;
