import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Card, Button, Flex } from 'antd';

function RoutingViews() {
  return (
    <>
      <Card>
        <h3> Routing MFE</h3>
        <p> This POC using routing as custom route ( for custom page ) also standard route for standard feature</p>
        <Row gutter={[24, 2]}>
          <Col xs={24} sm={12} className="mb-24">
            <Card className="criclebox h-full">
              <h4>Example routing page custom React.JS</h4>
              <Flex wrap="wrap" gap="small">
                <Link to="/editor">
                  <Button type="primary" danger>
                    Editor (customs)
                  </Button>
                </Link>
                <Link to="/preview">
                  <Button type="primary">Preview (custom)</Button>
                </Link>
              </Flex>
            </Card>
          </Col>
          <Col xs={24} sm={12} className="mb-24">
            <Card className="criclebox h-full">
              <h4>Example routing page remote page Next. JS</h4>
              <Flex wrap="wrap" gap="small">
                <Link to="/p/auth">
                  <Button type="primary" danger>
                    auth (customs)
                  </Button>
                </Link>
                <Link to="/p/preview">
                  <Button type="primary">Preview (custom)</Button>
                </Link>
              </Flex>
            </Card>
          </Col>
        </Row>
      </Card>
    </>
  );
}

const config = {
  path: '/routes',
  isLayout: true,
  keyIndex: 'routing',
  element: <RoutingViews />,
};

export default config;
