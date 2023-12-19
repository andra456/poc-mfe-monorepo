import React, { useEffect } from 'react';
import { Row, Typography, Button, Input, Divider, Card } from 'antd';

const BridgeMultiLang = ({ t }) => {
  const { Title, Paragraph } = Typography;

  return (
    <Card className="header-solid h-full">
      {console.log('hahahahah', t)}
      <Title level={5}>Application Remote Next JS</Title>
      <Paragraph className="lastweek">
        Running port at <span className="bnb2">8081</span>
        <p> This page will be integrated with sf7 dev for connect multilang api</p>
        <Divider orientation="left" plain>
          Result
        </Divider>
        <p>
          <br />
          sample text translate useMulilang : {t('Browse')}
        </p>
      </Paragraph>
    </Card>
  );
};

export default BridgeMultiLang;
