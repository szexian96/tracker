import React from "react";
import { useState } from "react";
import { Box, Button, TextField } from "@material-ui/core";
import { CryptoState } from "../../CryptoContext";
import { auth } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

const SignUp = ({ handleClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { setAlert } = CryptoState();

  const handleSubmit = async () => {
    //if the comfirm password not same with password
    if (password !== confirmPassword) {
      setAlert({
        open: true,
        message: "Password does not match",
        type: "error",
      });
      return;
    }

    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      console.log(result);
      handleClose();

      setAlert({
        open: true,
        message: `Sign Up Successful. Welcome ${result.user.email}`,
        type: "success",
      });
    } catch (error) {

      setAlert({
        open: true,
        message: error.message,
        type: "error",
      });
      return;
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
        style={{ backgroundColor: "#66fcf1" }}
        onClick={handleSubmit} //a handleSubmit Button
      >
        SIGN UP
      </Button>
    </Box>
  );
};

export default SignUp;
