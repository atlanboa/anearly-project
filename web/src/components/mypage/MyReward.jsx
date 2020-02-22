import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MaterialTable from 'material-table';
import { Search, Clear, ChevronLeft, ChevronRight, FirstPage, LastPage, ArrowDownward } from '@material-ui/icons';
import * as userAPI from "../../apis/userAPI";
import * as surveyAPI from "../../apis/surveyAPI";

const useStyles = makeStyles({
  root: {
    maxWidth: 1000,
    minWidth: 500,
    margin: "10px auto",
  },
});

export default function MaterialTableDemo() {
  const classes = useStyles();

  const [rows, setRows] = useState([]);
  
  var columns = [
    { title: 'No', field: 'No' },
    { title: '내역', field: '내역' },
    { title: '리워드', field: '리워드'},
  ]

  useEffect(()=>{
    var userId;
    userAPI.getMyInformation().then(response => {
      userId=response.data.id
		}).then(response =>{
      surveyAPI.selectSurveyAttendHistoryByUserId(userId).then(response => {
        var tempdata = response.data;
        // console.log(tempdata);
        tempdata.forEach((a, index) => {
          setRows((rows)=>[...rows,{
            "No": index+1,
            "내역": a.title,
            "리워드": a.point_per_participant,
        }])})
    })})
  },[]);

  return (
    <div className={classes.root}>
      <h2>My Reward</h2><hr/>
      <MaterialTable
        title="설문으로 얻은 리워드 내역입니다."
        icons={{
          Search: Search,
          ResetSearch: Clear,
          SortArrow: ArrowDownward,
          FirstPage: FirstPage,
          LastPage: LastPage,
          NextPage: ChevronRight,
          PreviousPage: ChevronLeft,
        }}
        columns={columns}
        data={rows}
      />
    </div>
  );
}