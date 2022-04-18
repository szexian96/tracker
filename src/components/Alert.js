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
    //show the error bar
    <Snackbar
      open={alert.open} 
      autoHideDuration={6000}
      onClose={handleClose}
    >
        {/*show the alert message*/}
        <MuiAlert
        onClose = {handleClose} // callback when the component requests to closed
        elevation={10}//shadow like behind
        variant="filled"
        severity={alert.type}
        >
          {alert.message}
        </MuiAlert>
    </Snackbar>
  );
};

export default Alert;
