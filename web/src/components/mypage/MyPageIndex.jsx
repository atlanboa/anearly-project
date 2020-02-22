import React, { useEffect, useState } from 'react';
import {makeStyles} from '@material-ui/core/styles';
import * as userAPI from "../../apis/userAPI";
import { FaUserCircle, FaCoins, FaUserEdit } from 'react-icons/fa';
import { MdPhone, MdEmail } from 'react-icons/md';
import { Grid, GridList, IconButton } from '@material-ui/core';
import { Paper } from 'material-ui';
import { MuiThemeProvider } from 'material-ui/styles';
import AdminPageButton from './AdminPageButton';

const useStyles = makeStyles({
	root: {
		maxWidth: 1000,
    minWidth: 500,
		margin: "10px auto 0px auto",
	},
	fontSizeLarge: {
		fontSize: 30,
	},
	infoPaper: {
		padding: 10,
	},
	linkToAdminpage: {
		float: "right",
		padding: 0,
	},
});

const MyPageIndex = (props) => {
	const classes = useStyles();
	const [userdata, setUserdata] = useState({
		nickName: "",
		email: "",
		gender: 0,
		age: 0,
		phone: "",
		rewardPoint: 0,
		authority: "",
  });
  useEffect(()=>{
		let tempdata;
		userAPI.getMyInformation().then(response => {
			// console.log(response.data)
			tempdata = response.data;
			setUserdata({
				nickName: tempdata.nickname,
				email: tempdata.email,
				gender: tempdata.gender,
				age: tempdata.age,
				phone: tempdata.phone,
				rewardPoint: tempdata.reward_point,
				authority: tempdata.authority,
      })
		})
	},[]);

	const onClickFloatUserUpdate = () => {
		props.setFloatUserUpdate(!props.floatUserUpdate);
	};

	var isAdmin;
	if(userdata.authority==="admin"){
		isAdmin = <AdminPageButton auth={true}/>;
	}
	
  return (
    <Grid className={classes.root}>
      <h2 style={{display:"inline"}}>My Info</h2>&nbsp;&nbsp;
      <IconButton className={classes.editBtn} onClick={onClickFloatUserUpdate}><FaUserEdit/></IconButton>
      <div className={classes.linkToAdminpage} >{isAdmin}</div>
      <hr style={{margin:0}}/><br/>
      <MuiThemeProvider>
        <Paper className={classes.infoPaper}>
          <GridList cellHeight="auto">
            <Grid container>
              <Grid xs={3} item={true}>
                <FaUserCircle size="70"/>
              </Grid>
              <Grid xs={8} item={true}>
                <span className={classes.fontSizeLarge}>{userdata.nickName}</span><br/>
                <p><MdEmail/>&nbsp;{userdata.email}&nbsp;</p>
                <p>
                  ({userdata.gender===1?"남":"여"},&nbsp;{userdata.age})&nbsp;
                  &nbsp;<MdPhone/>&nbsp;{userdata.phone}
                </p>
              </Grid>
            </Grid>
            <Grid> 	
              <FaCoins size="60"/>
              <span className={classes.fontSizeLarge}>&nbsp;&nbsp;{userdata.rewardPoint}&nbsp;원</span>
            </Grid>
          </GridList>
        </Paper>
      </MuiThemeProvider>
    </Grid>
  )
}

export default MyPageIndex;