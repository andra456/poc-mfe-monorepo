import React, { useEffect } from 'react';
import { Row, Typography, Button, Input, Divider, Card } from 'antd';
import useSetTranslation from 'host/langProvider';

const BridgeMultiLang = ({ t }) => {
  const { Title, Paragraph } = Typography;
  const { useTranslation, setInitLang, arrLang, defaultLang } = useSetTranslation();
  // const t = useTranslation();

  useEffect(() => {
    console.log(arrLang, defaultLang, 'kakakak');
    return () => {};
  }, [arrLang, defaultLang]);

  useEffect(() => {
    setInitLang();
  }, []);

  return (
    <Card className="header-solid h-full">
      {console.log('hahahahah', t)}
      <Title level={5}>Application Remote React JS</Title>
      <Paragraph className="lastweek">
        Running port at <span className="bnb2">3004</span>
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
