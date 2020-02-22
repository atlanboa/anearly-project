import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ToastEditor from "../../components/createsurvey/ToastEditor.js";

const useStyles = makeStyles(theme => ({
}));

const CreateSurveyDescription = (props) => {
  const classes = useStyles();
  return (
  <ToastEditor className={classes.toastEditor} setContent={props.setContent} />
  );
}

export default CreateSurveyDescription;