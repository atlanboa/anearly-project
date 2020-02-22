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
  const [gender, setGender] = useState(0);
  const [agree, setAgree] = useState(false);
  const [nickNameInput, setNickNameInput] = useState({
    nickNameEntered: '',
    isNickNameValid: false,
  });
  const [emailInput, setEmailInput] = useState({
    emailInput: '',
    isEmailValid: false,
  });
  const [phoneNumberInput, setPhoneNumberInput] = useState({
    phoneNumberInput: '',
    isPhoneNumberValid: false,
  });
  const [passwordInput, setPasswordInput] = useState({
    password: '',
    isPasswordValid: false,
  });
  const [ageInput, setAgeInput] = useState({ ageInput: '', isAgeValid: false });
  const [error, setError] = useState('');
  const [emailDuplicate, setEmailDuplicate] = useState(false);
  const [nickNameDuplicate, setNickNameDuplicate] = useState(false);
  const passwordValidChange = (valid, pw) => {
    setPasswordInput({ password: pw, isPasswordValid: valid });
  };
  const passwordChange = pw => {
    setPasswordInput({ ...passwordInput, password: pw });
  };
  const validatePhoneNumber = str => {
    str = str.replace(/[^0-9]/g, '');
    var tmp = '';
    if (str.length < 11) {
      setPhoneNumberInput({ phoneNumberInput: str, isPhoneNumberValid: false });
    } else{
      tmp += str.substr(0, 11);
      setPhoneNumberInput({ phoneNumberInput: tmp, isPhoneNumberValid: true });
    }
  };
  const classes = useStyles();
  function checkEmail() {
    userAPI.userEmail(emailInput.emailInput).then(response => {
      // console.log(response.data);
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
    // console.log(nickNameInput.nickNameEntered);
    userAPI.userNickname(nickNameInput.nickNameEntered).then(response => {
      // console.log(response.data);
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
      setEmailInput({ emailInput: emailEnter, isEmailValid: true });
    } else {
      if(emailEnter!==''){
        setEmailInput({ emailInput, isEmailValid: false });
      }else{
        setEmailInput({ emailInput: emailEnter, isEmailValid: true });
      }
    }
  };
  const validateNickName = nickNameEnter => {
    if (isLength(nickNameEnter, { min: 2 })) {
      setNickNameInput({
        nickNameEntered: nickNameEnter,
        isNickNameValid: true,
      });
    } else {
      setNickNameInput({
        nickNameEntered: nickNameEnter,
        isNickNameValid: false,
      });
    }
  };
  const validateAge = ageEnter => {
    if (isInt(ageEnter, { min: 1, max: 120, allow_leading_zeroes: false })) {
      setAgeInput({ ageInput: ageEnter, isAgeValid: true });
      setError('');
    } else {
      setAgeInput({ ageInput: ageEnter, isAgeValid: false });
      setError('나이는 숫자로 입력하셔야 합니다.(1~120)');
    }
  };
  const signUp = () => {
    let formdata ={
      'age': ageInput.ageInput,
      'email': emailInput.emailInput,
      'gender': gender,
      'nickname': nickNameInput.nickNameEntered,
      'pw': passwordInput.password,
      'phone': phoneNumberInput.phoneNumberInput,
    }
    userAPI.signUp(formdata).then(response=>{
      if(response.status===200){
        window.location.href='/';
      }else{
        console.log('회원가입에 실패했습니다.');
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
                helperText={emailInput.isEmailValid ? (<span style={{color:"green"}}>success</span>) : "잘못된 이메일 형식입니다."}
                error={emailInput.emailInput!==""&&!emailInput.isEmailValid}
              />
            </div>
            <Button
              className={classes.button}
              variant="contained"
              color="primary"
              onClick={checkEmail}
              disabled={!emailDuplicate ^ emailInput.isEmailValid}
            >
              {!emailDuplicate ? '중복확인' : '확인되었습니다!'}
            </Button>
            <PasswordInput
              errorProp={{error, setError}}
              passwordInput={passwordInput}
              passwordValidChange={passwordValidChange}
              passwordChange={passwordChange}
            />
            <h6 className={classes.errorMessage}>{error}</h6>
            <div className={classes.root}>
              <TextField
                id="nickname"
                label="닉네임"
                disabled={nickNameDuplicate}
                onChange={e => validateNickName(e.target.value)}
                helperText={nickNameInput.isNickNameValid ? (<span style={{color:"green"}}>success</span>) : "닉네임은 2글자 이상으로 작성하여주세요"}
                error={nickNameInput.nickNameEntered!==""&&!nickNameInput.isNickNameValid}
              />
            </div>
            <Button
              className={classes.button}
              variant="contained"
              color="primary"
              onClick={checkNickname}
              disabled={!nickNameDuplicate ^ nickNameInput.isNickNameValid}
            >
              {!nickNameDuplicate ? '중복확인' : '확인되었습니다!'}
            </Button>
            <GenderInput setGender={setGender}/>
            <div className={classes.root}>
              <TextField
                id="phonenumber"
                label="전화번호"
                value={phoneNumberInput.phoneNumberInput}
                onChange={e => validatePhoneNumber(e.target.value)}
                helperText={phoneNumberInput.isPhoneNumberValid ? (<span style={{color:"green"}}>success</span>) : "'-'없이 11자리의 숫자만 입력해 주세요"}
                error={phoneNumberInput.phoneNumberInput!==""&&!phoneNumberInput.isPhoneNumberValid}
              />
            </div>
            <div className={classes.root}>
              <TextField
                id="age"
                label="나이"
                onChange={e => validateAge(e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
                helperText={ageInput.isAgeValid ? (<span style={{color:"green"}}>success</span>) : "1~120사이의 숫자만 입력해주세요"}
                error={ageInput.ageInput!==""&&!ageInput.isAgeValid}
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
                  emailInput.isEmailValid &&
                  passwordInput.isPasswordValid &&
                  nickNameInput.isNickNameValid &&
                  emailDuplicate &&
                  nickNameDuplicate &&
                  ageInput.isAgeValid &&
                  phoneNumberInput.isPhoneNumberValid &&
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
