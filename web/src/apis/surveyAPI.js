import axios from 'axios';

const baseUrl = "http://192.168.100.60:9999"
const device_number = localStorage.getItem("device_number") ? localStorage.getItem("device_number") : 0
/**********Survey Controller**********/

/**********Delete**********/
export function DeleteSurvey(id){
  return axios.delete(`${baseUrl}/surveyapi/survey/${id}` ,{headers: {
    'Authorization': localStorage.getItem("token")
  }});
}

/**********Get**********/
export function GetRecommendSurvey(){
  // console.log(device_number)
  return axios.get(`${baseUrl}/api/person/${device_number}`)
}

// export function GetAllDeadlineSurvey(){
//   return axios.get(`${baseUrl}/surveyapi/survey/deadline`);
// }

//GetAllSurvey
export function GetAllSurvey(){
  return axios.get(`${baseUrl}/surveyapi/surveys`);
}

export function GetApprovalSurvey(){
  return axios.get(`${baseUrl}/surveyapi/survey/approval/1`);
}


//selectSurveyById
export function selectSurveyById(index){
  return axios.get(`${baseUrl}/surveyapi/survey/id/${index}`);
}

export function surveyDetailAndReview(index){
  return axios.get(`${baseUrl}/api/surveydetailandreview/${index}`, {headers: {
    'Authorization': localStorage.getItem("token")
  }});
}

//selectAllSurveyByUserId
export function selectAllSurveyByUserId(id){
  return axios.get(`${baseUrl}/surveyapi/survey/userid/${id}`,  {headers: {
    'Authorization': localStorage.getItem("token")
  }});
}

//selectSurveyAttendHistoryByUserId
export function selectSurveyAttendHistoryByUserId(id){
  return axios.get(`${baseUrl}/api/survey/history/${id}`,  {headers: {
    'Authorization': localStorage.getItem("token")
  }});
}

//GetSurveyById
export function GetSurveyById(index){
  return axios.get(`${baseUrl}/surveyApi/GetSurvey/${index}`, {headers: {
    'Authorization': localStorage.getItem("token")
  }});
}

//surveyAnalysis
export function surveyAnalysis(index){
  return axios.get(`${baseUrl}/api/survey/analysis/${index}`, {headers: {
    'Authorization': localStorage.getItem("token")
  }});
}

export function getSurveyReviews(index){
  return axios.get(`${baseUrl}/api/survey/analysis/review/${index}`, {headers: {
    'Authorization': localStorage.getItem("token")
  }});
}

/**********Post**********/

//createSurvey
export function createSurvey(createData){
  return axios.post(`${baseUrl}/api/survey`, createData, {headers: {
    'Authorization': localStorage.getItem("token")
  }});
}

//
export function doSurvey(id, surveyData){
  return axios.post(`${baseUrl}/api/survey/${id}`, surveyData, {headers: {
    'Authorization': localStorage.getItem("token")
  }})
}

/**********Put**********/

export function ApprovalSurvey(data){
  return axios.put(`${baseUrl}/surveyapi/survey/approval`,data ,{headers: {
    'Authorization': localStorage.getItem("token")
  }});
}

export function CloseSurvey(data){
  return axios.put(`${baseUrl}/surveyapi/survey/close`,data ,{headers: {
    'Authorization': localStorage.getItem("token")
  }});
}
