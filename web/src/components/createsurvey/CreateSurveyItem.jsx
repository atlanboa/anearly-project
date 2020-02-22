import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(theme => ({
  item: {
    width: "80%",
    marginRight: "10px",
    border: "1px solid #B3B6B7",
    padding: "0px",
  },
}));

export default function CreateSurveyItem() {
  const classes = useStyles();
  return (
    <TextField margin="dense" className={classes.item} variant="outlined" />
  );
}