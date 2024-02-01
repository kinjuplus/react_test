import { redirect } from 'react-router-dom';
import axios from 'axios';
import { store } from '../store/index.js';
import { userDetailActions } from '../store/userDetail-slice.js';

export function getTokenDuration(){
    const storedExpirationDate = localStorage.getItem('expiration');
    const expirationDate = new Date(storedExpirationDate);
    const now = new Date();
    const duration = expirationDate.getTime() - now.getTime();
    return duration;
}

export async function getAuthToken() {
    const token = localStorage.getItem('token');
    if(!token){
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const urlToken = urlParams.get('Token');
        if(urlToken){
            let resData = await verifyToken(urlToken);
            if(resData && resData['AD']){
                const userDetails = await getUserDetail(resData.MemID);
                store.dispatch(userDetailActions.setUserDetails({empNo: userDetails.empNo, name: userDetails.name, roles: userDetails.roles}));
                localStorage.setItem('token', JSON.stringify(resData));
                localStorage.setItem('userDetails', JSON.stringify(userDetails));
                const expiration = new Date();
                expiration.setHours(expiration.getHours() + 1);
                //expiration.setMinutes(expiration.getMinutes() + 1);
                localStorage.setItem('expiration', expiration.toISOString()); 
                HideToken() ;
                return JSON.stringify(resData);
            }
       }
       return null;
    }
    const tokenDuration = getTokenDuration();
    if(tokenDuration < 0){
       return 'EXPIRED';
    }
    return token;
}

function HideToken() {
    var url = DeleteStringCase(DeleteStringCase(location.href, "ssoretry"), "Token");
    window.history.replaceState(null, null, url);
}


function DeleteStringCase(loc, name) {
    var reg = new RegExp("(^|&|\\?)" + name + "=([^\&\#]*)(&|$)?"), r, result;
    var s = loc.split("?");
    if (s.length > 0)
        s = "?" + s[1];
    else
        s = "";
    r = s.match(reg);
    if (r) {
        //r = unescape(r[0]);
        if (r[3] == "" || r[3] == null)
            result = loc.replace(r[0], "");
        else
            result = loc.replace(r[0], r[1]);
        return result;
    } else {
        return loc;
    }
}


async function verifyToken(urlToken){
    console.log(urlToken);
    const authData = {
        Token: urlToken,
        IsCheckIP: false,
        SysID:import.meta.env.VITE_SSOV4_SYS_ID
    }
    
    const response = await fetch(import.meta.env.VITE_SSOV4_VERIFY_TOKEN_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(authData)
    });
    if(response.status !== 200){
        return null;
    }
    return  await response.json();
}

export function tokenLoader() {
    return getAuthToken();
}

export async function checkAuthLoader() {
    const token = await getAuthToken();
    console.log(token);
    if (!token) {
        return redirect(`${import.meta.env.VITE_SSOV4_LOGIN_URL}${encodeURIComponent(window.location.href)}&SysID=${import.meta.env.VITE_SSOV4_SYS_ID}`);
    }
    if(token === 'EXPIRED'){
        return  redirect('/logout');
    }

    return token;
}

export async function getUserDetail(empNo){
    const response = await axios.get(`http://127.0.0.1:8083/rest/webService/users/${empNo}`);
    if(response.data.errorCode == '99'){
       throw new Error("Failed to get user detail");
    }
    return response.data.user;  
}