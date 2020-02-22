import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Modal, TextField } from '@material-ui/core/';
import * as userAPI from "../../apis/userAPI";

const useStyles = makeStyles(theme => ({
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

export default function PasswordFindModal() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [valid, setValid] = React.useState(true);
  const [message, setMessage] = React.useState('');
  const [send, setSend] = React.useState(false);
  const [load, setLoad] = React.useState(false);
  const messageChange = (event) => {
    setSend(false);
    setMessage(event.target.value)
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSend(false);
    setValid(true);
    setMessage('');
  };

  const submit = () => {
    setLoad(true);
    if (message === '') {
      setValid(false);
    }
    else {
      userAPI.userEmail(message).then(response=>{
        if(response.data){
          setValid(false);
          //없는 유저인 경우
        }else{
          userAPI.sendPassword(message).then(response=>{
            if(response.data==="mail-not-sent"){
              setValid(false)
            }else{
              handleClose();
            }
            setLoad(false);
          });
        }
      })
    }
  };

  return (
    <React.Fragment>
      <span className={classes.text} onClick={handleOpen}>비밀번호 찾기</span>
      <Modal
        className={classes.modal}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={handleClose}
      >
        <div className={classes.paper}>
          <h2 id="simple-modal-title">비밀번호찾기</h2>
          <p id="simple-modal-description">
            가입한 아이디를 입력하시면<br/>
            입력한 아이디로 이메일을 보내 드립니다.
          </p>
          <form className={classes.root} noValidate autoComplete="off">          
            {
            valid
            ? (
                <TextField 
                  value={message}
                  className={classes.textfield}
                  id="outlined-basic-helper-text"
                  helperText={send && message !== ""?"입력하신 이메일로 임시 비밀번호를 발송하였습니다.":""}
                  label="이메일"
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
                  label="이메일"
                  helperText="올바른 이메일을 입력해주세요"
                  variant="outlined"
                  onChange={messageChange}
                />
              )
            }
          </form>
          <Button variant="contained" disabled={load} color="primary" onClick={submit}>확인</Button>
        </div>
      </Modal>
    </React.Fragment>
  )
}