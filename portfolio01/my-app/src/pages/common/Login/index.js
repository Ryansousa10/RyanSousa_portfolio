import React, { useState } from "react";
import { Grid, TextField, Button } from "@material-ui/core";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../services/firebase";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin(e) {
    signInWithEmailAndPassword(auth, username, password)
      .then((userCredential) => {
        console.log(userCredential);
        // Signed in
        const user = userCredential.user;
        // ...
      })
      .catch((error) => {
        setUsername("");
        setPassword("");
        const errorMessage = alert("Usuário ou senha inválidos!");
      });

    e.preventDefault();
  }

  return (
    <Grid
      container
      spacing={3}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: "100vh" }}
    >
      <Grid item xs={12}>
        <h1>Login</h1>
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Email"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          fullWidth
          style={{ width: 250 }}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          style={{ width: 250 }}
        />
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" color="primary" onClick={handleLogin}>
          Sign In
        </Button>
      </Grid>
    </Grid>
  );
}

export default Login;
