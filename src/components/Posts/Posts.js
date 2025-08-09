import React from "react";
import { useSelector } from "react-redux";
import { Grid, CircularProgress, Box } from "@mui/material";
import "./styles.css";
import Post from "./Post/Post";

const Posts = ({ setCurrentId }) => {
  const posts = useSelector((state) => state.posts);
  const auth = useSelector((state) => state.auth);

  const gridWidth = auth?.authData ? "730px" : "805px";

  if (!posts || posts.length === 0) {
    return (
      <Box className="loading-box">
        <CircularProgress size={60} thickness={4} color="primary" />
      </Box>
    );
  }

  return (
    <Grid container spacing={2} className="posts-container" style={{ width: gridWidth }}>
      {posts.map((post) => (
        <Grid
          key={post._id}
          item
          xs={12}
          sm={6}
          md={4}
          lg={4}
          className="post-grid-item"
        >
          <Box className="post-wrapper">
            <Post post={post} setCurrentId={setCurrentId} />
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};

export default Posts;
