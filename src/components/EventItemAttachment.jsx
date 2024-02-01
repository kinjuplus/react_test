import { Table } from "antd";
export default function EventItemAttachment({event}){
    const attachments = event.attachmentList;
    const columns = [
        {
            title: 'File Name',
            dataIndex: 'fileName',
            key: 'fileName',
        },
    ]    
    
    return (
       <Table columns={columns} dataSource={attachments} bordered rowKey={(record) => record.id}/>
    );
}