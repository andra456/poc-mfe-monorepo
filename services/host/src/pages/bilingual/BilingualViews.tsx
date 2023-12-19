import React from 'react';
import { useTranslation } from 'react-multi-lang';
import { useLang } from '../../libs/strorageDb/query';
import { Row, Col, Card, Typography, Button, Divider, Input, Form } from 'antd';

import Multilang from 'remote/multilang';
import NextMultilang from 'next/nextjs-multilang';
import { setCookie } from '../../libs/hooks/useCookies';

function Bilingual() {
  const { trans } = useLang();
  const t = useTranslation();
  const { Title, Paragraph } = Typography;
  const [form] = Form.useForm();

  const submit = (e: any) => {
    console.log(e);
    const { token } = e;

    if (token) {
      setCookie('token', token, 1);
    }
  };

  return (
    <>
      <Row gutter={[24, 0]}>
        <Col span={24} md={12} className="mb-24">
          <Card className="header-solid h-full">
            <Title level={5}>Application HOST</Title>
            <Paragraph className="lastweek">
              Running port at <span className="bnb2">3004</span>
              <p> This page will be integrated with sf7 dev for connect multilang api</p>
              <Form onFinish={submit} name="token" layout="vertical" style={{ width: '100%' }} autoComplete="off" form={form}>
                <Form.Item name="token" required>
                  <Input placeholder="Enter token sf7 for test multilang" />
                </Form.Item>
                <Button block type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form>
              <Divider orientation="left" plain>
                Result
              </Divider>
              <p>
                sample text translate useTrans DB: {trans('Browse')}
                <br />
                sample text translate useMulilang : {t('Browse')}
              </p>
            </Paragraph>
          </Card>
        </Col>
        <Col span={24} md={12} className="mb-24">
          <Multilang t={t} />
        </Col>
        <Col span={24} md={12} className="mb-24">
          <NextMultilang t={t} />
        </Col>
      </Row>
    </>
  );
}

export default Bilingual;
