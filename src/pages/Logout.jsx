import { redirect } from "react-router-dom";

export function action(){
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('userDetails');
    return redirect(`${import.meta.env.VITE_SSOV4_LOGOUT_URL}${encodeURIComponent('http://localhost:5173')}&SysID=${import.meta.env.VITE_SSOV4_SYS_ID}`);
}