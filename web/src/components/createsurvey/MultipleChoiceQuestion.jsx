import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Button, Grid } from '@material-ui/core';

import "./style.scss";

const useStyles = makeStyles(theme => ({
  multipleChoiceQuestionBox: {
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
    width: "100%",
  },
  itemList: {
    margin: "10px",
  },
  item: {
    width: "100%",
  }
}));

const MultipleChoiceQuestion = (props) => {
  const classes = useStyles();

  const [index, setIndex] = useState(1);

  const addSelectItem = () => {
    let data = {
      display_order: index, content: ""
    };
    var updatedSelects = props.selects
    updatedSelects.push(data)
    setIndex(index+1);
    props.selectListChange(props.questionIndex, updatedSelects)
  };

  const deleteSelectItem = display_order => () => {
    let tempRows = props.selects.filter(row => {
      return row.display_order !== display_order;
    });
    props.selectListChange(props.questionIndex, tempRows)
  };
  
  const selectTextChange = (event) => {
    for (var i = 0; i < props.selects.length; i++) {
      if (props.selects[i].display_order === Number(event.target.dataset.index)) {
        props.selects[i].content = event.target.value
        props.selectsChange(event.target.dataset.questionindex, i, event.target.value)
        break
      }
    }
    // setRows(...rows, [])
    // 
  }

  return(
    <div className={classes.multipleChoiceQuestionBox}>
        <div className={classes.questionField}>
          <b>질문 주제</b>&nbsp;&nbsp;&nbsp;<br/>
          <TextField
            className={classes.questionTitleInput}
            inputProps={{
              "data-index": props.index,
              "data-questionindex": props.questionIndex
            }}
            onChange={props.titleChange}
            error={!props.validList.surveyIsValid&&props.title===""}
          /><br/><br/>
        </div>
        <b>선택지</b><br/>
        <div className={classes.itemList}>
          {props.selects.length !== 0 && (
            props.selects.map(data => (
              <Grid container key={"grid-"+data.display_order}>
                <Grid item xs={10} sm={11}>
                <TextField
                  className={classes.item}
                  margin="dense"
                  variant="outlined"
                  onChange={selectTextChange} 
                  inputProps={{
                    "data-index": data.display_order,
                    "data-questionindex": props.questionIndex
                  }}
                  error={!props.validList.surveyIsValid&&data.content===""}
                /></Grid>
                <Grid item xs={2} sm={1}>
                  <Button onClick={deleteSelectItem(data.display_order)}>삭제</Button>
                </Grid>
              </Grid>
              ))
            )
          }
        </div>
        <div>
          <Button onClick={addSelectItem}>+ 선택지 추가</Button>
        </div>
    </div>
  );
}

export default MultipleChoiceQuestion;