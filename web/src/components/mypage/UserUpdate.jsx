import React, { useState, useEffect }from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import GridList from "@material-ui/core/GridList"
import { Paper } from 'material-ui';
import { MuiThemeProvider } from 'material-ui/styles';
import * as userAPI from "../../apis/userAPI";
import { isLength } from 'validator';

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 1000,
    minWidth: 500,
    margin: "auto",
  },
  paper: {
    padding: "20px",
    height: 350,
  },
  updateForm: {
    height: 350,
  },
  button: {
    float: "center",
    border: "1px solid"
  },
}));

const FormPropsTextFields = (props) => {
  const classes = useStyles();

  const [userdata, setUserdata] = useState({
    email: "",
    nickname: "",
  });
  const [password, setPassword] = useState({
    changePassword: "",
    confirmPassword: "",
  })
  const passwordChange = (event) => {
    setPassword({...password, changePassword: event.target.value})
  }
  const confirmPasswordChange = (event) => {
    setPassword({...password, confirmPassword: event.target.value})
  }

  const passwordValidCheck = (value) => {
    var pattern1 = /[0-9]/;
    var pattern2 = /[a-zA-Z]/;
    var pattern3 = /[~!@\#$%<>^&*]/;
    if (
            !isLength(value, {min:8})
        ||  !pattern1.test(value)
        ||  !pattern2.test(value)
        ||  !pattern3.test(value)
      ) {
      return false
    }
    else {
      return true
    }
  }
  
  useEffect(()=>{
    let tempdata;
		userAPI.getMyInformation().then(response => {
			tempdata = response.data;
			setUserdata({
        age: tempdata.age,
        authority: tempdata.authority,
        email: tempdata.email,
        email_verification: tempdata.email_verification,
        gender: tempdata.gender,
        id: tempdata.id,
        nickname: tempdata.nickname,
        phone: tempdata.phone,
        pw: tempdata.pw,
				rewardPoint: tempdata.reward_point,
      })
		})
  },[]);
  
  const onClickSubmitUserUpdate = (event) => {

    if (password.changePassword === password.confirmPassword && password.changePassword !== "" && passwordValidCheck(password.changePassword)){
      var tempdata = userdata
      tempdata.pw = password.changePassword
      
      userAPI.passwordChange(tempdata).then(response=>{
        if(response.status===200){
          alert("비밀번호가 변경되었습니다.")
          window.location.href = '/';
        }
      }).catch(error =>{
        alert("오류가 발생하였습니다.")}
      )
    }
    else {
      alert("비밀번호를 확인해 주세요.")
    }
  };
  const onClickSubmitWithdraw = () => {
    if (window.confirm("정말 탈퇴하시겠습니까?")) {
      userAPI.deleteUser(userdata.id).then(response => {
        localStorage.removeItem("token");
        alert("탈퇴가 완료되었습니다.")
        window.location.href = '/';
      }).catch(error => {
        alert("탈퇴 중 오류가 발생하였습니다.")
      })
    };
    
  };

  return (
    <div className={classes.root}>
      <MuiThemeProvider>
        <Paper className={classes.paper}>
          <GridList className={classes.updateForm}>
            <Grid item xs={6}>
              <h3>비밀번호 변경</h3><hr/>
              <form noValidate autoComplete="off">
                <div>
                  <TextField
                    value={userdata.email}
                    InputProps={{readOnly: true,}}
                    disabled
                  />&nbsp;&nbsp;
                  <TextField
                    value={userdata.nickName}
                    disabled
                  /><br/>
                  <TextField
                    id="New Password"
                    label="Change Password"
                    type="password"
                    onChange={passwordChange}
                  />&nbsp;&nbsp;
                  <TextField
                    id="New Password Check"
                    label="Confirm Password"
                    type="password"
                    onChange={confirmPasswordChange}
                  /><br/>
                </div><br/>
                <p>비밀번호는 8글자 이상, 영 대/소문자, 숫자, 특수문자를 포함해야 합니다.</p>
                <Button className={classes.button} onClick={onClickSubmitUserUpdate}>수정하기</Button>&nbsp;&nbsp;
              </form>
            </Grid>
            <Grid item xs={6}>
            <h3>회원 탈퇴하기</h3><hr/>
              <Grid>
                <Button className={classes.button} onClick={onClickSubmitWithdraw}>탈퇴하기</Button>&nbsp;&nbsp;
              </Grid>
            </Grid>
          </GridList>
        </Paper>
      </MuiThemeProvider><br/><br/><br/>
    </div>
  );
}

export default FormPropsTextFields;