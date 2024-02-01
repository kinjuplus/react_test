import { Collapse, Row, Col, Dropdown, Modal, Button,ConfigProvider, Spin, Descriptions } from "antd";
import { DownOutlined, UserOutlined,SmileOutlined  } from '@ant-design/icons';
import classes from './EventItemInfo.module.css';
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
export default function EventItemInfo({event}) {
    const navigate = useNavigate();
    const [isProcessing, setIsProcessing] = useState(false);

    const descriptionItems = [
      {
        key: '1',
        label: 'Model Name',
        children: `${event.modelName}`,
      },
      {
        key: '2',
        label: 'Project Code',
        children: `${event.projectCode}`,
      },
      {
        key: '3',
        label: 'Event Date',
        children: `${event.eventDate}`,
      },
      {
        key: '4',
        label: 'Project Classification',
        children: `${event.projectClassification}`,
      },
      {
        key: '5',
        label: 'Application',
        children: `${event.application}`,
      },
      {
        key: '6',
        label: 'PM',
        children: `${event.pm.name}`,
      },
    ];

    const menuItems = [
        {
            key: '1',
            label: (
              <Link to={`/events/${event.id}/edit`}>Edit Attribute
              </Link>
            ),
          },
          {
            key: '2',
            label: (
              <a  href="#" >
                DELETE
              </a>
            ),
          },
          {
            key: '3',
            label: (
              <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com" >
                2nd menu item (disabled)
              </a>
            ),
            icon: <SmileOutlined />,
            disabled: true,
          },
          {
            key: '4',
            label: (
              <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
                3rd menu item (disabled)
              </a>
            ),
            disabled: true,
          },
          {
            key: '5',
            danger: true,
            label: 'a danger item',
          },
        
      ];
    
    const items = [
        {
          key: 'Biz Info',
          label: 'Biz Info',
          children:
          <>
           <Row>
               <Col span={6}><label className={classes.colFormLabel}>Project Code</label></Col>
               <Col span={6}><span>{event.projectCode}</span></Col>
               <Col span={6}><label className={classes.colFormLabel}>Model Name</label></Col>
               <Col span={6}><span>{event.modelName}</span></Col>
           </Row>
           <Row>
               <Col span={6}><label className={classes.colFormLabel}>Event Date</label></Col>
               <Col span={6}><span>{event.eventDate}</span></Col>
               <Col span={6}><label className={classes.colFormLabel}>Application</label></Col>
               <Col span={6}><span>{event.application}</span></Col>
          </Row>
          <Row>
               <Col span={6}><label className={classes.colFormLabel}>Project Classification</label></Col>
               <Col span={6}><span>{event.projectClassification}</span></Col>
               <Col span={6}><label className={classes.colFormLabel}>PM</label></Col>
               <Col span={6}><span>{event.pm.name}</span></Col>
           </Row>
           <Row>
               <Descriptions title="Event Info" items={descriptionItems} labelStyle={{color: 'blue'}}/>
           </Row>
          </>
        },
        {
          key: 'Technical Info',
          label: 'Technical Info',
          children: 
          <>
           <Row>
               <Col span={6}><label className={classes.colFormLabel}>Size</label></Col>
               <Col span={6}><span>{event.size}</span></Col>
               
           </Row>
          </>
        },
        {
          key: 'System Info',
          label: 'System Info',
          children: 
          <>
            <Row>
               <Col span={6}><label className={classes.colFormLabel}>Creator</label></Col>
               <Col span={6}><span>{event.creator.name}</span></Col>
               <Col span={6}><label className={classes.colFormLabel}>Created Time</label></Col>
               <Col span={6}><span>{event.creationDate}</span></Col>      
           </Row>
          </>
        },
      ];

      
      async function handleDeleteEvent(){
         setIsProcessing(true);
         const response = await axios.delete(`http://localhost:8083/rest/webService/events/${event.id}`);
         setIsProcessing(false);
         if(response.data.errorCode == '00'){
            navigate('/events');
         }else{
            alert('Error');
         }
      }

      function handleMenuClick({key}){
        if(key === '2'){
          Modal.confirm({
            title: 'Confirm',
            content: 'Are you sure you want to delete this event?',
            onOk() {
              handleDeleteEvent();
            },
            footer: (_, { OkBtn, CancelBtn }) => (
              <>
                <CancelBtn />
                <OkBtn />
              </>
            ),
          });
        }
      }

    return (
        <>
          {isProcessing ? <Spin size="large" fullscreen/> : null} 
          <ConfigProvider
            theme={{
                components: {
                Button: {
                    // colorPrimary: '#cd5c5c',
                    algorithm: true, // 启用算法
                    colorBgBase: '#9acd32',
                },
                Dropdown: {
                    colorPrimary: '#cd5c5c',
                    algorithm: true, // 启用算法
                    colorBgBase: '#9acd32',
                  }
                },
            }}>

           <Dropdown
              menu={
               {
                  items: menuItems,
                  onClick: handleMenuClick
                }
             }
             placement="bottomLeft"
             arrow
          >
      <Button >Actions</Button>
    </Dropdown> 
    </ConfigProvider>
           <br/>
           <br/>
           <Collapse items={items} defaultActiveKey={['1']}/>
         
        </>
    );
}