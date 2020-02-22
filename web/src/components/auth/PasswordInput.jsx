import React, {createRef, useRef} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

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


  const passwordHandleClickShowPassword = () => {
    setPasswordValues({ ...passwordValues, showPassword: !passwordValues.showPassword });
  };

  const passwordHandleMouseDownPassword = event => {
    event.preventDefault();
  };

  const passwordConfirmHandleClickShowPassword = () => {
    setConfirmPasswordValues({ ...confirmPasswordValues, showPassword: !confirmPasswordValues.showPassword });
  };

  const passwordConfirmdHandleMouseDownPassword = event => {
    event.preventDefault();
  };

  return (
    <React.Fragment>
      <div className={classes.root}>
        <Input
          className={classes.passwordInput}
          id="standard-adornment-password"
          type={passwordValues.showPassword ? 'text' : 'password'}
          // error={props.passwordInput.password!==""&&!props.passwordInput.isPasswordValid}
          onChange={props.passwordChange}
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
          onChange={props.confirmPasswordChange}
          // error={props.passwordInput.password!==""&&!props.passwordInput.isPasswordValid}
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
        { 
          props.password !== ""
          ?
            (<p style={{color:"red"}}>{props.isValid?"":"비밀번호는 8글자 이상, 영 대/소문자, 숫자, 특수문자를 포함해야 합니다."}</p>)
          :
            ""
          }
        
      </div>
    </React.Fragment>);
};

export default PasswordInput;