import { Box, Button, TextField } from '@material-ui/core';
import React, { useState } from 'react'

const Login = ({ handleClose }) => {
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {};
  
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
      <Button
        variant="contained"
        size="large"
        style ={{backgroundColor: "#66fcf1"}}
        onClick={handleSubmit} //a handleSubmit Button
      >
        LOGIN
      </Button>
    </Box>
  );
};

export default Login