import axios from 'axios';


export function imageUpload(form){
  return axios.post(`https://api.imgur.com/3/image/`, form, {headers: {
    'Authorization': "Client-ID b402ad68f474d88"
  }});
}