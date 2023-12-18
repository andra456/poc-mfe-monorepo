import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Layout, Button, Row, Col, Typography, Form, Input, Switch, Card, Select } from 'antd';
import { getCookie, setCookie } from '../../libs/hooks/useCookies';
import axios from 'axios';

function onChange(checked) {
  console.log(`switch to ${checked}`);
}
const { Title } = Typography;
const { Header, Footer, Content } = Layout;

export default function Auth() {
  const [current, setCurrent] = useState(getCookie('custom'));

  const onChange = (value: any) => {
    console.log(`selected ${value}`);
    setCookie('custom', value, 1);
    setCurrent(value);
  };

  const onSearch = (value: string) => {
    console.log('search:', value);
  };

  const onFinish = values => {
    console.log('Success:', values);
    window.location.href = '/dashboard';
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };
  return (
    <>
      <Layout className="layout-default layout-signin">
        <Header>
          <div className="header-col header-brand">
            <h5>POC MFE Sunfish (Standard)</h5>
          </div>
          <div className="header-col header-nav"></div>
        </Header>
        <Content className="signin">
          <Row gutter={[24, 0]} justify="space-around">
            <Col xs={{ span: 24 }} lg={{ span: 10 }} md={{ span: 12 }}>
              <Card>
                <Title level={3} className="mb-15">
                  Sign In
                </Title>
                <p>Enter your email and password to sign in</p>
                <Form onFinish={onFinish} onFinishFailed={onFinishFailed} layout="vertical" className="row-col">
                  <Form.Item
                    className="username"
                    name="email"
                    rules={[
                      {
                        required: true,
                        message: 'Please input your email!',
                      },
                    ]}
                  >
                    <Input placeholder="Email" />
                  </Form.Item>

                  <Form.Item
                    className="username"
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: 'Please input your password!',
                      },
                    ]}
                  >
                    <Input.Password placeholder="Password" />
                  </Form.Item>
                  <Form.Item>
                    <Select
                      showSearch
                      placeholder="Select a Client"
                      optionFilterProp="children"
                      defaultValue={current}
                      onChange={onChange}
                      onSearch={onSearch}
                      options={[
                        {
                          value: 'airasia',
                          label: 'Air Asia',
                        },
                        {
                          value: 'samsung',
                          label: 'Samsung',
                        },
                        {
                          value: 'garuda',
                          label: 'Garuda Air',
                        },
                      ]}
                    />
                  </Form.Item>

                  <Form.Item name="remember" className="aligin-center" valuePropName="checked">
                    <Switch defaultChecked onChange={onChange} />
                    Remember me
                  </Form.Item>

                  <Form.Item>
                    <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                      SIGN IN
                    </Button>
                  </Form.Item>
                  <p className="font-semibold text-muted">
                    Don't have an account?{' '}
                    <Link to="/sign-up" className="text-dark font-bold">
                      Sign Up
                    </Link>
                  </p>
                </Form>
              </Card>
            </Col>
            <Col className="sign-img" style={{ padding: 12 }} xs={{ span: 24 }} lg={{ span: 12 }} md={{ span: 12 }}></Col>
          </Row>
        </Content>
      </Layout>
    </>
  );
}
