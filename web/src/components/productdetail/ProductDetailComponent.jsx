import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Paper, Button, Modal } from '@material-ui/core';
import { UncontrolledCarousel } from 'reactstrap';
import VoteDetail from '../votedetail/VoteDetail';


const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: "1024px",
    margin: "0 auto",
  },
  progress: {
    color: "#52af77",
    borderRadius: 9,
    opacity: 0.8,
    border: 0,
    width: "100%",
  },
  carousel: {
    backgroundColor: "transparent",
    color: "black",
    maxHeight: 500,
    overflow: "hidden",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  modal: {
    height: "100%",
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalInner: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    height: "100%"
  },
  voteDetail: {
    height: "100%"
  },
  button: {
    display: "block",
    marginLeft: "auto",
  },
  gridItem: {
    padding: 10,
  }
}));


const ProductDetailComponent = props => {
  const classes = useStyles();
  // //const endDate = new Date(productData.end_date.split('-'));
  var endDate = new Date();
  var today = new Date();
  if(props.productData.end_date){
    var dateTmp = props.productData.end_date.split('-');
    endDate = new Date(dateTmp[0], dateTmp[1], dateTmp[2]);
  }
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  if (props.productData.product_image) {
    var items = props.productData.product_image.split(' ').map((title, index) => (
      {
        src:title,
        altText: "slide " + index,
  
        // 이미지위에 쓸 텍스트
        caption: "",
        
        key: index
      }
    ));
    // console.log(items)

  }
  
  return (
    <Grid container className={classes.root} direction='row-reverse'>
      <Grid className={classes.gridItem} item xs={12}>
        <h3>카테고리: { props.productData.category }</h3>
        <h2>{ props.productData.title }</h2>
        <hr />
      </Grid>
      <Grid className={classes.gridItem} item sm={12} md={3}>
        현재 달성률: { Math.floor(props.productData.cur_participant_number / props.productData.max_participant_number * 100) + "%"} 
        <progress className={classes.progress} value={props.productData.cur_participant_number} max={props.productData.max_participant_number}/>

        설문 종료일: 
        { endDate.getDate()-today.getDate() >= 0 ? endDate.getDate()-today.getDate() + "일 남았습니다." : "설문 기간이 지났습니다."}<br />

        출시 예정일: 
        
        { props.productData.product_release_date }<br />
      </Grid>
      <Grid item sm={12} md={9}>
        { items ? (<UncontrolledCarousel className={classes.carousel} items={items}/>):""
        }
        <Paper className={classes.paper} dangerouslySetInnerHTML={{__html:props.productData.content}} id="porductdetailcontent"></Paper>
        <Button onClick={handleOpen} size="large">설문하러 가기</Button>
        <Modal
          className={classes.modal}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={open}
          onClose={handleClose}
        >
          <div className={classes.modalInner}>
            <Button className={classes.button} onClick={handleClose}>닫기</Button>
            <VoteDetail index={props.index} className={classes.voteDetail} />
          </div>
        </Modal>
      </Grid>
    </Grid>
  );
}

export default ProductDetailComponent;