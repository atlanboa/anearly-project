import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';

import MultipleChoiceQuestion from './MultipleChoiceQuestion';
import ShortAnswerQuestion from './ShortAnswerQuestion';
import { If, Then, Else } from 'react-if';

const useStyles = makeStyles(theme => ({
  ItemListTable: {
    width: "100%",
  }
}));

const CreateSurveyItemListZone = (props) => {
  const classes = useStyles();
  const [index, setIndex] = useState(0);

  // {
  //   타입survey_type
  //   질문주제title
  //   display_order
  //   선택지[
  //     {
  //       선택지 이름content: 선택지 1번,
  //       display_order: ,
  //     },             
  //   ]
  // }
  const addMultipleChoiceQuestion = () => {
    var updatedSurvey = props.survey
    updatedSurvey.push({ type: 1, title: "", display_order: index, id: index, selects: [
      {
        display_order: 0,
        content: "",
      }]})
    setIndex(index + 1)
    props.surveyChange(updatedSurvey)
  };

  const addShortAnswerQuestion = () => {
    var updatedSurvey = props.survey
    updatedSurvey.push({ type: 2, title: "", display_order: index, id: index})
    props.surveyChange(updatedSurvey)
    setIndex(index + 1)
  };

  const allDeleteRow = () => {
    props.surveyChange([])
  };

  const deleteRow = display_order => () => {
    let tempRows = props.survey.filter(row => {
      return row.display_order !== display_order;
    });
    props.surveyChange(tempRows)
  }; 
  
  // const display = () => {console.log(rows); };

  const selectsChange = (questionIndex, index, data) => {
    var updatedSurvey = props.survey
    updatedSurvey[questionIndex].selects[index].content = data
    props.surveyChange(updatedSurvey)
  }

  const titleChange = (event) => {
    var updatedSurvey = props.survey
    updatedSurvey[Number(event.target.dataset.questionindex)].title = event.target.value
    props.surveyChange(updatedSurvey)
  }

  const selectListChange = (questionIndex, data) => {
    var updatedSurvey = props.survey
    updatedSurvey[questionIndex].selects = data
    props.surveyChange(updatedSurvey)
  }
  
  return(
    <div>
      <div>
      {props.survey.length !== 0 && (
        <table className={classes.ItemListTable}>
          <tbody>{
            props.survey.map((data, idx) => (
            <tr key={data.display_order}>
              <If condition={ data.type === 1 }>
                <Then>
                  <td>
                    <MultipleChoiceQuestion 
                      selectListChange={selectListChange}
                      questionIndex={idx}
                      titleChange={titleChange}
                      selectsChange={selectsChange}
                      selects={props.survey[idx].selects}
                      title={props.survey[idx].title}
                      validList={props.validList}
                    />
                  </td>
                </Then>
                <Else>
                  <td>
                    <ShortAnswerQuestion
                      questionIndex={idx}
                      titleChange={titleChange}
                      validList={props.validList}
                    />
                  </td>
                </Else>
              </If>
              <td><Button onClick={deleteRow(data.display_order)}>삭제</Button></td>
            </tr>
            ))}
          </tbody>
        </table>
      )}
      </div>
      <Button onClick={addMultipleChoiceQuestion}>객관식 질문 추가</Button>
      <Button onClick={addShortAnswerQuestion}>주관식 질문 추가</Button>
      <Button onClick={allDeleteRow}>초기화</Button>
    </div>
  )
}

export default CreateSurveyItemListZone;