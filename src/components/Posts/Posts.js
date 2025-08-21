import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  Grid,
  CircularProgress,
  Box,
  Pagination,
  Typography,
} from "@mui/material";
import "./styles.css";
import { useLocation } from "react-router-dom";
import Post from "./Post/Post";

const Posts = ({ setCurrentId }) => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const tags = query.get("tags") || "";

  const posts = useSelector((state) => state.posts);
  const auth = useSelector((state) => state.auth);

  const gridWidth = auth?.authData ? "730px" : "805px";

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(6); // Number of posts per page

  // Reset to first page when tags change
  useEffect(() => {
    setCurrentPage(1);
  }, [tags]);

  // Calculate pagination values
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(posts.length / postsPerPage);

  // Handle page change
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!posts || posts.length === 0) {
    return (
      <Box className="loading-box">
        <CircularProgress size={60} thickness={4} color="primary" />
      </Box>
    );
  }

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Grid
        container
        spacing={2}
        className={`posts-container ${
          currentPosts.length === 1 ? "single-post-page" : ""
        }`}
        style={{ width: gridWidth, marginBottom: "20px" }}
      >
        {currentPosts.map((post) => (
          <Grid
            key={post._id}
            item
            xs={12}
            sm={currentPosts.length === 1 ? 6 : 6} // Adjust for single post
            md={currentPosts.length === 1 ? 4 : 4}
            lg={currentPosts.length === 1 ? 4 : 4}
            className="post-grid-item"
            style={currentPosts.length === 1 ? { margin: "0 auto" } : {}}
          >
            <Box
              className={`post-wrapper ${
                (currentPosts.length === 1 ? "single-post" : "",
                currentPosts.length === 2 ? "single-post" : "",
                currentPosts.length === 3 ? "single-post" : "",
                currentPosts.length === 4 ? "single-post" : "",
                currentPosts.length === 5 ? "single-post" : "")
              }`}
            >
              <Post post={post} setCurrentId={setCurrentId} />
            </Box>
          </Grid>
        ))}
      </Grid>

      {/* Pagination controls */}
      {totalPages > 1 && (
        <Box
          mt={3}
          display="flex"
          flexDirection="column"
          alignItems="center"
          className="pagination-container"
        >
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
            size="small"
          />
          <Typography
            variant="body2"
            color="textSecondary"
            className="posts-info"
          >
            Page {currentPage} of {totalPages}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default Posts;
