import React, { useState, useEffect } from 'react';
import { Container, Grow, Box } from '@mui/material';
import { useDispatch } from 'react-redux';

import { getPosts } from '../../actions/posts';
import Posts from '../Posts/Posts';
import Form from '../Form/form';

import './styles.css';

const Home = () => {
  const [currentId, setCurrentId] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, [currentId, dispatch]);

  return (
    <Grow in>
      <Container maxWidth="xl" className="home-container">
        <Box className="home-box">
          <Box className="posts-section">
            <Posts setCurrentId={setCurrentId} />
          </Box>
          <Box className="form-section">
            <Form currentId={currentId} setCurrentId={setCurrentId} />
          </Box>
        </Box>
      </Container>
    </Grow>
  );
};

export default Home;
