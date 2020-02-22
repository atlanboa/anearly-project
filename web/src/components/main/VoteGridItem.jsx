import React from "react";
import { makeStyles, Grid, Button } from "@material-ui/core";
import { Link } from "react-router-dom";

import Flippy, { FrontSide, BackSide } from 'react-flippy';
import { white } from "material-ui/styles/colors";
import { black } from "material-ui/styles/colors";

const useStyles = makeStyles(theme => ({
  large: {
    width: "100%",
    height: "100%",
    // height: "30vh",
    borderRadius: "5px",
    margin: "0 auto"
  },
  img: {
    width: "100%",
    // height: "30vh",
    // minHeight: "200px",
    height: 480,
    minHeight: "inset",
    [theme.breakpoints.down("xs")]: {
      height: "unset",
      minHeight: "480px"
      
    },
    borderRadius: "5px",
    transition: "transform 1s ease",
    "&:hover": {
      transform: "scale(1.1)"
    },
  },
  infoOpenHandlerGrid: {
    cursor: "pointer",
  },
  infoOpenHandlerGridItemTypography1: {
    padding: "5px 0 0 10px",
    fontWeight: "bold",
    fontSize: 13,
    fontFamily: "Noto Sans KR",
    color: "#191919"
  },
  infoOpenHandlerGridItemTypography2: {
    fontSize: 11,
    fontWeight: 700,
    padding: "0 10px 0 5px",
    color: "#696969"
  },
  infoOpenHandlerGridItemTypography3: {
    fontSize: 11,
    fontWeight: 700,
    color: "#696969"
  },
  infoOpenHandlerGridItemGrid: {
    marginTop: "5px",
  },
  infoOpenHandlerGridItemFaIcon: {
    fontSize: "17px",
    color: "#696969"
  },
  infoOpenHandlerGridItemViIcon: {
    fontSize: "21px",
    paddingRight: 5,
    color: "#696969"
  },
  cardGrid: {
    width: "100%",
    // height: "30vh",
    // minHeight: "200px",
    height: "100%",
  },
  backBtn: {
    fontSize: 35,
    color: black,
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    height: "100%",
    width: "100%",
    borderRadius: "500px"
  },
  progress: {
    color: "#52af77",
    borderRadius: 9,
    opacity: 0.8,
    border: 0,
  },
}));
const FlippyStyle = {
  width: "400px",
  height: '400px',
  textAlign: 'center',
  color: '#FFF',
  fontFamily: 'sans-serif',
  fontSize: '30px',
  justifyContent: 'center'
}

const FlippyOnHover = props => (
  <Flippy
    flipOnHover={true}
    flipDirection='horizontal'
    style={FlippyStyle}
  > 
    <DefaultCardContents index={props.index} data={props.data}>
    </DefaultCardContents>
  </Flippy>
);

const DefaultCardContents = props => {

  const classes = useStyles();
  return(
  
    <Grid>
      <FrontSide
        style={{
          padding: 0,
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          borderRadius: "500px",
          width:"400px", 
          height:"400px"
        }}
      >
        <img
          src={props.data.product_image}
          style={{
            resizeMode:"contain",
            borderRadius: "500px",
            width:"100%",
            height: "100%",
          }}
          alt="..."
        />
     
      </FrontSide>
      <BackSide
        style={{
          padding: 0,
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          borderRadius: "500px",
          backgroundColor:white,
        }}>
    

        <img
          src={props.data.product_image}
          style={{
            width:"100%",
            height: "100%",
            borderRadius: "500px",
            opacity: "0.3",
            zIndex:-1,
            transform: "scaleX(-1)"
          }}
          alt=""
        />
        <span 
          style={{
            fontSize:'25px',
            position: 'absolute',
            bottm:0,
            left: 0,
            right: 0,
            height: "100%",
            width: "100%",
            color: black
          }}>
          <div>
            <Button component={Link} to={`/ProductDetail/${props.index}`} className ={classes.backBtn} size="small" variant="text">상세 보기</Button>
            <div style={{marginTop: '70%'}}>
              {props.data.end_date}<br/>
              {props.data.category}<br/>
            </div>
          </div>
        </span>
      
      </BackSide>
    </Grid>)};


const VoteGridItem = props => {
  const classes = useStyles();
  return (
    <div className={classes.cardGrid}>
      <div style={{ display: 'flex', flex: '1 0 200px', justifyContent: 'space-around', 'flexWrap': 'wrap' }}>
        <FlippyOnHover data={props.itemData} index={props.index} flipDirection="horizontal"/>
      </div>
      <div style={{textAlign:'center'}}>
        <br/>
          설문 진행 상황 { Math.floor(props.itemData.cur_participant_number / props.itemData.max_participant_number * 100) + "% "}
        <progress className={classes.progress} value={props.itemData.cur_participant_number} max={props.itemData.max_participant_number}/>
      </div> 
    </div>
  );
}
export default VoteGridItem;
