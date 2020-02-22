import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Modal, TextField } from '@material-ui/core/';
import * as userAPI from "../../apis/userAPI";
const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: 200,
    },
  },
  modal: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    cursor: 'pointer',
  },
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    textAlign: 'center',
  },
  textfield: {
    width: '100%',
    marginTop: '50px',
    marginBottom: '50px',
  },
}));
const AuthEamil = props => {
  const classes = useStyles();
  const [message, setMessage] = React.useState('');
  const [send, setSend] = React.useState(false);

  const messageChange = event => {
    setMessage(event.target.value);
  };

  const handleClose = () => {
    props.setOpen(false);
    setSend(false);
    setMessage('');
  };
  const sendEmail = () => {
    userAPI.sendEmail(props.email).then(response=>{
      if(response.status===200){
        // console.log(response);
        setSend(true);
      }
    })
  }
  const authEmail = () => {
    // console.log(props.email, " ", message);
    userAPI.authEmail(message, props.email).then(response => {
      if(response.status===200){
        handleClose();
        alert('인증에 성공하였습니다.')
      }
    }).catch(error => {
      if(error.response.status===417){
        alert('인증번호가 일치하지 않습니다!!!!!')
      }
    })
  }
  return (
    <Modal
      className={classes.modal}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      open={props.open}
      onClose={handleClose}
    >
      <div className={classes.paper}>
        <h2 id="simple-modal-title">이메일 인증</h2>
        <p id="simple-modal-description">
          인증이 완료되지 않은 계정입니다.<br></br>
          가입한 이메일에서 인증번호를 확인 후 입력하여 주세요.
        </p>
        <TextField
          value={message}
          className={classes.textfield}
          id="outlined-basic-helper-text"
          helperText={send ? '요청이 전송되었습니다.' : ''}
          label="인증번호"
          variant="outlined"
          disabled={!send}
          onChange={messageChange}
        />
        {!send ? (
        <Button variant="contained" color="primary" onClick={sendEmail}>
          인증 메일 보내기
        </Button>) : (<Button variant="contained" color="primary" onClick={authEmail}>
          인증하기
        </Button>)}
      </div>
    </Modal>
  );
};

export default AuthEamil;
