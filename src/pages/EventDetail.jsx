import axios from "axios";
import { useRouteLoaderData, useNavigate, redirect } from "react-router-dom";
import EventItem from "./EventItem";
import { useSelector , useDispatch}   from 'react-redux';
import { userDetailActions } from '../store/userDetail-slice.js';
export default function EventDetailPage(){
    const roles = useSelector(state => {return state.roles;});
    const event = useRouteLoaderData('event-detail');
    return (
        <EventItem event={event} />
    );
}

export async function eventDetailLoader({request, params}){
    const id = params.eventId;
    const response = await axios.get(`http://localhost:8083/rest/webService/events/${id}`);
    if(response.status !== 200){
        throw new Error('Could not fetch events.');
    }
    if(!response.data.event){
        return redirect('/Error404');
    }
    return response.data.event;
}