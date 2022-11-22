import React from "react";
import { useState, useEffect } from "react";
import { Box, Paper, Typography, Divider, ButtonBase } from "@mui/material";
import { useParams, Link, useNavigate } from "react-router-dom";
import { School, AdminPanelSettings, Badge } from "@mui/icons-material";

import LoadingDialogue from "../../../../global/LoadingDialogue";
import ConfirmDialogue from "../../../../global/ConfirmDialogue";
import SuccessDialogue from "../../../../global/SuccessDialogue";
import ErrorDialogue from "../../../../global/ErrorDialogue";
import ValidateDialogue from "../../../../global/ValidateDialogue";
import Loading from "../../../../global/Loading";

import { useEmployeesContext } from "../../../../hooks/useEmployeesContext";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import { format } from "date-fns-tz";
import { ModeEditOutlineOutlined } from "@mui/icons-material";

import { useTheme } from "@mui/material";
import { tokens } from "../../../../theme";

import NotFound404 from "../../../NotFound404";
const FacultyProfile = (props) => {
  const { id } = useParams();
  const [val, setVal] = useState([]);
  const [isloading, setIsLoading] = useState(false);
  const axiosPrivate = useAxiosPrivate();

  const navigate = useNavigate();

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

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
  const [validateDialog, setValidateDialog] = useState({
    isOpen: false,
    title: "",
    message: "",
  });

  const [loadingDialog, setLoadingDialog] = useState({
    isOpen: false,
    title: "",
    message: "",
  });

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
        if (!error.response) {
          console.log("no server response");
        } else if (error.response.status === 204) {
          setErrorDialog({
            isOpen: true,
            message: `${error.response.data.message}`,
          });
          navigate(-1);
          console.log(error.response.data.message);
        } else if (error.response.status === 400) {
          console.log(error.response.data.message);
          setIsLoading(false);
        } else {
          setErrorDialog({
            isOpen: true,
            message: `${error}`,
          });
          console.log(error);
        }
        setLoadingDialog({ isOpen: false });
        setIsLoading(false);
      }
    };
    getUsersDetails();
  }, []);

  console.log("testalng:", val);
  return (
    <Box className="contents-container">
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
      <ValidateDialogue
        validateDialog={validateDialog}
        setValidateDialog={setValidateDialog}
      />

      <LoadingDialogue
        loadingDialog={loadingDialog}
        setLoadingDialog={setLoadingDialog}
      />
      {isloading ? (
        <></>
      ) : val.firstName || val.email ? (
        <Box
        className="deleteScroll"
          gap={1}
          mt="20px"
          display="grid"
          paddingBottom="20px"
          sx={{
            height: { xs: "750px", sm: "100%" },
            width: { xs: "100%", sm: "100%" },
            gridTemplateColumns: { xs: "1fr", sm: "1fr 3fr" },
            padding: { xs: "0 20px 20px 20px" },
            overflow: "scroll",
          }}
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
                {val.empType.map((item, i) => {
                  return (
                    <ul
                      style={{
                        display: "flex",
                        padding: "0",
                        listStyle: "none",
                      }}
                    >
                      {item === 2001 ? (
                        <li>
                          <Paper
                            sx={{
                              display: "flex",
                              flexDirection: "row",
                              borderRadius: "10px",
                              padding: "10px 20px",
                              backgroundColor: colors.secondary[500],
                              color: colors.blackOnly[100],
                              alignItems: "center",
                            }}
                          >
                            <AdminPanelSettings />
                            <Typography sx={{ ml: "10px" }}>Admin</Typography>
                          </Paper>
                        </li>
                      ) : item === 2002 ? (
                        <li>
                          <Paper
                            sx={{
                              display: "flex",
                              flexDirection: "row",
                              borderRadius: "10px",
                              padding: "10px 20px",
                              backgroundColor: colors.primary[900],
                              color: colors.whiteOnly[100],
                              alignItems: "center",
                            }}
                          >
                            <Badge />
                            <Typography sx={{ ml: "10px" }}>Teacher</Typography>
                          </Paper>
                        </li>
                      ) : (
                        <></>
                      )}
                    </ul>
                  );
                })}
              </Box>
              <Link
                to={`/faculty/edit/${val?.empID}`}
                style={{
                  alignItems: "center",
                  color: colors.black[100],
                  textDecoration: "none",
                }}
              >
                <Paper
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    borderRadius: "20px",
                    padding: "5px 10px",
                  }}
                >
                  <ModeEditOutlineOutlined />

                  <Typography sx={{ ml: "10px" }}> Edit Profile</Typography>
                </Paper>
              </Link>
            </Box>
          </Paper>
          <Paper elevation={2}>
            <Box padding="20px" display="grid" gridTemplateRows="1fr">
              <Box
                sx={{ display: "flex", flexDirection: "column" }}
                padding="10px 10px 0 10px"
              >
                <Typography variant="h4">Employee Profile</Typography>
                <Box
                  mt="10px"
                  display="grid"
                  sx={{
                    gridTemplateColumns: {
                      xs: "1fr",
                      sm: "1fr 1fr 1fr",
                    },
                  }}
                >
                  <Box mt="10px" display="flex" flexDirection="row">
                    <Typography>Gender : </Typography>
                    <Typography ml="10px" textTransform="capitalize">
                      {val?.gender}
                    </Typography>
                  </Box>
                  <Box mt="10px" display="flex" flexDirection="row">
                    <Typography>Date of Birth : </Typography>
                    <Typography ml="10px" textTransform="capitalize">
                      {val?.dateOfBirth
                        ? format(new Date(val?.dateOfBirth), "MMMM dd, yyyy")
                        : ""}
                    </Typography>
                  </Box>

                  <Box mt="10px" display="flex" flexDirection="row">
                    <Typography>Civil Status : </Typography>
                    <Typography ml="10px" textTransform="capitalize">
                      {val?.civilStatus}
                    </Typography>
                  </Box>
                  <Box mt="10px" display="flex" flexDirection="row">
                    <Typography>Nationality : </Typography>
                    <Typography ml="10px" textTransform="capitalize">
                      {val?.nationality}
                    </Typography>
                  </Box>
                  <Box mt="10px" display="flex" flexDirection="row">
                    <Typography>Religion : </Typography>
                    <Typography ml="10px" textTransform="capitalize">
                      {val?.religion}
                    </Typography>
                  </Box>
                </Box>
                <Divider sx={{ mt: "20px" }} />
              </Box>
              <Box padding="20px 10px 0 10px">
                <Typography variant="h4"> Address Information</Typography>
                <Box
                  mt="10px"
                  display="grid"
                  sx={{
                    gridTemplateColumns: {
                      xs: "1fr",
                      sm: "1fr 1fr 1fr",
                    },
                  }}
                >
                  <Box mt="10px" display="flex" flexDirection="row">
                    <Typography>Address : </Typography>
                    <Typography ml="10px" textTransform="capitalize">
                      {val?.address}
                    </Typography>
                  </Box>
                  <Box mt="10px" display="flex" flexDirection="row">
                    <Typography>City : </Typography>
                    <Typography ml="10px" textTransform="capitalize">
                      {val?.city}
                    </Typography>
                  </Box>
                  <Box mt="10px" display="flex" flexDirection="row">
                    <Typography>Province : </Typography>
                    <Typography ml="10px" textTransform="capitalize">
                      {val?.province}
                    </Typography>
                  </Box>
                </Box>
                <Divider sx={{ mt: "20px" }} />
              </Box>
              <Box padding="20px 10px 0 10px">
                <Typography variant="h4">Contact Information</Typography>
                <Box
                  mt="10px"
                  display="grid"
                  sx={{
                    gridTemplateColumns: {
                      xs: "1fr",
                      sm: "1fr 1fr 1fr",
                    },
                  }}
                >
                  <Box mt="10px" display="flex" flexDirection="row">
                    <Typography>Email : </Typography>
                    <Typography ml="10px">{val?.email}</Typography>
                  </Box>
                  <Box mt="10px" display="flex" flexDirection="row">
                    <Typography>Telephone : </Typography>
                    <Typography ml="10px">{val?.telephone}</Typography>
                  </Box>
                  <Box mt="10px" display="flex" flexDirection="row">
                    <Typography>Mobile Number : </Typography>
                    <Typography ml="10px">{val?.mobile}</Typography>
                  </Box>
                </Box>
                <Divider sx={{ mt: "20px" }} />
              </Box>
              <Box padding="20px 10px 10px 10px">
                <Typography variant="h4">Emergency Information</Typography>
                <Box
                  mt="10px"
                  display="grid"
                  sx={{
                    gridTemplateColumns: {
                      xs: "1fr",
                      sm: "1fr 1fr 1fr",
                    },
                  }}
                >
                  <Box mt="10px" display="flex" flexDirection="row">
                    <Typography>Contact Name : </Typography>
                    <Typography ml="10px" textTransform="capitalize">
                      {val?.emergencyName}
                    </Typography>
                  </Box>
                  <Box mt="10px" display="flex" flexDirection="row">
                    <Typography>Contact Relationship :</Typography>
                    <Typography ml="10px" textTransform="capitalize">
                      {val?.emergencyRelationship}
                    </Typography>
                  </Box>
                  <Box mt="10px" display="flex" flexDirection="row">
                    <Typography>Contact Number :</Typography>
                    <Typography ml="10px">{val?.emergencyNumber} </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Paper>
        </Box>
      ) : (
        <NotFound404 />
      )}
    </Box>
  );
};

export default FacultyProfile;
