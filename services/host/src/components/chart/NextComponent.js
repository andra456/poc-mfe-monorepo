import { Typography, Row, Button, Input } from 'antd';

import { useTranslation } from 'react-multi-lang';
import { useLang } from '../../libs/strorageDb/query';
import React from 'react';

const { TextArea } = Input;

function LineChart() {
  const { Title, Paragraph } = Typography;
  const { trans } = useLang();

  const t = useTranslation();
  console.log(t);
  return (
    <>
      <div className="linechart">
        <div>
          <Title level={5}>Application Remote Next.JS</Title>
          <Paragraph className="lastweek">
            Running port at <span className="bnb2">8084</span>
            <p>sample text translate useTrans DB: {trans('Browse')}</p>
            <p>sample text translate useMulilang : {t('Browse')}</p>
          </Paragraph>
          <Paragraph className="lastweek">
            <TextArea rows={4} placeholder="maxLength is 6" maxLength={6} />
            <Button style={{ marginTop: '15px' }}> Send Notification</Button>
          </Paragraph>
          <Row>
            <Title level={5}> As a sample will send data as global state</Title>
            <p> This componet will send data to host using websocket</p>
          </Row>
        </div>
      </div>
    </>
  );
}

export default LineChart;
