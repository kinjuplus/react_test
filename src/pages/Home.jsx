import { Breadcrumb,Table} from 'antd';
import { HomeOutlined, AppstoreOutlined  } from '@ant-design/icons';
import classes from './Home.module.css';

const colomns = [
    {
        title:'',
        className: 'tableBorder',
        render: () => <AppstoreOutlined/>,
    },
    {
       title:'主旨',
       dataIndex: 'subject',
       key: 'subject',
       className: 'tableBorder',
       render: (text) => <a>{text}</a>,
    },
    {
       title:'公告日',
       dataIndex: 'publishDate',
       key: 'publishDate',
       className: 'tableBorder',
       render: (text) => <a>{text}</a>,
    }
]


const data = [
  {
    key:'1',
    subject:'test',
    publishDate:'2022-01-01'
  },
  {
    key:'2',
    subject:'test2',
    publishDate:'2023-01-01'
  }

];

export default function HomePage(){
    return (
      <>
        <Breadcrumb
                style={{
                margin: '16px 0',
                }}
                items={[
                    {
                      href: '/',
                      title: <HomeOutlined />,
                    },
                   /* {
                      href: '/events',
                      title: (
                        <>
                          <UserOutlined />
                          <span>Application List</span>
                        </>
                      ),
                    },
                    {
                      title: 'Application',
                    },*/
                  ]}
            >
              
           </Breadcrumb>
        <Table dataSource={data} columns={colomns}   bordered  rowClassName={classes.tableBorder}/>
      </>   
    );
}