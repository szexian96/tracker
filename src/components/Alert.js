import { Snackbar } from "@material-ui/core";
import React from "react";
import { CryptoState } from "../CryptoContext";
import MuiAlert from "@material-ui/lab/Alert";

const Alert = () => {
  //Alert Button for checking

  const { alert, setAlert } = CryptoState();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setAlert({ open: false });
  };
  return (
    <Snackbar
      open={alert.open} 
      autoHideDuration={6000}
      onClose={handleClose}
    >
        <MuiAlert></MuiAlert>
    </Snackbar>
  );
};

export default Alert;
