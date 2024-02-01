import { Tabs } from 'antd';
import EventItemInfo from '../components/EventItemInfo';
import EventItemAttachment from '../components/EventItemAttachment';
export default function EventItem({event}){  
    const items = [
        {
          key: '1',
          label: 'Info',
          children: <EventItemInfo event={event} />,
        },
        {
          key: '2',
          label: 'Attachments',
          children: <EventItemAttachment event={event} />,
        },
        
      ];
    
    return (
        <>
            <h1>{event.projectCode}</h1>
            <Tabs defaultActiveKey="1" items={items} />
        </>
    );
}