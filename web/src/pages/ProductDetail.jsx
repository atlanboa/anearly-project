import React, {useState, useEffect} from "react";
import Layout from "../layout/Layout";
import { ViewContext } from "../context/ViewContext";
import ProductDetailComponent from "../components/productdetail/ProductDetailComponent";
import * as surveyAPI from "../apis/surveyAPI"
const ProductDetail = ({match}) => {
  const [productData, setProductData] = useState({data:{}, load:true});
  useEffect(()=>{
    surveyAPI.selectSurveyById(match.params.index).then(response=>{
      // console.log(response.data)
      setProductData({data: response.data, load: false});
    })
  },[]);
  return (
    <ViewContext.Provider value={{}}>
      <Layout>
        {!productData.load ? (
        <ProductDetailComponent productData={productData.data} index={match.params.index}/>) : 
        ("")}
      </Layout>
    </ViewContext.Provider>
  );
};

export default ProductDetail;
