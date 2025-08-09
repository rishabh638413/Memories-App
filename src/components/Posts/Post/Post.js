import React, { useState } from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Dialog,
  DialogContent,
  IconButton,
  Chip,
  Box,
} from "@mui/material";
import {
  ThumbUpAlt,
  Delete,
  MoreHoriz,
  ThumbUpAltOutlined,
  Visibility,
} from "@mui/icons-material";
import { useDispatch } from "react-redux";
import moment from "moment";

import { likePost, deletePost } from "../../../actions/posts";
import "./styles.css";

const Post = ({ post, setCurrentId }) => {
  const dispatch = useDispatch();
  const [imageOpen, setImageOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState(null);
  const user = JSON.parse(localStorage.getItem("profile"));

  const Likes = () => {
    if (post.likes.length > 0) {
      return post.likes.find((like) => like === user?.result?._id) ? (
        <>
          <ThumbUpAlt fontSize="small" />
          &nbsp;
          {post.likes.length > 2
            ? `You and ${post.likes.length - 1} others`
            : `${post.likes.length} like${post.likes.length > 1 ? "s" : ""}`}
        </>
      ) : (
        <>
          <ThumbUpAltOutlined fontSize="small" />
          &nbsp;{post.likes.length} {post.likes.length === 1 ? "Like" : "Likes"}
        </>
      );
    }

    return (
      <>
        <ThumbUpAltOutlined fontSize="small" />
        &nbsp;Like
      </>
    );
  };

  const handleDelete = async () => {
    setError(null);
    setDeleting(true);
    try {
      await dispatch(deletePost(post._id));
    } catch (err) {
      if (err.response) {
        if (err.response.status === 404) {
          setError("Post not found. It may have already been deleted.");
        } else if (err.response.status === 500) {
          setError("Server error. Please try again later.");
        } else {
          setError(`Error: ${err.response.data.message || "Unknown error"}`);
        }
      }  else {
        setError("Failed to delete post. Please try again.");
      }
      console.error("Delete error details:", err);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <Card className="card">
      <Dialog open={imageOpen} onClose={() => setImageOpen(false)}>
        <DialogContent>
          <img
            src={post.selectedFile}
            alt={post.title}
            className="preview-image"
          />
        </DialogContent>
      </Dialog>

      {post.selectedFile ? (
        <CardMedia
          className="media"
          image={post.selectedFile}
          title={post.title}
          onClick={() => setImageOpen(true)}
        />
      ) : (
        <Box className="media">No Image</Box>
      )}

      <Box className="overlay">
        <Typography variant="subtitle2">{post.name}</Typography>
        <Typography variant="caption">
          {moment(post.createdAt).fromNow()}
        </Typography>
      </Box>

      {user?.result?._id === post?.creator && (
        <Box className="overlay2">
          <IconButton onClick={() => setCurrentId(post._id)} size="small">
            <MoreHoriz />
          </IconButton>
        </Box>
      )}

      <CardContent className="cardContent">
        <Box className="details">
          {post.tags.map((tag, index) => (
            <Chip
              key={index}
              label={`#${tag}`}
              size="small"
              className="tag-chip"
            />
          ))}
        </Box>

        <Typography className="title" variant="h6" component="h2">
          {post.title}
        </Typography>

        <Typography className="clamped-text" variant="body2" color="text.secondary">
          {post.message}
        </Typography>
      </CardContent>

      <CardActions className="cardActions">
        <Button
          size="small"
          variant="outlined"
          color="primary"
          disabled={!post.selectedFile}
          onClick={() => setImageOpen(true)}
          startIcon={<Visibility fontSize="small" />}
        >
          View Image
        </Button>

        <Box className="action-buttons">
          <Button
            size="small"
            color="primary"
            disabled={!user?.result}
            onClick={() => dispatch(likePost(post._id))}
          >
            <Likes />
          </Button>

          {user?.result?._id === post?.creator && (
            <Button
              size="small"
              color="error"
              onClick={handleDelete}
              disabled={deleting}
              startIcon={<Delete fontSize="small" />}
            >
              {deleting ? "Deleting..." : "Delete"}
            </Button>
          )}
        </Box>
      </CardActions>

      {error && (
        <Typography className="error" variant="body2" color="error">
          {error}
        </Typography>
      )}
    </Card>
  );
};

export default Post;
