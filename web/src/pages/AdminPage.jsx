import React, {useState, useEffect} from 'react';
import UserAdmin from "../components/admin/UserAdmin";
import * as userAPI from "../apis/userAPI";
import * as surveyAPI from "../apis/surveyAPI";
import SurveyAdmin from "../components/admin/SurveyAdmin";
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import Layout from "../layout/Layout";

const useStyles = makeStyles(theme => ({
  root: {
    marginRight:'50px',
    marginLeft:'50px',
    marginTop:'30px',
    marginBottom: '50px'
  },
}));


 const MaterialTableDemo = props => {
  const [userdata, setUserData] = useState([]);
  const [surveyData, setSurveyData] = useState([]);
  const classes = useStyles();
  const changeData=(resData)=>{
    let temp = resData;
    resData.map((x, index) => {
      if(x.approval===0) temp[index].approval="대기"
      if(x.approval===1) temp[index].approval="완료"
      if(x.open_status===0) temp[index].open_status="종료"
      if(x.open_status===1) temp[index].open_status="오픈"
    })
    setSurveyData(temp);
  };
  useEffect(()=>{
    if(props.location.state===undefined) {
      window.location.href='/'
      alert('잘못된 접근입니다!! 경고 경고 경고')
      return;
    }
    userAPI.getAllUser().then(response=>{
      setUserData(response.data);
    });
    
    surveyAPI.GetAllSurvey().then(response=>{
      changeData(response.data);
    });
  },[]);

  return (
    <Grid className={classes.root}>
      <Layout>
        <h1>관리자 페이지</h1>
        <UserAdmin data={userdata} setData={setUserData}/>
        <SurveyAdmin data={surveyData} setData={setSurveyData} />
      </Layout>
    </Grid>
  );
}

export default MaterialTableDemo;
