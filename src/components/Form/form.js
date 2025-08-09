import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Paper,
  Collapse,
  IconButton,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { createPost, updatePost } from "../../actions/posts";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import "./styles.css";

const Form = ({ currentId, setCurrentId }) => {
  const [postData, setPostData] = useState({
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });
  const [expanded, setExpanded] = useState(false);
  const post = useSelector((state) =>
    currentId ? state.posts.find((message) => message._id === currentId) : null
  );

  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));

  useEffect(() => {
    if (post) {
      setPostData(post);
      setExpanded(true);
    }
  }, [post]);

  const clear = () => {
    setCurrentId(0);
    setPostData({ title: "", message: "", tags: "", selectedFile: "" });
    setExpanded(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (currentId === 0) {
      dispatch(createPost({ ...postData, name: user?.result?.name }));
      clear();
    } else {
      dispatch(
        updatePost(currentId, { ...postData, name: user?.result?.name })
      );
      clear();
    }
  };

  if (!user?.result?.name) {
    return (
      <Paper className="welcome-paper">
        <Typography variant="h5" component="div" className="welcome-title">
          ✨ Welcome to Memories ✨
        </Typography>

        <Typography variant="body1" className="welcome-text">
          Sign in to create and share your memories with the world !
        </Typography>

        <Button
          variant="contained"
          color="secondary"
          href="/auth"
          className="signin-btn"
        >
          Sign In Now
        </Button>
      </Paper>
    );
  }

  return (
    <Paper className="form-container">
      <div className="form-header">
        <Typography variant="h5" className="form-title">
          {currentId ? `Editing: ${post?.title}` : "Create New Memory"}
        </Typography>
        <IconButton size="medium" onClick={() => setExpanded(!expanded)}>
          {expanded ? (
            <ExpandLessIcon fontSize="small" />
          ) : (
            <ExpandMoreIcon fontSize="small" />
          )}
        </IconButton>
      </div>

      <Collapse in={expanded}>
        <form
          autoComplete="off"
          noValidate
          onSubmit={handleSubmit}
          className="form-content"
        >
          <TextField
            name="title"
            variant="outlined"
            label="Title"
            fullWidth
            value={postData.title}
            onChange={(e) =>
              setPostData({ ...postData, title: e.target.value })
            }
            className="form-field"
          />

          <TextField
            name="message"
            variant="outlined"
            label="Message"
            fullWidth
            multiline
            rows={5}
            value={postData.message}
            onChange={(e) =>
              setPostData({ ...postData, message: e.target.value })
            }
            className="form-field"
          />

          <TextField
            name="tags"
            variant="outlined"
            label="Tags (comma separated)"
            fullWidth
            value={postData.tags}
            onChange={(e) =>
              setPostData({ ...postData, tags: e.target.value.split(",") })
            }
            className="form-field"
          />

          <div className="form-actions">
            <div className="upload-container">
              <input
                accept="image/*"
                type="file"
                id="file-upload"
                className="file-hidden"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (!file) return;

                  const reader = new FileReader();
                  reader.readAsDataURL(file);
                  reader.onload = () => {
                    setPostData({ ...postData, selectedFile: reader.result });
                  };
                }}
              />
              <label htmlFor="file-upload">
                <Button
                  variant="outlined"
                  component="span"
                  fullWidth
                  className="upload-btn"
                >
                  Upload Image
                </Button>
              </label>
            </div>

            <Button
              variant="contained"
              color="primary"
              type="submit"
              className="submit-btn"
            >
              {currentId ? "Update" : "Post"}
            </Button>

            <Button
              variant="outlined"
              color="secondary"
              onClick={clear}
              className="clear-btn"
            >
              Clear
            </Button>
          </div>

          {postData.selectedFile && (
            <div className="image-preview-container">
              <img
                src={postData.selectedFile}
                alt="Preview"
                className="image-preview"
              />
            </div>
          )}
        </form>
      </Collapse>
    </Paper>
  );
};

export default Form;
