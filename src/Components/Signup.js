import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Config/firebaseInitialise";
import { useNavigate } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export default function Signup() {
  const [email, setEmail] = React.useState("");
  const [password, setpassword] = React.useState("");
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    console.log(email, password);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        alert("Signup sucessfully..");
        navigate("/todos");

        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
        // ..
      });
  };
  return (
    <div style={{ height: "100vh", width: "100vw", paddingTop: "90px" }}>
      <Box
        maxWidth="sm"
        component="form"
        autoComplete="off"
        sx={{
          margin: "auto",
          boxShadow: 3,
          backgroundColor: "rgba(251, 251, 240,0.5)",
          borderRadius: "20px",
          border: "1px solid rgba(252, 252, 20,0.4)",
          padding: "40px 2px"
        }}
      >
        <h2>SignUp</h2>
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          rowSpacing={6}
        >
          <Grid item>
            <AccountCircleIcon sx={{ fontSize: "150px", color: "#888484" }} />
          </Grid>
          <Grid item xs={12}>
            <TextField
              type="email"
              id="standard-basic"
              label="Enter User Name"
              variant="standard"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              sx={{ width: { sm: "350px", xs: "280px" } }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              type="password"
              id="standard-basic"
              label="Password"
              variant="standard"
              value={password}
              onChange={(e) => {
                setpassword(e.target.value);
              }}
              sx={{ width: { sm: "350px", xs: "280px" } }}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              onClick={handleSignup}
              type="submit"
              variant="contained"
              sx={{
                width: "250px",
                backgroundColor: "rgb(255,140,0)",
                "&:hover": { backgroundColor: "rgb(255,165,0)" }
              }}
            >
              SignUp
            </Button>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
