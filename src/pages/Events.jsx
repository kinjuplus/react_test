import { useLoaderData } from "react-router-dom";
import axios from "axios";
import EventList from "../components/EventList";
import { useTranslation } from "react-i18next";
export default function EventsPage(){
    const events = useLoaderData();
    const {t} = useTranslation();
    return (
        <>
            <h1>{t('allEvent')}</h1>
            <EventList events={events} />
        </>
    );
}

export async function eventsLoader() {
    const response = await axios('http://localhost:8083/rest/webService/events');
    if(response.status !== 200){
        throw new Error('Could not fetch events.');
    }
    return response.data;
}    
