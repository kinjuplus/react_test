//import  '../pages/Home.css';
import { Button, Form, Input, Select, AutoComplete, Upload, Spin } from 'antd';
import { Row, Col } from "antd";
import { HomeOutlined, AppstoreOutlined, ClearOutlined,InboxOutlined  } from '@ant-design/icons';
import { useState } from 'react';
import EmployeePicker from './EmployeePicker';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';


export default function EventForm({ applicationList, event}){
    console.log(event);
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modelNameOptions, setModelNameOptions] = useState([]);
    const [isSubmit, setIsSubmit] = useState(false);
    const [form] = Form.useForm();
    const testOptions= [
        'N133HCL-G41',
        'V750DK1-QS3',
        'M270KCA-E8B',
        'N173HCE-G32',
        'N133BGE-CAB',
        'N140HCE-DAA',
        'R315DCJ-K33',
        'X239AW8-138',
        'X239AW4-B0C',
        'HD101IA-05A',
        'ZC140ZZ-01A',
        'DD272BZ-03C',
        'ZP215BC-01C',
        'HK173VB-01B',
        'G215HGK-L02',
        'N156BGP-E41',
        'G121ICE-LM2',
        'V600YJ1-Q01',
        'X145AW1-B0C',
        'X122AW1-101',
        'N173FGE-D13',
        'V500DJ7-ME5',
        'N156BGA-EB2',
        'G058AA1-101',
        'G021AA1-106',
        'N116BGE-DA2',
        'M270HJJ-P0C',
        'N156HCA-DAB',
        'N173HCE-C31',
        'R236HFE-L31',
        'S380AJ1-A01',
        'S548HJ1-CE1',
        'R219AW3-10U',
        'M270KCJ-L3B',
        'G163AR2-A01',
        'M270KCJ-P02',
        'N160JCG-GT1',
        'X245AW3-A32',
        'V240BJ1-203',
        'G104ACE-LH1',
        'HH080BA-01A',
        'HG110IA-01A',
        'HD080IZ-01A',
        'HD101IA-03A',
        'HM108IA-01A',
        'PC063BA-01A',
        'DD272BZ-01C',
        'DD272BZ-01D',
        'S400HJ9-PE1',
        'N156HCL-GT1',
        'S850DJJ-D02',
        'X158AW1-A01',
        'B041AR1-101',
        'M215HNE-L30',
        'N161HCA-GA1',
        'PD047JC-01A',
        'PP048IA-01G',
        'ZJ090NA-03B',
        'EJ015NC-02G',
        'SJ018NA-16J',
        'PD050JA-01C',
        'PD060SC-05D',
        'PJ052IC-05A',
        'PG040IA-01L',
        'SP030MA-03E',
        'ZD050SA-025',
        'PP030NA-10C',
        'SP028NA-09L',
        'PC032PA-01H',
        'PP045SC-05H',
        'PE052IC-01H',
        'PC055IA-02X',
        'PP050SA-01C',
        'PP045IC-01P',
        'PE050SC-03E',
        'ZG070NA-03R',
        'ZP009ZZ-04A',
        'DJ070IA-16A',
        'PP050IC-13A',
        'PW045SC-05G',
        'DJ065IC-01P',
        'PA055IC-10K',
        'PD050SA-14U',
        'PE050IA-14F',
        'DD102ZA-02A',
        'PD055SA-03K',
        'DJ065NC-01V',
        'B027AR1-101',
        'G021AA2-103',
        'N140HGE-CAA',
        'N140ACA-GT1',
        'X086AW2-10Z',
        'V700DJ1-Q01',
        'X239AW1-A5C',
        'X172AW2-10F',
        'X114AW6-ASC',
        'N133HSE-EA3',
        'X214AW1-A1C',
        'X174AW1-101',
        'G080AA1-103'
    ];
    const formLayout = 'vertical';
    const formItemLayout = {
        labelCol: {
         span : 6
        },
        wrapperCol: {
          span: 14
        },
    };

    const { t, i18n } = useTranslation();

    function onCreate (employee) {
        console.log('Received selected employee: ', employee);
        setIsModalOpen(false);
        form.setFieldValue('pmEmpNo', employee.empNo);
        form.setFieldValue('pm', employee.name);
    }
    
    function onSearch(searchText){
        let result = (!searchText || searchText === '' )? [] : testOptions.filter((option) => option.toLowerCase().indexOf(searchText.toLowerCase()) !== -1).map((option) => { return {label: option, value: option}});
        setModelNameOptions(result);
    }

    function onSelect (data){
        console.log('onSelect', data);
    }

    function normFile(e){
      console.log('Upload event:', e);
      if (Array.isArray(e)) {
        return e;
      }
      return e?.fileList;
    };

    function handleSubmit(e) {
        e.preventDefault();
        
        form
        .validateFields()
        .then((values) => {
          console.log(typeof values);  
          console.log('Received values of form: ', values);
          setIsSubmit(true);
          const formData = new FormData();
          Object.keys(values).forEach((key) =>{ 
            if(values[key] && key !== 'files'){
               formData.append(key, values[key]) 
            }
          } );
          let files = form.getFieldValue('files');
          formData.delete('files');
          if(files && files.length){
             for(let file of files.values()){
               formData.append('files', file.originFileObj);
             }
          }
          
          axios.post('http://localhost:8083/rest/webService/hr/restpost', formData).then((response) => {
            setIsSubmit(false);
             if(response.data.errorCode === '00'){
                navigate('/events');
             }else{
                alert('error');
             }
          }).catch((error) => {
             console.log(error);
          })
            
        })
        .catch((info) => {
            console.log('Validate Failed:', info);
        });
    }

    return (
        <>
        <Spin spinning={isSubmit}  tip="loading" fullscreen size="large">
                <div className="spinner-content" />
        </Spin>  
        <Form
        form={form}

        {...formItemLayout}
          initialValues={{
           layout: formLayout,
           id: event?.id,
           pmEmpNo: event?.pm.empNo,
           application: event?.application,
           pm: event?.pm.name,
           eventDate: event?.eventDate,
           modelName: event?.modelName,
           projectCode: event?.projectCode,
           projectClassification: event?.projectClassification,
           size: event?.size,
           description: event?.description,
        }}
           layout={formLayout}
        >
          <Form.Item name="id" hidden> 
                <Input type='hidden'  />
          </Form.Item>
          <Row>
             <Col span={12}>  
                 <Form.Item label={t('application')} name="application" 
                  rules={[
                    {
                      required: true,
                      message: 'Please select an application!',
                    },
                 ]}>
                  <Select>
                       <Select.Option value=""></Select.Option>
                        {
                           applicationList.map((app) => <Select.Option key={app} value={app}>{app}</Select.Option>) 
                        } 
                  </Select>
                </Form.Item>
            </Col>
            
            <Col span={12}>     
                <Form.Item label="PM" name="pm"
                rules={[
                  {
                    required: true,
                    message: 'Please select an PM!',
                  },
               ]}
                >
                <Input.Search  placeholder="PM" onSearch={()=>{ setIsModalOpen(true)}} enterButton/>   
                </Form.Item>
                <Form.Item name="pmEmpNo" hidden> 
                    <Input type='hidden' />
                 </Form.Item>
            </Col>    
          </Row>
          <Row>
            <Col span={12}>     
                <Form.Item label={t('eventDate')} name="eventDate"
                  rules={[
                    {
                      required: true,
                      message: 'Please input a date!',
                    },
                 ]}
                
                >
                    <Input  type="date" />   
                </Form.Item>
            </Col>
            <Col span={12}>     
                <Form.Item label="Model Name" name="modelName"
                 rules={[
                  {
                    required: true,
                    message: 'Please enter a model name!',
                  },
               ]}
                >
                     <AutoComplete options={modelNameOptions}  onSelect={onSelect}
                         onSearch={onSearch}/>
                </Form.Item>
            </Col>    
          </Row>
          <Row>
             <Col span={12}>     
             <Form.Item label="Meeting Notes" name="meetingNotes">
                <Form.Item name="files" valuePropName="fileList" getValueFromEvent={normFile} noStyle rules={[
                  {
                    required: true,
                    message: 'Please upload a file!',
                  },
               ]}>
                <Upload.Dragger name="files" customRequest={({ onSuccess }) => onSuccess("ok")}>
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                  </p>
                  <p className="ant-upload-text">Click or drag file to this area to upload</p>
                  <p className="ant-upload-hint">Support for a single or bulk upload.</p>
                </Upload.Dragger>
              </Form.Item>
            </Form.Item>
             </Col>
             <Col span={12}>     
                 <Form.Item label="Project Code" name="projectCode"
                   rules={[
                    {
                      required: true,
                      message: 'Please enter a project code!',
                    },
                 ]}
                 >
                     <Input  type="text" />
                 </Form.Item>
             </Col>    
           </Row>
           <Row>
             <Col span={12}>     
                 <Form.Item label="Project Classification" name="projectClassification"
                    rules={[
                      {
                        required: true,
                        message: 'Please choose a project classification!',
                      },
                   ]}
                 
                 >
                 <Select>
                       <Select.Option value=""></Select.Option>
                       <Select.Option value="A">A</Select.Option> 
                       <Select.Option value="B">B</Select.Option> 
                       <Select.Option value="C">C</Select.Option> 
                  </Select>
                 </Form.Item>
             </Col>
             <Col span={12}>     
                 <Form.Item label="Size" name="size"
                 rules={[
                  {
                    required: true,
                    pattern: /^[0-9]+$/,
                    message: 'Please enter a valid size in number only!',
                  },
               ]}
                 >
                     <Input  type="text" />
                 </Form.Item>
             </Col>    
           </Row>
           <Row>
              <Col span={12}>  
              <Form.Item label="Description" name="description"
                    rules={[
                      {
                        required: true,
                        message: 'Please enter a description!',
                      },
                   ]}
                 >
                  <Input.TextArea  rows={4}  cols={40}/>

                 </Form.Item>   
              
               </Col>
            </Row>

        
              <Button type="primary" onClick={handleSubmit} htmlType="submit" style={{float: 'left'}}>Submit</Button>
        
          </Form>
          <EmployeePicker
             open={isModalOpen}
             onCreate={onCreate}
             onCancel={() => {
                setIsModalOpen(false);
           }}
          />
        </>

    );
}

export  async function applicationLoader(){
    const response = await fetch('http://localhost:8083/rest/webService/plmApplication');
    if (!response.ok) {
      throw json(
        { message: 'Could not fetch events.' },
        {
          status: 500,
        }
      );
    } else {
      const resData = await response.json();
      return resData;
    }
}
