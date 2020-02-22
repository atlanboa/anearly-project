import React, { useState, useEffect} from "react";
import { Grid } from "@material-ui/core";
import PieGraph from "../components/main/PieGraph";
import { makeStyles } from '@material-ui/core/styles';
import * as surveyAPI from "../apis/surveyAPI";

const useStyles = makeStyles(theme => ({
  chart: {
    textAlign: "center",
    wordBreak: "break-all",
    fontSize: "20px",
    border: "1px solid black"
  },
}))
const VoteResult = props => {
  const classes = useStyles();
  const numberOfColors = 11;
  const [dataInput, setDataInput] = useState([]);
  const [questionList, setQuestionList] = useState([]);
  const [reviewDataInput, setReviewDataInput] = useState([]);
  useEffect(()=>{
    surveyAPI.getSurveyReviews(props.surveyId).then(response => {
      setReviewDataInput(response.data);
    })
    surveyAPI.surveyAnalysis(props.surveyId).then(response => {
      setDataInput(response.data);
      setQuestionList(response.data.map(data => {
        return {
          datasets: [
            {
              data: data.list.map(select => {
                return select.count
              }),
              backgroundColor: function () {
                var colorList = [
                  "rgb(255, 101, 99)",
                  "rgb(255, 175, 100)",
                  "rgb(239, 252, 101)",
                  "rgb(149, 250, 99)",
                  "rgb(112, 250, 120)",
                  "rgb(113, 252, 207)",
                  "rgb(106, 207, 255)",
                  "rgb(95, 105, 255)",
                  "rgb(147, 106, 255)",
                  "rgb(239, 110, 255)",
                  "rgb(255, 105, 176)",
                ]
                var i = 0;
                while (colorList.length < data.list.length) {
                  colorList.push(colorList[i++]);
                  if (i === numberOfColors) {
                    i = 0;
                  }
                }
                return colorList
              }
            }
          ],
          labels: data.list.map(select => {
            return select.content
          })
        }
      }))
    })
  },[])
  // const dataInput = [
  //   {
  //   "id": 33,
  //   "title": "당신은 흡연자인가요?",
  //   "list": [
  //     {
  //       "content": "아니다",
  //       "count": 2
  //     }
  //   ]
  // },
  // {
  //   "id": 34,
  //   "title": "이 제품을 구매할 의향이 있으십니까?",
  //   "list": [
  //     {
  //       "content": "보통이다",
  //       "count": 1
  //     },
  //     {
  //       "content": "아니다",
  //       "count": 1
  //     }
  //   ]
  // }
  // ]

  // const questionList = dataInput.map(data => {
  //   return {
  //     datasets: [
  //       {
  //         data: data.list.map(select => {
  //           return select.count
  //         }),
  //         backgroundColor: function () {
  //           var colorList = [
  //             "rgb(255, 101, 99)",
  //             "rgb(255, 175, 100)",
  //             "rgb(239, 252, 101)",
  //             "rgb(149, 250, 99)",
  //             "rgb(112, 250, 120)",
  //             "rgb(113, 252, 207)",
  //             "rgb(106, 207, 255)",
  //             "rgb(95, 105, 255)",
  //             "rgb(147, 106, 255)",
  //             "rgb(239, 110, 255)",
  //             "rgb(255, 105, 176)",
  //           ]
  //           var i = 0;
  //           while (colorList.length < data.list.length) {
  //             colorList.push(colorList[i++]);
  //             if (i === numberOfColors) {
  //               i = 0;
  //             }
  //           }
  //           return colorList
  //         }
  //       }
  //     ],
  //     labels: data.list.map(select => {
  //       return select.content
  //     })
  //   }
  // })

  return (
    <React.Fragment>
      <Grid container>
        {
          questionList.map((question, idx) => (
            <Grid
              item
              xs={12} sm={6} md={4} lg={3} xl={2}
              className={classes.chart}
              >
              <PieGraph
                data = {
                        {
                          datasets: question.datasets,
                          labels: question.labels,
                        }
                      }
                title = {dataInput[idx].title}
                style="text-align: center;"
              />
            </Grid>
          ))}
      </Grid>
      <hr/>
      <div>
        {
          reviewDataInput.map((question, idx) => {
            return (
              <React.Fragment>
                <p>주관식 질문 {idx+1}. {question.title}</p>
                {question.list.map(answer => (
                  <p>{answer.content}</p>
                ))}
                <hr/>
              </React.Fragment>
            )})
        }
      </div>
    </React.Fragment>
    
  );
};
export default VoteResult;