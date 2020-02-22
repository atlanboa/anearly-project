import React, {useEffect} from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import LogInPasswordInput from "./LogInPasswordInput";
import IdFindModal from "./IdFindModal";
import PasswordFindModal from "./PasswordFindModal";
import Grid from "@material-ui/core/Grid";
import FacebookIcon from "@material-ui/icons/Facebook";
import CameraAltIcon from "@material-ui/icons/CameraAlt";
import TextField from "@material-ui/core/TextField";

import logo from "../../assets/logo.PNG";
import { useState } from "react";
import AuthEmail from "./AuthEmail"
import * as userAPI from "../../apis/userAPI";
import { CommonConsumer } from "../../context/CommonContext";
const useStyles = makeStyles(theme => ({
  root: {
    marginLeft: theme.spacing(3),
    "& > *": {
      marginTop: theme.spacing(1),
      width: `calc(100% - ${50}px)`,
      maxWidth: "760px"
    }
  },
  card: {
    maxWidth: "100%",
    justify: "center"
  },
  logInButton: {
    width: "90%",
    maxWidth: "400px",
    marginBottom: theme.spacing(3),
    marginTop: theme.spacing(3)
  },
  logoArea: {
    backgroundColor: "#0f4c81"
  }
}));

const SignUpComponent = props => {
  const classes = useStyles();
  const [pw, setPw] = useState("");
  const [email, setEmail] = useState("");
  const [open, setOpen] = useState(false);
  const handleChange = e => {
    let curEmail = "";
    curEmail = e.target.value;
    setEmail(curEmail);
  };
  const enter=(actions, e)=>{
    if(e.charCode === 13){
      login(actions)
    }
  }
  const login = (actions) => {
    userAPI.login(email, pw).then(response => {
      // console.log(response.status)
      if (response.status === 200) {
        actions.setToken(response.data);
        localStorage.setItem("token", response.data);
        localStorage.removeItem("nonToken");
        actions.setLogged(true);
        window.location.href='/';
      }else if(response.status===204){
        //존재하지 않는 계정정보일 경우
        alert('아이디 혹은 비밀번호가 틀렸습니다.')
      }
    }).catch(error => {
      // console.log(error)
      if(error.response.status==406){
      //   console.log(">>>", error.response.data)
        setOpen(true);
      }
      
    });
  };
  useEffect(()=>{
    if(localStorage.getItem("nonToken")!=null){
      alert('로그인 세션이 만료되었습니다. 다시 로그인 해주세요')
      localStorage.removeItem("nonToken");
    }
  },[])
  return (
    <CommonConsumer>
      {({state, actions}) => (
        <Grid align="center">
          <AuthEmail open={open} setOpen={setOpen} email={email}></AuthEmail>
          <Card className={classes.card} justify="center">
            <div className={classes.logoArea}>
              <img src={logo} style={{ width: "10%" }} />
            </div>
            <CardActions>
              <Button size="small" color="primary">
                Share
              </Button>
              <Button size="small" color="primary">
                Learn More
              </Button>
            </CardActions>
            <Grid
              container
              direction="row"
              justify="center"
              className={classes.textList}
              align="center"
            >
              <Grid item xs={12}>
                <div className={classes.root}>
                  <TextField
                    id="standard-basic"
                    label="이메일"
                    onChange={handleChange}
                    value={email}
                    onKeyPress={e=> {enter(actions, e)}}
                  />
                </div>
                <LogInPasswordInput enter={enter} setPw={setPw} />
              </Grid>
            </Grid>
            <Grid container direction="row" justify="center" align="center">
              <Grid item xs={12}>
                <Button
                  className={classes.logInButton}
                  id="login-button"
                  variant="contained"
                  color="primary"
                  onClick={()=>{login(actions);}}
                >
                  로그인
                </Button>
              </Grid>
              <Grid container>
                <Grid item xs={12}>
                  <IdFindModal />
                  <br />
                  <PasswordFindModal />
                </Grid>
                <Grid item xs={12}>
                  <Typography className={classes.root}>
                    다른 서비스 계정으로 로그인
                  </Typography>
                </Grid>

                <Grid item xs={12}>
                  <FacebookIcon fontSize="large" />
                  <CameraAltIcon fontSize="large" />
                  ...
                </Grid>
              </Grid>
            </Grid>
          </Card>
        </Grid>
      )}
      
    </CommonConsumer>
  );
};

export default SignUpComponent;
