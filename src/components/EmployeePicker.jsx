import { Button, Form, Input, Modal, Radio, Spin, Table } from 'antd';
import { SearchOutlined, LoadingOutlined  } from '@ant-design/icons';
import { useState } from 'react';
import Search from 'antd/es/input/Search';
export default function EmployeePicker({open, onCreate,onCancel}) {
    const [form] = Form.useForm();
    const initialSearchResult = [
        {
            key:'1',
            empNo: '',
            name: 'No result',
            
        }
    ];

    const [searchResult, setSearchResult] = useState(initialSearchResult);
    const [ selectedEmployee, setSelectedEmployee] = useState({});  
    const [isLoading, setIsLoading] = useState(false);

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
          console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
          setSelectedEmployee(selectedRows[0]);
        },
        /*getCheckboxProps: (record) => {
           
            return {
               disabled: record.name === 'Disabled User',
              // Column configuration not to be checked
               name: record.name,
          }  
        },*/
      };
   
    const columns = [
        {
            title: 'EmpNo',
            dataIndex: 'empNo',
            key: 'empNo',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'E-mail',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Dept No',
            dataIndex: 'deptNo',
            key: 'deptNo',
        }  
    ]

    async function handleSearch(){
        let keyword = form.getFieldValue('keyword');
        console.log(keyword);
        if(!keyword){
            alert('Please input keyword');
            return;
        }
        setIsLoading(true);
        const response = await fetch(`http://localhost:8083/rest/webService/hr/restsearch?qry=${keyword}`);
        if(response.status !== 200){
            alert('Error');
            return;
        }
        const result = await response.json();
        setTimeout(() => {
           console.log(result);
           setSearchResult(result);
           setIsLoading(false);    
        }, 1000);
        
    }

    function onChange(value) {
        console.log(`selected ${value}`);
    }

    return (
       <Modal
            open={open}
            title="Pick an employee"
            okText="Pick"
            cancelText="Cancel"
            onCancel={onCancel}
            width={800}
            onOk={() => {
                
                form
                .validateFields()
                .then((values) => {
                    if(!selectedEmployee.empNo){
                       alert('Please select an employee');
                       return;
                    }
                    form.resetFields();
                    onCreate(selectedEmployee);
                })
                .catch((info) => {
                    console.log('Validate Failed:', info);
                });
                }
            }
         >
            
               
            <Form
                form={form}
                layout="vertical"
                name="form_in_modal"
                initialValues={{
                modifier: 'public',
                }}
             >
             
              <Form.Item
                    name="keyword"
                    label="Keyword"
                    rules={[
                        {
                          required: true,
                          message: 'Please input keyword of an employee!',
                        },
                    ]}
                    >
                     {/* <Input placeholder="employee No, name, email"  suffix={ <Button type="link" onClick={handleSearch}><SearchOutlined /></Button>} /> */}
                     <Input.Search placeholder="employee No, name, email" onSearch={handleSearch}  style={{width: 500,}} enterButton />  
                </Form.Item>
            </Form> 
        
          
          {
             isLoading && (
                 <Spin  
                    size="large" fullscreen
               />   
             )
          }
          {
              searchResult.length == 0 &&
              (
                <Table columns={columns} bordered>

                </Table>
              )
         
          }
          {
              searchResult.length> 0 && (
                <Table columns={columns} dataSource={searchResult}  style={{borderColor: 'red'}}  rowKey={(record) => record.empNo}  rowSelection={{
                    type: 'radio',
                    ...rowSelection,
                  }} bordered>

                </Table>
              )
          }        

       </Modal>
    );
}