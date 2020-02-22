import React from "react";
import { makeStyles, Grid } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    marginBottom: 20,
    align: "center",
  },
  logo: {
    width: "50%",
  },
  logoletters: {
    float: "right",
    marginRight: 20,
    fontSize: 60,
  },
  contents: {
    width: "50%",
    marginBottom: 25,
  },
}));

const Footer = () => {
  const classes = useStyles();
  return (
    <Grid className={classes.root}>
      <Grid container>
        <Grid className={classes.logo}>
          <div className={classes.logoletters}><b>An-Early</b><br/></div>
        </Grid>
        <Grid className={classes.contents}>
          사업자 등록 번호 312-82-82725<br/>
          경북 구미시 3공단3로 302<br/>
          010-0630-0428<br/>
          chaeunwoo@jonjal.com<br/>
        </Grid>
      </Grid>
      <Grid>
        <span className={classes.logolettersdown}>
          © 2020 All Rights Reserved | SSAFY Gumi 2nd Team1 | 서비스 약관 | 개인정보 보호 | 결제 이용 약관 | 도움말 | 광고 문의 | 업데이트 노트 | 이슈 | TODO
        </span>
      </Grid>
    </Grid>
  );
};

export default Footer;