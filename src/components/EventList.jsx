import { Link } from "react-router-dom";
import { Table } from "antd";
import classes from './EventList.module.css';
export default function EventList({ events }) {
    
    const columns = [
        {
            title: 'Project Code',
            dataIndex: 'projectCode',
            key: 'projectCode',
            render: (text, record) => <Link to={`/events/${record.id}`}>{text}</Link>,
        },
        {
            title: 'Application',
            dataIndex: 'application',
            key: 'application',
        },
        {
            title: 'Model Name',
            dataIndex: 'modelName',
            key: 'modelName',
        }
    ]
    
    return (
        <Table columns={columns} dataSource={events}  style={{borderColor: 'red'}}  rowKey={(record) => record.id} rowClassName={classes.tableBorder} bordered>

        </Table>
    );
}