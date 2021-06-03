import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { useTheme, Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      marginTop: '25px',
      width: '100%',
    },
  },
}));

const MessageBox = () => {
  const theme = useTheme();
  const classes = useStyles(theme);
  // eslint-disable-next-line no-unused-vars
  const [value, setValue] = React.useState('Controlled');
  // eslint-disable-next-line no-unused-vars
  const handleChange = (event) => {
    setValue(event.target.value);
  };
  return (
    <form className={classes.root} noValidate autoComplete="off">
      <TextField
        id="outlined-multiline-static"
        label="Have a question?"
        multiline
        rows={10}
        placeholder="Please describe your question in detail:"
        defaultValue=""
        variant="outlined"
      />
      <div style={{ textAlign: 'right', marginTop: 15 }}>
        <Button variant="contained" color="primary">
          Submit
        </Button>
      </div>
    </form>
  );
};

export default MessageBox;
