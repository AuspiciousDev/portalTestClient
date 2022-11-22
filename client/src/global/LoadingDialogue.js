import React from "react";
import "./Loading.css";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  Paper,
  Box,
} from "@mui/material";
const LoadingDialogue = (props) => {
  
  const { loadingDialog, setLoadingDialog } = props;
  const handleClose = (event, reason) => {
    if (reason && reason === "backdropClick")
      return setLoadingDialog({ ...loadingDialog, isOpen: false });
  };
  return (
    <Dialog
      sx={{ textAlign: "center" }}
      open={loadingDialog.isOpen}
      onClose={handleClose}
    >
      <DialogContent>
        <div className="lds-ellipsis">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LoadingDialogue;
