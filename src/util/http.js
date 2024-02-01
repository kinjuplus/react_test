import axios from 'axios';

export async function getUserDetail(empNo){
    const response = await axios.get(`http://127.0.0.1:8083/rest/webService/users/${empNo}`);
    if(response.data.errorCode == '99'){
       throw new Error("Failed to get user detail");
    }
    return response.data.user;  
}