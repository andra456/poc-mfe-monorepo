import { Row, Typography, Button, Input } from 'antd';

function EChart() {
  const { Title, Paragraph } = Typography;
  const { TextArea } = Input;
  return (
    <>
      <div className="chart-vistior">
        <Title level={5}>Aplication Remote React.js</Title>
        <p> This componet will send data to host using websocket</p>
        <Paragraph className="lastweek">
          running port at <span className="bnb2">8080</span>
        </Paragraph>
        <Paragraph className="lastweek">
          <TextArea rows={4} placeholder="maxLength is 6" maxLength={6} />
          <Button style={{ marginTop: '15px' }}> Send Notification</Button>
        </Paragraph>
      </div>
    </>
  );
}

export default EChart;
