import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Grid from "@material-ui/core/Grid";
import VoteResult from  '../../pages/VoteResult';
import MaterialTable from 'material-table';
import { Search, Clear, ChevronLeft, ChevronRight, FirstPage, LastPage, ArrowDownward } from '@material-ui/icons';
import * as surveyAPI from "../../apis/surveyAPI";
import * as userAPI from "../../apis/userAPI";

const useStyles = makeStyles(theme =>({
  root: {
    maxWidth: 1000,
    minWidth: 500,
    margin: "10px auto",
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContent: {
    width: '80%',
    height: '80%',
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[0],
    padding: theme.spacing(2, 4, 3),
    overflow: 'auto'
  },
}));

export default function DenseTable() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [surveyId, setSurveyId] = React.useState(0);
  const [rows, setRows] = useState([]);
  const [mySurvey,setMySurvey] = useState([]);
  const [userdata, setUserdata] = useState();

  var columns = [
    { title: 'No', field: 'No'  },
    { title: '설문제목', field: '설문제목'  },
    { title: '상태', field: '상태' },
    { title: '참여인원', field: '참여인원' },
    { title: '사용한리워드', field: '사용한리워드' },
    { title: '결과보기', field: '결과보기' },
  ]

  useEffect(()=>{
    var userId;
    userAPI.getMyInformation().then(response => {
      setUserdata(response.data)
      userId=response.data.id
		}).then(response =>{
      surveyAPI.selectAllSurveyByUserId(userId).then(response => {
        var tempdata = response.data;
        setMySurvey(tempdata);
        tempdata.forEach((a, index) => {
          const reward = a.cur_participant_number*a.point_per_participant
          const startDateList = a.start_date.split("-")
          const endDateList = a.end_date.split("-")
          var state = ""
          const today = new Date()
          const startDate = new Date(startDateList[0], startDateList[1], startDateList[2])
          const endDate = new Date(endDateList[0], endDateList[1], endDateList[2])
          if (today.getDate() - startDate.getDate() < 0) state = "대기"
          else if (endDate.getDate() - today.getDate() < 0) state = "종료"
          else {
            if (a.max_participant_numbmer > a.cur_participant_number) state = "진행 중"
            else state = "종료"
          }
          setRows((rows)=>[...rows,{
            "No": index+1,
            "설문제목": a.title,
            "상태": state ,
            "참여인원": a.cur_participant_number,
            "사용한리워드": reward,
            "설문번호": a.id,
            "결과보기": 
              <button 
                style={{backgroundColor:'transparent', border: 'none'}}
                onClick={handleOpen}
                data-surveyid={a.id}
                >결과보기
              </button>
          }
          ])
        })
    })})
  },[]);

  const handleOpen = (event) => {
    setSurveyId(event.target.dataset.surveyid)
    setOpen(true);
  };
    
  const handleClose = () => {
    setOpen(false);
  };

  return (
  <div className={classes.root}>
    <h2>My Survey</h2><hr/>
    <Modal
      className={classes.modal}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      open={open}
      onClose={handleClose}>
      <Grid className={classes.modalContent} >
        <h2 id="simple-modal-title">Survey Result</h2>
        <VoteResult surveyId={surveyId}/>
      </Grid>
    </Modal>

    <MaterialTable
      title="내가 만든 설문을 확인하세요."
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
