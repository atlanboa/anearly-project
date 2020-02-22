import React, {useState, useEffect} from "react";
import { makeStyles } from '@material-ui/core/styles';
import Layout from "../layout/Layout";
import MyPageIndex from "../components/mypage/MyPageIndex";
import UserUpdate from "../components/mypage/UserUpdate";
import MySurvey from '../components/mypage/MySurvey';
import MyReward from '../components/mypage/MyReward';
import * as userAPI from "../apis/userAPI";
const useStyles = makeStyles(theme => ({
  h1: { textAlign: "center", },
}));

const MyPage = (props) => {
  const classes = useStyles();
  const [floatUserUpdate, setFloatUserUpdate] = useState(false)
  return (
    <Layout>
      <h1 className={classes.h1}>My Page</h1><hr/><br/>
      <MyPageIndex className={classes.item} floatUserUpdate={floatUserUpdate} setFloatUserUpdate={setFloatUserUpdate}/><br/><br/><br/>
      {floatUserUpdate && <UserUpdate className={classes.item}><br/><br/><br/></UserUpdate>}
      <MySurvey className={classes.item}/><br/><br/><br/>
      <MyReward className={classes.item}/><br/><br/><br/>
    </Layout>
  );
};

export default MyPage;
