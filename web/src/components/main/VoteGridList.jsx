import React, { useState, useEffect } from "react";
import {
  GridList,
  Grid,
  makeStyles,
  MenuItem,
  FormControl,
  Select
} from "@material-ui/core";
import VoteGridItem from "./VoteGridItem";
import TuneIcon from "@material-ui/icons/Tune";
import { useNowCols } from "../common/MediaQueryHooks";

import InfiniteScroll from 'react-infinite-scroll-component';
import CircularProgress from '@material-ui/core/CircularProgress';
import  * as surveyAPI from "../../apis/surveyAPI";
import './scrollStyle.css';

const useStyles = makeStyles(theme => ({
  root: {
    // display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    backgroundColor: theme.palette.background.paper,
  },

  gridList: {
    width: "100%",
    height: "100%"
  },
  VoteGridListGridItem: {
    padding: "5px 5px 0 10px",
    color: "#5D5D5D"
  },
  gridItem:{
    padding: "5px 5px 0 10px",
    marginBottom: "10px",
  },
  scroll:{
    width:"100%"
  }
}));

const ImageGridFilter = props => {
  const { filterItem, onChangeFilterItem } = props;
  const classes = useStyles();

  const items = [
    { key: "All", value: "All", disabled: false },
    { key: "생활", value: "생활", disabled: false },
    { key: "스마트폰", value: "스마트폰", disabled: false },
    { key: "컴퓨터", value: "컴퓨터", disabled: false },
    { key: "IT", value: "IT", disabled: false },
    { key: "기타", value: "기타", disabled: false }
  ];

  return (
    <FormControl className={classes.formControl}>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={filterItem}
        onChange={onChangeFilterItem}
        className={classes.ImageGridFilterSelect}
        disableUnderline
      >
        {items.map(item => (
          <MenuItem key={item.key} value={item.key} disabled={item.disabled}>
            {item.value}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

const VoteGridList = props => {
  const classes = useStyles();
  const nowCols = useNowCols();
  const [itemData, setData] = useState([{},]);
  const [moreData, setMoreData] = useState(true);
  const [filterItem, setFilterItem] = useState("All");
  const [scrollIndex, setScrollIndex] = useState(12);
  const [state, setState] = useState({
    items: []
  })

  useEffect(()=>{
    surveyAPI.GetApprovalSurvey().then(response=>{ /*console.log("ddd",response.data);*/ setData(response.data); setState({items:response.data.slice(0,12)}); setScrollIndex(12) });
  },[]);

  const onChangeFilterItem = event => {
    setFilterItem(event.target.value);
  };
  
  const fetchMoreData = () => {
    // let tempIndex = scrollIndex+(nowCols-1);
    let tempIndex = scrollIndex+nowCols-1;
    if(tempIndex > itemData.length) setMoreData(false);
    setTimeout(() => {
      setState({
        items: state.items.concat(itemData.slice(scrollIndex, tempIndex))
      });
      setScrollIndex(tempIndex);
    }, 500);
  };

  return (
    <div className={classes.root}>
      <Grid
        container
        alignItems="center"
        className={classes.VoteGridListGrid}
      >
        <Grid item className={classes.VoteGridListGridItem}>
          <TuneIcon />
        </Grid>
        <Grid item>
          <ImageGridFilter
            filterItem={filterItem}
            onChangeFilterItem={onChangeFilterItem}
          />
        </Grid>
      </Grid>
      <InfiniteScroll
        className={classes.scroll}
        dataLength={state.items.length}
        next={fetchMoreData}
        hasMore={moreData}
        loader={ <div style={{textAlign: 'center'}}><CircularProgress size={200} color="secondary" /></div>} 
      >
        <GridList className={classes.gridList} cols={nowCols-1} cellHeight={"auto"}>    
          {state.items.map((x, index) =>
            (x.category === filterItem || filterItem === "All")
              && (props.label === '' || x.title.includes(props.label)) &&
              (
                <Grid item key={index}>
                  <VoteGridItem itemData={x} index={x.id} />
                </Grid>
              )
          )}
        </GridList>
      </InfiniteScroll>
    </div>
  );
};

export default VoteGridList;
