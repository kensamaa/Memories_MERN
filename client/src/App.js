import React, { useEffect } from "react";
import { Container, AppBar, Typography, Grow, Grid } from "@material-ui/core";
import memories from "./imgs/memories.png";
import Posts from "./components/posts/Posts.js";
import Form from "./components/form/Form.js";
import useStyles from "./styles";
import { useDispatch } from "react-redux";
import { getPosts } from "./actions/posts";
const App = () => {
  const classes = useStyles();
  const dispach = useDispatch();
  //dispach actions
  useEffect(() => {
    dispach(getPosts());
  }, [dispach]);
  return (
    <Container maxWidth="lg">
      <AppBar className={classes.appBar} position="static" color="inherit">
        <Typography className={classes.heading} variant="h2" align="center">
          Memories
        </Typography>
        <img className={classes.image} src={memories} alt="icon" height="60" />
      </AppBar>
      <Grow in>
        <Container>
          <Grid
            container
            justify="space-between"
            alignItems="stretch"
            spacing={3}
          >
            <Grid item xs={12} sm={7}>
              <Posts />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Form />
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>
  );
};
export default App;
