import { Outlet, useLoaderData, useSubmit, useNavigate } from 'react-router-dom';
import { useEffect} from 'react';
import { getTokenDuration } from '../util/auth';
import {  useTranslation } from 'react-i18next';
import React from 'react';
import { LaptopOutlined, NotificationOutlined, UserOutlined,AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import {  Layout, Menu, theme, ConfigProvider, Switch, Watermark } from 'antd';
import axios from 'axios';
const { Header, Content, Sider } = Layout;


const items1 = ['1', '2', '3'].map((key) => ({
  key,
  label: `nav ${key}`,
}));


function getItem(label, key, icon, children, type) {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
  }

  const menuLinkMap = new Map([
    ['eventList', 'events'],
    ['createEvent','events/new'],
    ['line_pie','charts'],
    ['logout','logout']
  ]);

  const menuItems = [
    getItem('Events', 'events', <MailOutlined />, [
      getItem('Event List', 'eventList'),
      getItem('Create Event', 'createEvent'),
      getItem('Chart', 'charts', null, [getItem('Line & Pie', 'line_pie')], 'group'),
    ]),
    getItem('Navigation Two', 'sub2', <AppstoreOutlined />, [
      getItem('Option 5', '5'),
      getItem('Option 6', '6'),
      getItem('Submenu', 'sub3', null, [getItem('Option 7', '7'), getItem('Option 8', '8')]),
    ]),
    {
      type: 'divider',
    },
    getItem('Logout', 'logout', <SettingOutlined />),
    getItem('Group', 'grp', null, [getItem('Option 13', '13'), getItem('Option 14', '14')], 'group'),
  ];

const items2 = [UserOutlined, LaptopOutlined, NotificationOutlined].map((icon, index) => {
  const key = String(index + 1);
  return {
    key: `sub${key}`,
    icon: React.createElement(icon),
    label: `event ${key}`,
    children: new Array(4).fill(null).map((_, j) => {
      const subKey = index * 4 + j + 1;
      return {
        key: subKey,
        label: `option${subKey}`,
      };
    }),
    /*children: [
      {
         key: 'eventDetail',
         label: 'eventDetail', 
      },
      {
        key: 'editEvent',
        label: 'editEvent', 
     }
    ]*/
  };
});

export default function RootLayout(){
   const token = useLoaderData();
   const submit = useSubmit();
   const navigate = useNavigate();
   const { i18n } = useTranslation();
   
   const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  useEffect(() => {
    if(!token){
      return;
    }

    if(token === 'EXPIRED'){
      submit(null, { method: 'post', action: '/logout' });
      return;
    }
    const tokenDuration = getTokenDuration();
    console.log(tokenDuration);
    setTimeout(() => {
      submit(null, { method: 'post', action: '/logout' });
    }, tokenDuration);
  
  },[token, submit]);



   function handleMenuItemClick(e){
       console.log(e);
       if(e.key === 'logout'){
        submit(null, { method: 'post', action: '/logout' });
        return;
       }
       if(menuLinkMap.get(e.key)){
        navigate(menuLinkMap.get(e.key));
       }
   }

  

   function handleSwitchChange(checked){
      if(checked){
        i18n.changeLanguage('zh-TW');
      }else{
        i18n.changeLanguage('en');
      }
   }
  
    return (
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#665E16',
          },
        }}
      >
          
      <Layout style={{ width: '100vw',height: '100vh' }}>
      <Header>
        <Switch checkedChildren="中文" unCheckedChildren="English" defaultChecked  onChange={handleSwitchChange}/>
      </Header>
      <Layout>
      
        <Sider
          width={200}
          style={{
            background: colorBgContainer,
            height: '150vh'
          }}
        >
          <Menu
            onClick={handleMenuItemClick}
            mode="inline"
            theme='dark'
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{
              height: '100%',
              borderRight: 0,
            }}
            items={menuItems}
          />
        </Sider>
        <Layout
          style={{
            padding: '0 24px 24px',
          }}
        >
         <Watermark content="Ant Design">     
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
           
         
           <Outlet/>
          </Content>
          </Watermark>
        </Layout>
      </Layout>
    </Layout>
 
    </ConfigProvider>
      );
}