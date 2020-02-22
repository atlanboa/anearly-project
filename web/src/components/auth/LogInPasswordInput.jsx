import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { CommonConsumer } from "../../context/CommonContext";
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
  const passwordHandleChange = prop => event => {
    setPasswordValues({ ...passwordValues, [prop]: event.target.value });
    props.setPw(event.target.value);
  };

  const passwordHandleClickShowPassword = () => {
    setPasswordValues({ ...passwordValues, showPassword: !passwordValues.showPassword });
  };
  const passwordHandleMouseDownPassword = event => {
    event.preventDefault();
  };

  return (
    <CommonConsumer>
      {({state, actions}) => (
    <React.Fragment>
  <div className={classes.root}>
    <Input
      className={classes.passwordInput}
      id="standard-adornment-password"
      type={passwordValues.showPassword ? 'text' : 'password'}
      value={passwordValues.password}
      onChange={passwordHandleChange('password')}
      onKeyPress={e=> {props.enter(actions, e)}}
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
  </div></React.Fragment>)}
  </CommonConsumer>
  )
}

export default PasswordInput;