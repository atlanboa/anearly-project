import React from "react";
import Layout from "../layout/Layout";

import VoteInfo from "../components/votedetail/VoteInfo";

import { makeStyles } from "@material-ui/core";
import Typography from '@material-ui/core/Typography';

import { ViewContext } from "../context/ViewContext";

const useStyles = makeStyles(theme => ({
	voteTitle: {
		textAlign: 'center',
		fontSize: 60,
		margin: 100,
	}
}));

const VoteDetail = ({match}) => {
	const classes = useStyles();
	return (
		<ViewContext.Provider value={{}}>
			<Layout>
				<Typography className={classes.voteTitle}>설문 상세 페이지 </Typography>
				<VoteInfo index={Number(match.params.index)+1}/>
			</Layout>
		</ViewContext.Provider>
	);
};

export default VoteDetail;
