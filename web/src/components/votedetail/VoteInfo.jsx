import { makeStyles } from '@material-ui/core/styles';
import VoteSelect from './VoteSelect';
import TextField from '@material-ui/core/TextField';
import React, { useEffect, useState } from "react";
import { Button, Paper, Grid, Typography } from "@material-ui/core";
import * as surveyAPI from "../../apis/surveyAPI";
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    width: "100%",
    padding: "0 40px"
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'left',
    color: theme.palette.text.secondary,
  },
  button: {
    display: "block",
    marginLeft: "auto",
  },
  shortAnswerQuestion: {
    margin: "auto",
    // margin: theme.spacing(3),
    width: "100%",

  },
  questionImage: {
    margin: "auto"
  },
  imageGrid: {
    display: "flex"
  },
  input: {
    width: "90%"
  }
}));

const VoteInfo = props => {
  const classes = useStyles();
  const [dataInput, setDataInput] = useState([])
  useEffect(()=>{
    surveyAPI.surveyDetailAndReview(props.index).then(response=>{
      // console.log("InReturn ::: ", response); 
      setDataInput(response.data)
      setDataOutput(response.data.map((data, index) => {
    
        if (Number(data.survey_type) === 1) {
          return {
            "survey_type": Number(data.survey_type),
            "id": -10000
          }
        }
        return {
          "survey_type": Number(data.survey_type),
          "id": data.id,
          "content": ""
        }
      }))
      setValid(response.data.map(asdf => { return true}))
    }).catch(error => {
      if(error.response.status===500){
        alert('이미 참여한 설문입니다!.')
        window.location.href='/'
      }
    })
  },[])
  const [dataOutput, setDataOutput] = useState([])
  const [valid, setValid] = useState([])

  const [sendValue, setSendValue] = React.useState([]);

  const setStatus = (index, value) => {
    dataOutput[index]["id"] = value
  };

  const textChange = (event) => {
    dataOutput[Number(event.target.dataset.index)]["content"] = event.target.value
    setDataOutput(dataOutput)
  };
  const validCheck = () => {
    let validList = []
    for (var data of dataOutput) {
      if (data.survey_type === 2) {
        if (data.content === "") {
          validList.push(false)
        }
        else {
          validList.push(true)
        }
      }
      else {
        if (data.id === -10000) {
          validList.push(false)
        }
        else {
          validList.push(true)
        }
      }
    }
    return validList
  }
    
  const submitSurvey = (event) => {
    let validList = validCheck()
    setValid(validList)
    if (validList.every(valid => {
      return valid;
    }))
    {
      surveyAPI.doSurvey(props.index, dataOutput).then(response=>{
        // console.log("doSurvey ::: ", response);
        window.location.href='/'
      })
    }
    else {
      //유효성 검사 실패
      alert('작성되지 않았거나 잘못 작성된 칸이 있습니다.')
    }
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        {
          dataInput.map((question, idx) => {
            return (
              <React.Fragment key={idx}>
                <Typography>
                  {question.title}
                </Typography>
                {/* {console.log(!valid[idx], dataOutput[idx])} */}
                {Number(question.survey_type)===1
                // ?(
                //   <Grid container>
                //     {question.image.split(' ').map((src, idx) => {
                //       return (
                //         <Grid item className={classes.imageGrid} xs={12} sm={6} md={4} lg={3} xl={2}>
                //           <img className={classes.questionImage} src={src} alt="..." />
                //         </Grid>
                //         )
                //     })}
                //   </Grid>
                //   )
                //   :
                //   ""}
                // {question.survey_type===1
                  ?
                    (
                      <VoteSelect
                        selects={question.list}
                        setValue={setStatus}
                        index={idx}
                        valid={valid[idx]}
                      />
                    )
                  :
                    (
                      <div className={classes.shortAnswerQuestion}>
                        <TextField
                          className={classes.input}
                          placeholder={"답변을 입력해 주세요"}
                          inputProps={{
                                        "data-index": idx,
                                        "data-id": question.id,
                                      }}
                          onChange={textChange}
                          value={sendValue.idx}
                          //error={!valid[idx]&&dataOutput[idx]["content"]===""}
                        />
                      </div>
                    )
                }
                <hr />
              </React.Fragment>
            );						
          })
        }
        <Button className={classes.button} variant="contained" color="primary" onClick={submitSurvey}>제출하기</Button>
      </Paper>
    </div>

  );
};

export default VoteInfo;