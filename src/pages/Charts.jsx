import { Col, Row } from 'antd';
import { Line } from "@ant-design/charts";
import { Pie, Bar, Area } from '@ant-design/plots';
export default function ChartsPage() {
    const data = [
        {
          year: '1991',
          value: 3,
        },
        {
          year: '1992',
          value: 4,
        },
        {
          year: '1993',
          value: 3.5,
        },
        {
          year: '1994',
          value: 5,
        },
        {
          year: '1995',
          value: 4.9,
        },
        {
          year: '1996',
          value: 6,
        },
        {
          year: '1997',
          value: 7,
        },
        {
          year: '1998',
          value: 9,
        },
        {
          year: '1999',
          value: 13,
        },
      ];
      const config = {
        data: {
          type: 'fetch',
          value: 'https://gw.alipayobjects.com/os/bmw-prod/55424a73-7cb8-4f79-b60d-3ab627ac5698.json',
        },
        xField: (d) => new Date(d.year),
        yField: 'value',
        sizeField: 'value',
        shapeField: 'trail',
        legend: { size: false },
        colorField: 'category',

      };

      const pieConfig = {
        data: [
          { type: 'MNT', value: 27 },
          { type: 'NB', value: 25 },
          { type: 'AA_JK', value: 18 },
          { type: 'TV', value: 15 },
          { type: 'AA_BD4', value: 10 },
          { type: 'MEDICAL', value: 5 },
        ],
        angleField: 'value',
        colorField: 'type',
        paddingRight: 80,
        label: {
          text: 'value',
          position: 'outside',
        },
        legend: {
          color: {
            title: false,
            position: 'right',
            rowPadding: 5,
          },
        },
      };

      const barConfig = {
        data: {
          type: 'fetch',
          value: 'https://render.alipay.com/p/yuyan/180020010001215413/antd-charts/bar-bar.json',
        },
        xField: 'letter',
        yField: 'frequency',
        sort: {
          reverse: true,
        },
        label: {
          text: 'frequency',
          formatter: '.1%',
          style: {
            textAnchor: (d) => (+d.frequency > 0.008 ? 'right' : 'start'),
            fill: (d) => (+d.frequency > 0.008 ? '#fff' : '#000'),
            dx: (d) => (+d.frequency > 0.008 ? -5 : 5),
          },
        },
        axis: {
          y: {
            labelFormatter: '.0%',
          },
        },
      };

      const areaConfig = {
        data: {
          type: 'fetch',
          value: 'https://assets.antv.antgroup.com/g2/unemployment-by-industry.json',
        },
        xField: (d) => new Date(d.date),
        yField: 'unemployed',
        colorField: 'industry',
        shapeField: 'smooth',
        stack: true, // Try to remove this line.
      };
    
      
    
    return (
        <>
          
          <Row>
            <Col span={12}>
                <p style={{textAlign: 'center', fontSize: '20px', fontStyle: 'italic', color: 'Black'}}>Line Chart</p>
                <Line {...config} />
            </Col>
            <Col span={12}>
            <p style={{textAlign: 'center', fontSize: '20px', fontStyle: 'italic', color: 'Black'}}>Pie Chart</p>
                <Pie {...pieConfig} />
            </Col>
          </Row>
          <Row>
             <Col span={12}>
                <p style={{textAlign: 'center', fontSize: '20px', fontStyle: 'italic', color: 'Black'}}>Bar Chart</p>
                <Bar {...barConfig} />
            </Col>
            <Col span={12}>
                <p style={{textAlign: 'center', fontSize: '20px', fontStyle: 'italic', color: 'Black'}}>Area Chart</p>
                <Area {...areaConfig} />
            </Col>
          </Row> 
           
        </>
    );
}