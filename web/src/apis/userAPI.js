import axios from 'axios';

const baseUrl = "http://13.124.194.207:8989/"
/**********User Controller**********/


/**********Delete**********/
//deleteUser
export function deleteUser(id){
  return axios.delete(`${baseUrl}/userapi/user/delete/${id}`,{headers: {
    'Authorization': localStorage.getItem("token")
  }});
}

/**********Get**********/
//getAllUser
export function getAllUser(){
  return axios.get(`${baseUrl}/userapi/users`, {headers: {
    'Authorization': localStorage.getItem("token")
  }});
}

//getMyInformation
export function getMyInformation(){
    return axios.get(`${baseUrl}/userapi/user/token`, {headers: {
        'Authorization': localStorage.getItem("token")
      }});
}

//userNickname
export function userNickname(nickname){
  return axios.get(`${baseUrl}/userapi/user/nickname/${nickname}`);
}

//userEmail
export function userEmail(email){
    return axios.get(`${baseUrl}/userapi/user/email/${email}`);
}

//findEmailByphone
export function findEmailByphone(phone){
    return axios.get(`${baseUrl}/userapi/user/phone/${phone}`);
}

//sendEmail
export function sendEmail(email){
    return axios.get(`${baseUrl}/userapi/auth/${email}`);
}

//serdPassword
export function sendPassword(email){
    return axios.get(`${baseUrl}/userapi/user/send/password/${email}`);
}

/**********Post**********/
//login
export function login(email, pw){
  return axios.post(`${baseUrl}/userapi/login`, {"email": email, "pw": pw});
}

//signUp
export function signUp(formdata){
  // console.log(formdata)
  return axios.post(`${baseUrl}/userapi/user`, formdata);
}



/**********Put**********/
//userUpdate
export function passwordChange(data){
  return axios.put(`${baseUrl}/userapi/user/password`, data, {headers: {
    'Authorization': localStorage.getItem("token")
  }})
}
//authEmail
export function authEmail(code, email){
    // console.log("authEmail ::  code=", code, " email=>", email)
    return axios.put(`${baseUrl}/userapi/auth/${email}/${code}`);
}