import React, {createRef, useRef} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import {isAlphanumeric, isLength} from 'validator';
import { TextField } from '@material-ui/core';
const useStyles = makeStyles(theme => ({
    passwordInput: {
      width: `calc(100% - ${75}px)`,
      height: '48px',
      maxWidth: "760px",
      marginLeft: theme.spacing(3),
      marginTop: theme.spacing(1),
    }
  
}));

const PasswordInput = props => {
  const classes = useStyles();
  const [passwordValues, setPasswordValues] = React.useState({
    amount: '',
    password: '',
    weight: '',
    weightRange: '',
    showPassword: false,
  });
  const [confirmPasswordValues, setConfirmPasswordValues] = React.useState({
    amount: '',
    password: '',
    weight: '',
    weightRange: '',
    showPassword: false,
  });

  const passwordHandleChange = (name, value) => {
    setPasswordValues({ ...passwordValues, [name]: value });
    validPassword(value);

  };

  const passwordHandleClickShowPassword = () => {
    setPasswordValues({ ...passwordValues, showPassword: !passwordValues.showPassword });
  };

  const passwordHandleMouseDownPassword = event => {
    event.preventDefault();
  };

  
  const  passwordConfirmHandleChange = (name, value) =>  {
    setConfirmPasswordValues({ ...confirmPasswordValues, [name]: value });
    doesPasswordMatch(value);
  };

  const passwordConfirmHandleClickShowPassword = () => {
    setConfirmPasswordValues({ ...confirmPasswordValues, showPassword: !confirmPasswordValues.showPassword });
  };

  const passwordConfirmdHandleMouseDownPassword = event => {
    event.preventDefault();
  };

  const doesPasswordMatch = async (value) => {
    if(passwordValues.password === value) {
      props.passwordValidChange(true, value);
      props.errorProp.setError(props=>'');
    }else {
      props.passwordValidChange(false, value);
      props.errorProp.setError(props=>'비밀번호가 일치하지 않습니다.');
    }
  }
  const validPassword = (value) => {
    var pattern1 = /[0-9]/;
    var pattern2 = /[a-zA-Z]/;
    var pattern3 = /[~!@\#$%<>^&*]/;
    if(!isLength(value, {min:8}) || !pattern1.test(value)||!pattern2.test(value)||!pattern3.test(value)){
      props.passwordValidChange(false, value);
      props.errorProp.setError(props=>'비밀번호는 8자이상 숫자+영문+특수문자 혼합');
    }else{
      props.passwordValidChange(true, value);
      props.errorProp.setError(props=>'');
    }
  }
  return (
    <React.Fragment>
  <div className={classes.root}>
    <Input
      className={classes.passwordInput}
      id="standard-adornment-password"
      type="password"
      value={passwordValues.password}
      error={props.passwordInput.password!==""&&!props.passwordInput.isPasswordValid}
      onChange={e=>passwordHandleChange('password', e.target.value)}
      endAdornment={
        <InputAdornment position="end">
          <IconButton
            aria-label="toggle password visibility"
            onClick={passwordHandleClickShowPassword}
            onMouseDown={passwordHandleMouseDownPassword}
          >
            {passwordValues.showPassword ? <Visibility /> : <VisibilityOff />}
          </IconButton>
        </InputAdornment>
      }
      placeholder='비밀번호'
    />
  </div>
  <div className={classes.root}>
    <Input
      className={classes.passwordInput}
      id="standard-adornment-password-confirm"
      type={confirmPasswordValues.showPassword ? 'text' : 'password'}
      value={confirmPasswordValues.password}
      onChange={e=>passwordConfirmHandleChange('password', e.target.value)}
      error={props.passwordInput.password!==""&&!props.passwordInput.isPasswordValid}
      endAdornment={
        <InputAdornment position="end">
          <IconButton
            aria-label="toggle password visibility"
            onClick={passwordConfirmHandleClickShowPassword}
            onMouseDown={passwordConfirmdHandleMouseDownPassword}
          >
            {confirmPasswordValues.showPassword ? <Visibility /> : <VisibilityOff />}
          </IconButton>
        </InputAdornment>
      }
      placeholder='비밀번호 확인'
    />
  </div></React.Fragment>);
};

export default PasswordInput;