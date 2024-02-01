import { useLoaderData } from "react-router-dom";
import EventForm from "../components/EventForm";
export default function NewEventPage(){
    const data = useLoaderData();
    return (
        <>
            <EventForm applicationList={data}/>
        </>
    );
}