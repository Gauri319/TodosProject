import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { auth } from "../Config/firebaseInitialise";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function Navbar({ user }) {
  const navigate = useNavigate();
  const logOut = () => {
    signOut(auth)
      .then(() => {
        alert("Logout sucessfull");
        navigate("/");
      })
      .catch((error) => {
        // An error happened.
        alert("Logout unsucessfull");
      });
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, color: "white" }}
          >
            <Link to="/todos">Todos</Link>
          </Typography>
          <Button
            sx={{ backgroundColor: "red", color: "white" }}
            onClick={logOut}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
