import React from "react";
import { useState } from "react";
import { Box, Button, TextField } from "@material-ui/core";

const SignUp = ({ handleClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = () => { //if the comfirm password not same with password
    if (password!==confirmPassword){
      
    }
  };

  return (
    <Box
      p={3}
      style={{ display: "flex", flexDirection: "column", gap: "20px" }}
    >
      <TextField
        variant="outlined"
        type="email"
        label="Enter Email"
        value={email} //state
        onChange={(e) => setEmail(e.target.value)} //change the state of value
        fullWidth
      />
      <TextField
        variant="outlined"
        type="password"
        label="Enter Password"
        value={password} //state
        onChange={(e) => setPassword(e.target.value)} //change the state of value
        fullWidth
      />
      <TextField
        variant="outlined"
        type="password"
        label="Confirm Password"
        value={confirmPassword} //state
        onChange={(e) => setConfirmPassword(e.target.value)} //change the state of value
        fullWidth
      />
      <Button
        variant="contained"
        size="large"
        style ={{backgroundColor: "#66fcf1"}}
        onClick={handleSubmit} //a handleSubmit Button
      >
        SIGN UP
      </Button>
    </Box>
  );
};

export default SignUp;
