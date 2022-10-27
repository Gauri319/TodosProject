import React, { useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { db } from "../Config/firebaseInitialise";
import { onSnapshot, setDoc, doc, getDoc } from "firebase/firestore";
import { auth } from "../Config/firebaseInitialise";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import Checkbox from "@mui/material/Checkbox";
import EditButton from "./EditButton";

export default function Todos({ user }) {
  // ====================================Variables=====================================
  const [text, setText] = React.useState("");
  const [allTodos, setAllTodos] = React.useState([]);
  const [error, setError] = React.useState(false);
  const [edit, setEdit] = React.useState(false);
  const navigate = useNavigate();
  // ======================================csss========================================
  const style1 = {
    boxShadow: 3,
    backgroundColor: "rgba(251, 251, 240,0.7)",
    borderRadius: "15px",
    border: "1px solid rgba(252, 252, 20,1)",
    marginTop: "20px",
    height: "80px",
    padding: "10px"
  };
  const style2 = {
    maxHeight: "400px",
    margin: "30px auto",
    overflow: "auto"
  };
  // =====================================Functions========================================
  useEffect(() => {
    if (user) {
      const unsub = onSnapshot(doc(db, "todos", user.uid), (doc) => {
        if (doc.exists) {
          setAllTodos(doc.data().todos);
        } else {
          console.log("no such document");
        }
      });
    } else {
      console.log("no such user");
    }
  }, []);

  // =================================================================================
  const deleteTodo = async (deledata) => {
    const docRef = doc(db, "todos", user.uid);
    const docSnap = await getDoc(docRef);

    const arr = docSnap.data().todos.filter((ele) => {
      return ele != deledata;
    });
    await setDoc(doc(db, "todos", user.uid), {
      todos: [...arr]
    });
  };
  // ====================================================================================
  const addTodos = async (e) => {
    e.preventDefault();
    if (text == "") {
      setError(true);
      return;
    }
    try {
      const docRef = await setDoc(doc(db, "todos", user.uid), {
        todos: [text, ...allTodos]
      });
      setText("");
    } catch (err) {
      alert("document not added" + err);
    }
  };
  // =====================================================================================
  const logOut = (e) => {
    e.preventDefault();
    alert("you exit from this page");
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        // An error happened.
        alert(error);
      });
  };
  // ======================================================================================

  const editTodos = async (data, index) => {
    if (edit) {
      const docRef = doc(db, "todos", user.uid);
      const docSnap = await getDoc(docRef);

      const arr = docSnap.data().todos.map((ele, i) => {
        if (i == index) {
          return (ele = text);
        }
        return ele;
      });
      await setDoc(doc(db, "todos", user.uid), {
        todos: [...arr]
      });
      setText("");
    } else {
      setText(data);
    }
    setEdit(!edit);
  };
  // ==========================================================================================
  return (
    <div style={{ height: "100vh", width: "100vw", paddingTop: "100px" }}>
      <Button
        sx={{
          backgroundColor: "red",
          color: "white",
          position: "absolute",
          top: "4%",
          right: "30%"
        }}
        onClick={logOut}
      >
        Logout
      </Button>
      <Box
        maxWidth="sm"
        component="form"
        sx={{
          margin: "auto",
          boxShadow: 3,
          backgroundColor: "rgba(251, 251, 240,0.7)",
          borderRadius: "20px",
          border: "1px solid rgba(252, 252, 20,1)",
          height: "250px",
          padding: "10px"
        }}
      >
        <form>
          <Grid
            container
            alignItems="center"
            justifyContent="center"
            sx={{ height: "200px" }}
          >
            <Grid item xs={12}>
              <h1>Add Your Todos</h1>
            </Grid>
            <Grid item xs={12} sm={8}>
              <TextField
                type="text"
                id="standard-basic"
                label="Enter Text here"
                variant="standard"
                value={text}
                onChange={(e) => {
                  setError(false);
                  setText(e.target.value);
                }}
                sx={{ width: { sm: "350px", xs: "80%" } }}
              />
              <p style={{ color: "red", display: error ? "block" : "none" }}>
                Write some text here
              </p>
            </Grid>
            <Grid itemsm={4} xs={12} sm={4}>
              <Button
                onClick={addTodos}
                type="submit"
                variant="contained"
                sx={{
                  margin: "8px",
                  width: "180px",
                  backgroundColor: "rgb(255,140,0)",
                  "&:hover": { backgroundColor: "rgb(255,165,0)" }
                }}
              >
                ADD
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>

      <Grid container maxWidth="sm" sx={style2}>
        {allTodos.map((data, index) => {
          return (
            <Grid
              container
              xs={12}
              sx={style1}
              direction="row"
              justifyContent="center"
              alignItems="center"
              key={index}
            >
              <Grid item xs={2}>
                <Checkbox color="secondary" />
              </Grid>
              <Grid xs={8} item sx={{ overflow: "auto", textAlign: "start" }}>
                <p>{data}</p>
              </Grid>
              <Grid item xs={1}>
                <Button
                  onClick={(e) => {
                    e.preventDefault();
                    editTodos(data, index);
                  }}
                >
                  <EditButton edit={edit} />
                </Button>
              </Grid>
              <Grid item xs={1}>
                <Button
                  onClick={() => {
                    deleteTodo(data);
                  }}
                >
                  <HighlightOffIcon sx={{ color: "rgb(255,140,0)" }} />
                </Button>
              </Grid>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
}
