import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Layout, Button, Row, Col, Typography, Form, Input, Switch, Card } from 'antd';

interface IFeature {
    title?: string;
}
interface IState {
    arg: null | string;
}
const { Title } = Typography;
const { Header, Content } = Layout;

export function FeatuesOne({ title = '' }: IFeature): JSX.Element {
    const initState = {
        arg: null,
    };
    // always define initial state
    const [first, setFirst] = useState<IState>(initState);

    useEffect(() => {
        setFirst({ arg: 'Running state' });

        return () => {
            setFirst(initState);
        };
    }, []);

    const onFinish = (values) => {
        console.log('Success:', values);
        window.location.href = '/dashboard';
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const onChange = (e) => {
        console.log(e);
    };

    return (
        <>
            <Layout className="layout-default layout-signin">
                <Header>
                    <div className="header-col header-brand">
                        <h5>POC MFE Sunfish (custom air asia)</h5>
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

                                <Form
                                    onFinish={onFinish}
                                    onFinishFailed={onFinishFailed}
                                    layout="vertical"
                                    className="row-col"
                                >
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
                                        <Input placeholder="Password" />
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
                                        Don&apos;t have an account?{' '}
                                        <Link to="/sign-up" className="text-dark font-bold">
                                            Sign Up
                                        </Link>
                                        <br />
                                        <Link to="/preview" relative="path">
                                            Preview
                                        </Link>
                                    </p>
                                </Form>
                            </Card>
                        </Col>
                        <Col
                            className="sign-img"
                            style={{ padding: 12 }}
                            xs={{ span: 24 }}
                            lg={{ span: 12 }}
                            md={{ span: 12 }}
                        ></Col>
                    </Row>
                </Content>
            </Layout>
        </>
    );
}

export default React.memo(FeatuesOne);
