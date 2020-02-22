import React, {useEffect} from "react";
import VoteInfo from "./VoteInfo";
import { makeStyles } from "@material-ui/core";
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles(theme => ({
  voteDetail: {
    height: "95%",
    textAlign: 'center',
    overflow: "auto",
  },
  title: {
    fontSize: 60,
  }
}));

const VoteDetail = props => {
  const classes = useStyles();
  return (
    <div className={classes.voteDetail}>
      <Typography className={classes.title}>설문 상세 페이지</Typography>
      <VoteInfo index={props.index}/>
    </div>
  );
  };

  export default VoteDetail;
