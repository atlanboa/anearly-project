import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Grid from "@material-ui/core/Grid";
import { Link, Route, Redirect } from 'react-router-dom';
import UserUpdate from '../mypage/UserUpdate';
import MySurvey from '../mypage/MySurvey';
import MyReward from '../mypage/MyReward';
import MyPageIndex from '../mypage/MyPageIndex';

const useStyles = makeStyles(theme => ({
  table: {
    maxWidth: "150px",
    marginTop: "15px",
  },
  container: {
    display: "grid",
  },
}));

function createData(name) {
  return { name};
}

const rows = [
  createData("내 정보",),
  createData("회원정보 수정",),
  createData("마이 서베이",),
  createData("마이 리워드",),
];

const url = [
  "/MyPage/MyPageIndex",
  "/MyPage/UserUpdate",
  "/MyPage/MySurvey",
  "/MyPage/MyReward",
]

const SimpleTable = props => {
  const classes = useStyles();
  return (
    <div>
      <input style={{display: "none"}}/>
      <Grid container spacing={3}>
        <Grid item xs={2}>
          <Table className={classes.table}>
            <TableBody>
              {rows.map((row, index) => (
                <TableRow key={row.name}>
                  <TableCell component="th" scope="row">
                    <Link to={url[index]} >
                      <button style={{backgroundColor:'transparent', border: 'none'}}>{row.name}</button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Grid>
        <Grid item xs={10}>
          <Route path={["/MyPage/MyPageIndex"]} component={MyPageIndex} />
          <Route path="/MyPage/UserUpdate" component={UserUpdate} />
          <Route path="/MyPage/MySurvey" component={MySurvey} />
          <Route path="/MyPage/MyReward" component={MyReward} />
          <Redirect exact from="/" to="/MyPage/MyPageIndex" />
        </Grid>
      </Grid>
    </div>
  );
}

export default SimpleTable;
