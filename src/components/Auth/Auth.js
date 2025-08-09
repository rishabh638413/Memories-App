import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import "./styles.css";
import { useSnackbar } from "notistack";

import { signin, signup } from "../../actions/auth";
import Input from "./Input";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUp = () => {
  const [isSignup, setIsSignup] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState(initialState); //ye form ki values store krta hai
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword(!showPassword);

  const switchMode = () => {
    setForm(initialState);
    setIsSignup((prevIsSignup) => !prevIsSignup);
    setShowPassword(false);
  };
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isSignup) {
        await dispatch(signup(form, navigate));
        enqueueSnackbar("Signup Successful", { variant: "success" });
      } else {
        await dispatch(signin(form, navigate));
        enqueueSnackbar("Login Successful", { variant: "success" });
      }
    } catch (error) {
      enqueueSnackbar(
        error?.response?.data?.message || "Something went wrong",
        {
          variant: "error",
        }
      );
    }
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <Container component="main" maxWidth="xs" className="auth-container">
      <Paper elevation={6} className="auth-paper">
        <Avatar className="auth-avatar">
          <LockOutlinedIcon fontSize="large" />
        </Avatar>
        <Typography component="h1" variant="h5" className="auth-title">
          {isSignup ? "Sign up" : "Sign in"}
        </Typography>

        <form
          className="auth-form"
          onSubmit={handleSubmit}
          style={{ width: "100%" }}
          noValidate
        >
          <Grid container spacing={2}>
            {isSignup && (
              <>
                <Input
                  name="firstName"
                  label="First Name"
                  handleChange={handleChange}
                  autoFocus
                  half
                />
                <Input
                  name="lastName"
                  label="Last Name"
                  handleChange={handleChange}
                  half
                />
              </>
            )}
            <Input
              name="email"
              label="Email Address"
              handleChange={handleChange}
              type="email"
            />
            <Input
              name="password"
              label="Password"
              handleChange={handleChange}
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
            />
            {isSignup && (
              <Input
                name="confirmPassword"
                label="Repeat Password"
                handleChange={handleChange}
                type="password"
              />
            )}
          </Grid>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className="auth-submit"
          >
            {isSignup ? "Sign Up" : "Sign In"}
          </Button>

          <Grid container justifyContent="flex-end">
            <Grid item>
              <Button
                onClick={switchMode}
                color="primary"
                className="auth-switch"
              >
                {isSignup
                  ? "Already have an account? Sign in"
                  : "Don't have an account? Sign Up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default SignUp;
