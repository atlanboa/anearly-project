import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
  Card,
  CardActions,
  Grid,
  TextField,
  Typography,
} from '@material-ui/core';
import AgreeList from './AgreeList';
import PasswordInput from './PasswordInput';
import GenderInput from './GenderInput';
import FacebookIcon from '@material-ui/icons/Facebook';
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import { isEmail, isLength, isInt } from 'validator';
import logo from '../../assets/logo.PNG';
import * as userAPI from '../../apis/userAPI';


const useStyles = makeStyles(theme => ({
  root: {
    marginLeft: theme.spacing(3),
    '& > *': {
      marginTop: theme.spacing(1),
      width: `calc(100% - ${50}px)`,
      maxWidth: '760px',
    },
  },
  card: {
    maxWidth: '100%',
    justify: 'center',
  },
  signupButton: {
    width: '90%',
    maxWidth: '400px',
    marginBottom: theme.spacing(3),
    marginTop: theme.spacing(3),
  },
  button: {
    maxWidth: 300,
    marginTop: 15,
  },
  logoArea: {
    backgroundColor: '#0f4c81',
  },
  errorMessage: {
    color: 'red',
  },
}));

export default function SignUpComponent() {  
  const classes = useStyles();
  const [agree, setAgree] = useState(false);
  const [formData, setFormData] = useState({
    'age': 0,
    'email': "",
    'gender': 1,
    'nickname': "",
    'pw': "",
    'phone': "",
  })
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailDuplicate, setEmailDuplicate] = useState(false);
  const [nickNameDuplicate, setNickNameDuplicate] = useState(false);
  const [validList, setValidList] = React.useState({
    emailIsValid: false,
    passwordIsValid: false,
    nicknameIsValid: false,
    phoneIsValid: false,
    ageIsValid: true,
  })
  
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

  const passwordChange = (event) => {
    setPassword(event.target.value)
    if (event.target.value === confirmPassword) {
      setValidList({...validList, ["passwordIsValid"]: passwordValidCheck(event.target.value)})
      setFormData({...formData, ["pw"]: event.target.value})
    }
    else {
      setValidList({...validList, ["passwordIsValid"]: false})
    }
  }

  const confirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value)
    if (event.target.value === password) {
      setValidList({...validList, ["passwordIsValid"]: passwordValidCheck(event.target.value)})
      setFormData({...formData, ["pw"]: event.target.value})
    }
    else {
      setValidList({...validList, ["passwordIsValid"]: false})
    }
  }

  const genderChange = (value) => {
    setFormData({...formData, ["gender"]: value})
  }

  const validatePhoneNumber = str => {
    str = str.replace(/[^0-9]/g, '');
    var tmp = '';
    if (str.length < 11) {
      setFormData({...formData, ["phone"]: str });
      setValidList({...validList, ["phoneIsValid"]: false});
    } else{
      tmp += str.substr(0, 11);
      setFormData({...formData, ["phone"]: tmp });
      setValidList({...validList, ["phoneIsValid"]: true});
    }
  };

  function checkEmail() {
    userAPI.userEmail(formData.email).then(response => {
      if (response.data) {
        alert('이메일 중복체크 완료');
        setEmailDuplicate(true);
      } else {
        alert('중복된 이메일 존재');
        setEmailDuplicate(false);
      }
    });
  }

  function checkNickname() {
    userAPI.userNickname(formData.nickname).then(response => {
      if (response.data) {
        alert('닉네임 중복체크 완료');
        setNickNameDuplicate(true);
      } else {
        alert('중복된 닉네임 존재');
        setNickNameDuplicate(false);
      }
    });
  }

  const validateEmail = emailEnter => {
    if (isEmail(emailEnter)) {
      setFormData({...formData, ["email"]: emailEnter})
      setValidList({...validList, ["emailIsValid"]: true})
    }
    else {
      setValidList({...validList, ["emailIsValid"]: false})
    }
  };

  const validateNickName = nickNameEnter => {
    if (isLength(nickNameEnter, { min: 2 })) {
      setFormData({...formData, ["nickname"]: nickNameEnter})
      setValidList({...validList, ["nicknameIsValid"]: true})
    }
    else {
      setFormData({...formData, ["nickname"]: nickNameEnter})
      setValidList({...validList, ["nicknameIsValid"]: false})
    }
  };

  const validateAge = ageEnter => {
    if (isInt(ageEnter, { min: 0, allow_leading_zeroes: false })) {
      setFormData({...formData, ["age"]: ageEnter})
      setValidList({...validList, ["ageIsValid"]: true})
    } else {
      setFormData({...formData, ["age"]: ageEnter})
      setValidList({...validList, ["ageIsValid"]: false})
    }
  };

  const signUp = () => {
    userAPI.signUp(formData).then(response=>{
      if(response.status===200) {
        window.location.href='/';
      }
      else {
        alert('회원가입에 실패했습니다.');
      }
    });
  };
  return (
    <Grid align="center">
      <Card className={classes.card} justify="center">
        <div className={classes.logoArea}>
          <img src={logo} style={{ width: '10%' }} alt="" />
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
          <Grid item xs>
            <div className={classes.root}>
              <TextField
                id="email"
                label="이메일"
                disabled={emailDuplicate}
                onChange={e => validateEmail(e.target.value)}
                helperText={
                  formData.email ?
                  (
                    validList.emailIsValid
                      ?
                        (<span style={{color:"green"}}>success</span>)
                      :
                        "잘못된 이메일 형식입니다."
                  )
                  :
                    ""
                  }
                error={formData.email !== "" && !validList.emailIsValid}
              />
            </div>
            <Button
              className={classes.button}
              variant="contained"
              color="primary"
              onClick={checkEmail}
              disabled={!emailDuplicate ^ validList.emailIsValid ? true : false}
            >
              {!emailDuplicate ? '중복확인' : '확인되었습니다!'}
            </Button>
            <PasswordInput
              passwordChange={passwordChange}
              confirmPasswordChange={confirmPasswordChange}
              isValid={validList.passwordIsValid}
              password = {password}
            />
            <div className={classes.root}>
              <TextField
                id="nickname"
                label="닉네임"
                disabled={nickNameDuplicate}
                onChange={e => validateNickName(e.target.value)}
                helperText={
                  formData.nickname ?
                    (
                      validList.nicknameIsValid ?
                        (<span style={{color:"green"}}>success</span>)
                      :
                        "닉네임은 2글자 이상으로 작성하여주세요"
                    )
                  :
                    ""
                }
                error={formData.nickname!=="" && !validList.nicknameIsValid}
              />
            </div>
            <Button
              className={classes.button}
              variant="contained"
              color="primary"
              onClick={checkNickname}
              disabled={!nickNameDuplicate ^ validList.nicknameIsValid ? true : false}
            >
              {!nickNameDuplicate ? '중복확인' : '확인되었습니다!'}
            </Button>
            <GenderInput genderChange={genderChange}/>
            <div className={classes.root}>
              <TextField
                id="phonenumber"
                label="전화번호"
                value={formData.phone}
                onChange={e => validatePhoneNumber(e.target.value)}
                helperText={validList.phoneIsValid ? (<span style={{color:"green"}}>success</span>) : "'-'없이 11자리의 숫자만 입력해 주세요"}
                error={formData.phone !== "" && !validList.phoneIsValid}
              />
            </div>
            <div className={classes.root}>
              <TextField
                type="number"
                id="age"
                label="나이"
                value={formData.age}
                onChange={e => validateAge(e.target.value)}
                inputProps={{ 'min': 0 }}
                InputLabelProps={{
                  shrink: true,
                }}
                helperText={validList.ageIsValid ? "" : "0 이상의 숫자를 입력해주세요"}
                error={!validList.ageIsValid}
              />
            </div>
          </Grid>
        </Grid>
        <AgreeList setAgree={setAgree} />
        <Grid container direction="row" justify="center" align="center">
          <Grid item xs={12}>
            <Button
              className={classes.signupButton}
              id="signup-button"
              variant="contained"
              color="primary"
              disabled={
                !(
                  validList.emailIsValid &&
                  validList.nicknameIsValid &&
                  validList.passwordIsValid &&
                  emailDuplicate &&
                  nickNameDuplicate &&
                  validList.ageIsValid &&
                  validList.phoneIsValid &&
                  agree
                )
              }
              onClick={signUp}
            >
              가입하기
            </Button>{' '}
          </Grid>
          <Grid container>
            <Grid item xs={12}>
              <Typography className={classes.root}>
                다른 서비스 계정으로 가입
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
  );
}
