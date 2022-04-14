import React, { useState } from "react";
import {
  Container,
  Typography,
  Grid,
  Avatar,
  Paper,
  Button,
} from "@material-ui/core";
import { GoogleLogin } from "react-google-login";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import useStyles from "./styles.js";
import Input from "./Input";
import Icon from "./icon.js";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { signin, signup } from "../../actions/auth";
const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};
const Auth = () => {
  const [showPassword, setShowPassword] = useState(false);
  const classes = useStyles();
  const [isSignup, setIsSigneUp] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const history = useHistory();
  const dispatch = useDispatch();

  const handlSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    if (isSignup) {
      dispatch(signup(formData, history));
    } else {
      dispatch(signin(formData, history));
    }
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const switchMode = () => {
    setIsSigneUp((revIsSignup) => !revIsSignup);
    HandleShowPassword(false);
  };
  //if it off turn it on if on turn it off
  const HandleShowPassword = () =>
    setShowPassword((prevShowPassword) => !prevShowPassword);
  const googleSuccess = async (res) => {
    const result = res?.profileObj; //if we do not use ?. it will say cannot get property profileobj of undifined
    const token = res?.tokenId;
    try {
      dispatch({ type: "AUTH", data: { result, token } });
      //redirect to main home
      history.push("/");
    } catch (error) {
      console.log(error);
    }
  };
  const googlefailure = (error) => {
    console.log(error);
    console.log("google sign in was unsuccessful . try later");
  };
  return (
    <Container component="main" maxWidth="xs">
      <Paper classename={classes.paper} elevation={3}>
        <Avatar classename={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5">{isSignup ? "SignUp" : "SignIn"}</Typography>
        <form classename={classes.form} onSubmit={handlSubmit}>
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
              label="email adresse"
              handleChange={handleChange}
              type="email"
            />
            <Input
              name="password"
              label="password"
              handleChange={handleChange}
              type={showPassword ? "text" : "password"}
              HandleShowPassword={HandleShowPassword}
            />
            {isSignup && (
              <Input
                name="confirmPassword"
                label="repeat password"
                handleChange={handleChange}
                type="password"
              />
            )}
          </Grid>

          <Button type="submit" fullWidth variant="contained" color="primary">
            {isSignup ? "Sign up" : "Sign in"}
          </Button>
          <GoogleLogin
            clientId="545802733651-ees9ae2329v1m7so461h2cctv3uh7neh.apps.googleusercontent.com"
            render={(renderProps) => (
              <Button
                classename={classes.googleButton}
                color="primary"
                fullWidth
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                startIcon={<Icon />}
                variant="contained"
              >
                Google Sign In
              </Button>
            )}
            onSuccess={googleSuccess}
            onFailure={googlefailure}
            cookiePolicy="single_host_origin"
          />
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                {isSignup
                  ? "already have a account sign in "
                  : "dont have a account sign up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
