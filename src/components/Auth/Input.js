import React from 'react';
import { TextField, Grid, InputAdornment, IconButton } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const Input = ({ 
  name, 
  handleChange, 
  label, 
  half, 
  autoFocus, 
  type, 
  handleShowPassword,
  error,
  helperText
}) => (
  <Grid item xs={12} sm={half ? 6 : 12}>
    <TextField
      name={name}
      onChange={handleChange}
      variant="outlined"
      required
      fullWidth
      label={label}
      autoFocus={autoFocus}
      type={type}
      error={error}
      helperText={helperText}
      InputProps={
        name === 'password' 
          ? {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton 
                    onClick={handleShowPassword} 
                    edge="end"
                    aria-label="toggle password visibility"
                  >
                    {type === 'password' ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }
          : undefined
      }
      sx={{
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: 'primary.main',
          },
          '&:hover fieldset': {
            borderColor: 'primary.dark',
          },
          '&.Mui-focused fieldset': {
            borderWidth: 2,
          },
        },
        margin: '8px 0'
      }}
    />
  </Grid>
);

export default Input;