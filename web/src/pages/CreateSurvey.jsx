import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Layout from "../layout/Layout";
import CreateSurveyTable from "../components/createsurvey/CreateSurveyTable";
import CreateSurveyDescription from "../components/createsurvey/CreateSurveyDescription";
import CreateSurveyItemListZone from "../components/createsurvey/CreateSurveyItemListZone";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
// import DraggableUploader from "../components/createsurvey/DraggableUploader";
import DraggableUploader2 from "../components/createsurvey/DraggableUploader2";
import * as surveyAPI from "../apis/surveyAPI";

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 800,
    minWidth: 400,
    margin: "10px auto",
  },
  table: {
    maxWidth: 800,
    minWidth: 400,
    margin: "10px auto",
  },
  h1: {
    textAlign: "center",
  },
  inputField: {
    width: `calc(100% - ${150}px)`,
  },
  valid: {
    color: "red"
  }
}));

/*
  보내는 데이터
{
  설문 제목title: ,
  최대 참여 인원 수max_participant_number:,       최소 10 이상
  설문 기간 옵션option:,
  설문시작일start_date: 2020-02-10,
  설문 종료일end_date:,
  카테고리category:,
  상품명product_name:,
  예상 가격product_price:,
  출시예정일product_release_date:
  메인 이미지 1개product_image:
  콘텐트(html스마트에디터):
  참여시 포인트point_per_participant:             최소 100 이상
  설문 [
    {
      타입survey_type
      질문주제title
      display_order
      선택지[
        {
          선택지 이름content: 선택지 1번,
          display_order: ,
        },             
      ]
    }
  ]
}
*/
const categories = ["IT", "생활", "스마트폰", "컴퓨터", "기타"]
const dateType = ["start_date", "end_date", "product_release_date"]
const dateType2 = ["startDateIsValid", "endDateIsValid", ]
const CreateSurvey = () => {
  const classes = useStyles();
  const today = new Date()
  const defaultDate = (today.getYear()+1900) + '-' + (today.getMonth()+1) + '-' + today.getDate()
  const [sendValue, setSendValue] = React.useState({
    title: "",
    max_participant_number: 0,
    option: 0,
    start_date: defaultDate,
    end_date: defaultDate,
    category: categories[0],
    product_name: "",
    product_price: 0,
    product_release_date: defaultDate,
    image: "",
    content: "",
    point_per_participant: 0,
    survey: [],
    age: 0,
    gender: 0,
  });

  const [validList, setValidList] = React.useState({
    titleIsValid: true,
    pointIsValid: true,
    participantIsValid: true,
    priceIsValid: true,
    optionIsValid: true,
    startDateIsValid: true,
    endDateIsValid: true,
    productNameIsValid: true,
    contentIsValid: true,
    surveyIsValid: true,
    ageIsValid: true,
  })

  const minimumPointPerParticipant = 100
  const minimumParticipantNumber = 10
  const minimumProductPrice = 0


  const titleChange = (event) => {
    setSendValue({...sendValue, title: event.target.value})
  }

  const optionChange = (event) => {
    setSendValue({...sendValue, option: Number(event.target.value)})
  }

  const dateChange = (date, idx) => {
    const setDate = (date.getYear()+1900) + '-' + (date.getMonth()+1) + '-' + date.getDate()
    setSendValue({...sendValue, [dateType[idx]]: setDate})
    if (idx !== 2) {
      let valid
      if (idx === 0) {
        if (new Date(setDate) - new Date(defaultDate) >= 0) {
          valid = true
        }
        else {
          valid =  false
        }
      }
      else if (idx === 1) {
        if (new Date(setDate) - new Date(sendValue.start_date) >= 0) {
          valid = true
        }
        else {
          valid = false
        }
      }
      setValidList({...validList, [dateType2[idx]]: valid})
    }
  }

  const preferAgeChange = (event) => {
    setSendValue({...sendValue, age: Number(event.target.value)})
    setValidList({...validList, ["ageIsValid"]: Number(event.target.value) >= 0})
  }

  const productNameChange = (event) => {
    setSendValue({...sendValue, product_name: event.target.value})
    setValidList({...validList, ["productNameIsValid"]: event.target.value !== ""})
  }
  
  const rewardChange = (event) => {
    setSendValue({...sendValue, point_per_participant: Number(event.target.value)})
    setValidList({...validList, ["pointIsValid"]: Number(event.target.value) >= minimumPointPerParticipant})
  }
  
  const participantChange = (event) => {
    setSendValue({...sendValue, max_participant_number: Number(event.target.value)})
    setValidList({...validList, ["participantIsValid"]: Number(event.target.value) >= minimumParticipantNumber})
  }
  
  const priceChange = (event) => {
    setSendValue({...sendValue, product_price: Number(event.target.value)})
    setValidList({...validList, ["priceIsValid"]: Number(event.target.value) >= minimumProductPrice})
  }

  const setContent = (content) => {
    setSendValue({...sendValue, content: content})
  }

  const surveyChange = (surveyList) => {
    setSendValue({...sendValue, survey: surveyList})    
  }

  const categoryChange = (value) => {
    setSendValue({...sendValue, category: value})
  }

  const genderCategoryChange = (value) => {
    var tmpGenderNumber=0
    if (value === "남") {
      tmpGenderNumber=1
    }
    else if (value === "여") {
      tmpGenderNumber=2
    }
    setSendValue({...sendValue, gender: tmpGenderNumber})
  }

  const imageChange = (value) => {
    setSendValue({...sendValue, image: value})
    document.querySelector("#file-browser-input").value=""
  }

  const titleValidCheck = () => {
    if (sendValue.title === "") {
      return false
    }
    return true
  }

  const pointPerParticipantValidCheck = () => {
    if (sendValue.point_per_participant >= minimumPointPerParticipant) {
      return true
    }
    return false
  }
  
  const maxParticipantNumberValidCheck = () => {
    if (sendValue.max_participant_number >= minimumParticipantNumber) {
      return true
    }
    return false
  }

  const productPriceValidCheck = () => {
    if (sendValue.product_price >= minimumProductPrice) {
      return true
    }
    return false
  }

  const optionValidCheck = () => {
    if (sendValue.option === 0 || sendValue.option === 1 ) {
      return true
    }
    return false
  }

  const startDateValidCheck = () => {
    if (new Date(sendValue.start_date) - new Date(defaultDate) >= 0) {
      return true
    }
    return false
  }

  const endDateValidCheck = () => {
    if (new Date(sendValue.end_date) - new Date(sendValue.start_date) >= 0) {
      return true
    }
    return false
  }

  const productNameValidCheck = () => {
    if (sendValue.product_name === "") {
      return false
    }
    return true
  }

  const contentValidCheck = () => {
    if (sendValue.content === "") {
      return false
    }
    return true
  }
  
  const surveyValidCheck = () => {
    if (sendValue.survey.length === 0) {
      return false
    }    
    for(var data of sendValue.survey) {
      if (data.type === 1) {
        if (data.title === "") {
          return false
        }
        for (var select of data.selects) {
          if (select.content === "") {
            return false
          }
        }
      }
      else if (data.title === "") {
        return false
      }
    }
    return true    
  }

  const ageIsValid = () => {
    if (sendValue.age >= 0) {
      return true
    }
    return false
  }
  
  function goTop(){
    document.documentElement.scrollTop = 0;
  }

  const cancelCreateSurveyForm = () => {
    alert("취소하였습니다.")
    //window.location.href = '/'
  };

  const submitCreateSurveyForm = () => {
    const temp = {
      "titleIsValid": titleValidCheck(),
      "pointIsValid": pointPerParticipantValidCheck(),
      "participantIsValid": maxParticipantNumberValidCheck(),
      "priceIsValid": productPriceValidCheck(),
      "optionIsValid": optionValidCheck(),
      "startDateIsValid": startDateValidCheck(),
      "endDateIsValid": endDateValidCheck(),
      "productNameIsValid": productNameValidCheck(),
      "contentIsValid": contentValidCheck(),
      "surveyIsValid": surveyValidCheck(),
      "ageIsValid": ageIsValid(),
    }

    var valid = true
    for (var key in temp) {
      if (!temp[key]) {
        valid = false
        break
      }
    }
    if (valid) {
      //유효성 통과
      // console.log("sendData ::: ", sendValue) 
      surveyAPI.createSurvey(sendValue).then(response=>{
        // console.log(response)
        if(response.status===200){
          alert('설문이 등록되었습니다.')
          window.location.href = '/';
        }
      }).catch(error=>{
        
        alert('debug message :: 설문등록중 문제발생')
      });
    }
    else {
      // 유효성 실패
      alert('비어있는 항목을 채워 주세요.')
      goTop()
    }
    setValidList(temp)
  }

  return(
    <Layout>
      <div className={classes.root}>
        <h1 className={classes.h1}>설문 만들기</h1><hr/><br/><br/>
        <div>
          <div className={classes.table}>
            <h2>설문제목: <TextField
              className={classes.inputField}
              onChange={titleChange}
              error={!validList.titleIsValid&&sendValue.title===""}
            />
            </h2>&nbsp;&nbsp;<br/>
          </div>
          <div className={classes.table}>
            <DraggableUploader2
              image={sendValue.image}
              imageChange={imageChange}/>
          </div>
          <CreateSurveyTable
            className={classes.table}
            dateChange={dateChange}
            optionChange={optionChange}
            rewardChange={rewardChange}
            participantChange={participantChange}
            priceChange={priceChange}
            categoryChange={categoryChange}
            categories={categories}
            minimumPointPerParticipant={minimumPointPerParticipant}
            minimumParticipantNumber={minimumParticipantNumber}
            minimumProductPrice={minimumProductPrice}
            productNameChange={productNameChange}
            preferAgeChange={preferAgeChange}
            genderCategoryChange={genderCategoryChange}
            validList={validList}
            sendValue={sendValue}
          /><br/>
          <div className={classes.table}>
            <h2>상세설명</h2><br/>
          </div>
          <CreateSurveyDescription setContent={setContent} />
          {validList.contentIsValid?"":(<p className={classes.valid}>제품 상세 설명을 작성해 주세요</p>)}
          <br/><br/><hr/>
          <div className={classes.table}>
            <h2>설문항목</h2><br/>
            <CreateSurveyItemListZone
              surveyChange={surveyChange}
              survey={sendValue.survey}
              validList={validList}
            />
            {validList.surveyIsValid?"":(<p className={classes.valid}>설문 항목을 하나 이상 만들고, 빈칸 없이 작성해 주세요</p>)}
            <br/><br/>
            <div className={classes.buttonBox}>
              <Button onClick={cancelCreateSurveyForm}>Cancel</Button>
              <Button onClick={submitCreateSurveyForm}>Submit</Button>
            </div>
          </div><br/><br/>
        </div>
      </div>
    </Layout>
  )
}

export default CreateSurvey;