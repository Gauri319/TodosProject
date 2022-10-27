import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Config/firebaseInitialise";
import { useNavigate } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export default function Login() {
  // =======================================Variables==================================================
  const [email, setEmail] = React.useState("");
  const [password, setpassword] = React.useState("");

  const navigate = useNavigate();

  // ======================================Functions==========================================================
  const signUp = () => {
    navigate("/signup");
  };
  //  ***********************************************************************
  const handleLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        setEmail("");
        setpassword("");
        alert("login sucessFull");
        navigate("/todos");
      })
      .catch((error) => {
        const errorMessage = error.message;
        alert(errorMessage);
      });
  };
  // *************************************************************************
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
        <h2>Login</h2>
        <Grid
          container
          maxWidth="sm"
          direction="column"
          justifyContent="center"
          alignItems="center"
          rowSpacing={4}
        >
          <Grid item>
            <AccountCircleIcon sx={{ fontSize: "150px", color: "#888484" }} />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              type="emial"
              id="standard-basic"
              label="Enter User name"
              variant="standard"
              value={email}
              size="small"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              sx={{ width: { sm: "350px", xs: "280px" } }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              type="password"
              id="standard-basic"
              label="Password"
              variant="standard"
              size="small"
              value={password}
              onChange={(e) => {
                setpassword(e.target.value);
              }}
              sx={{ width: { sm: "350px", xs: "280px" } }}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              onClick={handleLogin}
              type="submit"
              variant="contained"
              sx={{
                width: "250px",
                backgroundColor: "rgb(255,140,0)",
                "&:hover": { backgroundColor: "rgb(255,165,0)" }
              }}
            >
              Login
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button
              onClick={signUp}
              type="submit"
              variant="contained"
              color="secondary"
              sx={{ width: "250px" }}
            >
              SignUp
            </Button>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
