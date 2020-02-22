import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

import "./style.scss";
import DraggableUploader from "./DraggableUploader";

const useStyles = makeStyles(theme => ({
  wholebox: {
    width: "100%",
    padding: "20px",
    marginBottom: "5px",
    clear: "both",
    float: "left",
    backgroundColor: "#D0D3D4",
  },
  questionField: {
    marginTop: "20px",
  },
  questionTitleInput: {
    width: "90%",
  },
}));

const ShortAnswerQuestion = (props) => {
  const classes = useStyles();

  return(
    <div className={classes.wholebox}>
        <div className={classes.questionField}>
          <b>질문 주제</b>&nbsp;&nbsp;&nbsp;<br/>
          <TextField
            className={classes.questionTitleInput}
            inputProps={{
              "data-questionindex": props.questionIndex
            }}
            onChange={props.titleChange}
          /><br/><br/>
        </div>
    </div>
  );
}

export default ShortAnswerQuestion;