import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Grid, TextField, Button } from "@material-ui/core";

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    if (isAuth) {
      navigate("/main");
    }
  }, [isAuth, navigate]);

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
        <h1>LOGIN</h1>
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
        <Button variant="contained" color="primary" onClick={""}>
          Sign In
        </Button>
      </Grid>
    </Grid>
  );
}

export default Login;
