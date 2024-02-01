import axios from "axios";
import { useLoaderData, redirect } from "react-router-dom";
import EventForm from "../components/EventForm";

export default function EditEventPage(){
    const { event, applicationList } = useLoaderData();
    console.log(event);
    console.log(applicationList);
    return (
        <>
            <h1>Edit Event</h1>
            <EventForm applicationList={applicationList} event={event}/>
        </>
    );
}


export async function  editEventLoader({request, params}){
    const id = params.eventId;
    
    const results = await Promise.all([axios.get(`http://localhost:8083/rest/webService/events/${id}`), axios.get('http://localhost:8083/rest/webService/plmApplication')]);
    const event = results[0].data.event;
    const applicationList = results[1].data;
    return { event, applicationList };
}