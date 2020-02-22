import React, {useState, useEffect} from "react";
import { makeStyles, Grid} from "@material-ui/core";
import './prioritySurvey.css';
import UncontrolledCarousel from "../common/UncontrolledCarousel";
import  * as surveyAPI from "../../apis/surveyAPI";

const useStyles = makeStyles(theme => ({
  carousel: {
    width: "100%",
    height: "700px",
    overflow: "hidden"
  }
}));

export default function PrioritySurvey(){ 
    
  const classes = useStyles();
  const [items, setItems] = useState([
    // {
    //   "id, user_id":0,
    //   "title":'',
    //   "hit":0,
    //   "start_date":'',
    //   "end_date":'',
    //   "budget":0,
    //   "category":'',
    //   "product_name":'',
    //   "product_price":0,
    //   "product_release_date":'',
    //   "product_image":'',
    //   "max_participant_numbmer":0,
    //   "cur_participant_number":0,
    //   "point_per_participant":0
    // },
  ]);

  useEffect(()=>{
    surveyAPI.GetRecommendSurvey().then(response=>{
      setItems(response.data.map((data, index) => (
        {
          src: data.product_image!==""?data.product_image.split(' ')[0]:"",
          altText: data.title,
          caption: "",
          key: index,
          idx: data.id
        }

      ))  );
    });
  },[]);
	
  return (
    <Grid>
      <UncontrolledCarousel className={classes.carousel} items={items}/>
    </Grid>
  )
}