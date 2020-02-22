import React, {useState, useEffect} from 'react';
import MaterialTable from 'material-table';
import * as surveyAPI from "../../apis/surveyAPI";
import {
  Search,
  Clear, 
  ChevronLeft, 
  ChevronRight,
  FirstPage,
  LastPage,
  Add,
  Edit,
  Delete,
  Check,
  TimerOff
} from "@material-ui/icons";

const SurveyAdmin = props => {
  const columns = [
    { title: 'ID', field: 'id' },
    { title: '제목', field: 'title' },
    { title: '승인', field: 'approval'},
    { title: '상태', field: 'open_status'},
    {title: '리워드', field: 'budget'},
  ];

  const [user, setUser] = useState([]);
    
  useEffect(()=>{
    setUser(props.data)
  });

  return (
    <MaterialTable  
      icons={{
        Search: Search,
        Edit: Edit,
        Delete: Delete,
        Add: Add,
        Check: Check,
        Clear: Clear,
        ResetSearch: Clear,
        FirstPage: FirstPage,
        LastPage: LastPage,
        NextPage: ChevronRight,
        PreviousPage: ChevronLeft,
        TimerOff: TimerOff,
      }}
      actions={[
        {
          icon: Check,
          tooltip: "승인",
          onClick: (e, index) => {
            new Promise(resolve => {
              setTimeout(() => {
                resolve();
                let newData = index;
                newData.approval = index.approval==="대기" ? "완료" : "대기";
                setUser(prevState=>{
                  let temp = [...prevState];
                  temp[temp.indexOf(index)] = newData;
                  props.setData(temp);
                  return{ ...prevState, temp };
                })
                let tempIndex ={id:index.id, approval:index.approval==="대기" ? 0 : 1};          
                surveyAPI.ApprovalSurvey(tempIndex)
              }, 100);                                                                                                                                                                                                                                                             
            })}},
        {
          icon: TimerOff,
          tooltip: "종료",
          onClick: (e, index) => {
            new Promise(resolve => {
              setTimeout(() => {
                resolve();
                let newData = index;
                newData.open_status = index.open_status==="종료" ? "오픈" : "종료";
                setUser(prevState=>{
                  let temp = [...prevState];
                  temp[temp.indexOf(index)] = newData;
                  props.setData(temp);
                  return{ ...prevState, temp };
                })
                let tempIndex ={id:index.id, status:index.open_status==="종료" ? 0 : 1};          
                surveyAPI.CloseSurvey(tempIndex)
              }, 100);                                                                                                                                                                                                                                                             
            })}},
      ]}

      options={{
        actionsColumnIndex: -1
      }}
      title="설문 관리"
      columns={columns}
      data={props.data}
      editable={{
        onRowDelete: oldData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              setUser(prevState=>{
                let temp = [...prevState];
                temp.splice(temp.indexOf(oldData), 1);
                props.setData(temp);
                return{ ...prevState, temp };
              })
            }, 600);
            surveyAPI.DeleteSurvey(oldData.id);
          }),
      }}
    />
  );
}
export default SurveyAdmin;