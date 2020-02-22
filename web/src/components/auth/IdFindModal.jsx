import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Modal, TextField } from '@material-ui/core/';
import {isInt, isLength} from "validator";
import * as userAPI from "../../apis/userAPI";
const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: 200,
    },
  },
  modal: {    
    height: "100%",
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    cursor: "pointer",
  },
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    textAlign: "center",
  },
  textfield: {
    width: "100%",
    marginTop: "50px",
    marginBottom: "50px",
  },
}));


export default function IdFindModal() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [valid, setValid] = React.useState(true);
  const [message, setMessage] = React.useState('');
  const [send, setSend] = React.useState(false);

  const messageChange = (event) => {
    setSend(false);
    setMessage(event.target.value)
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  
  const submit = () => {
    setSend(true);
    if (!isLength(message, {min:11, max:11}) || !isInt(message)) {
      setValid(false);
    }
    else {
      setValid(true);
      userAPI.findEmailByphone(message).then(response => {
        if(response.status===200){
          // console.log(response.data)
          alert("Id : " +  response.data + "입니다.")
        }else if(response.status===204){
          alert('가입하지 않은 전화번호 입니다.')
        }
      })
    }
  };

  return (
    <React.Fragment>
    <span className={classes.text} onClick={handleOpen}>아이디 찾기</span>
    <Modal
      className={classes.modal}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      open={open}
      onClose={handleClose}
    >
      <div className={classes.paper}>
        <h2 id="simple-modal-title">아이디 찾기</h2>
        <p id="simple-modal-description">
          아이디 찾기입니다. 전화번호를 입력해 주세요.
        </p>
        <form className={classes.root} noValidate autoComplete="off">          
          {
          valid
          ? (
              <TextField 
                value={message}
                className={classes.textfield}
                id="outlined-basic-helper-text"
                helperText={send && message !== ""?"요청이 전송되었습니다.":""}
                label="전화번호"
                variant="outlined"
                onChange={messageChange}
              />
            )
          : (
              
              <TextField
                error
                value={message}
                className={classes.textfield}
                id="outlined-error-helper-text"
                label="전화번호"
                helperText="11자리의 전화번호를 입력해주세요"
                variant="outlined"
                onChange={messageChange}
              />
            )
          }
        </form>
        <Button variant="contained" color="primary" onClick={submit}>가입 확인</Button>
      </div>
    </Modal>
    </React.Fragment>
  )
}