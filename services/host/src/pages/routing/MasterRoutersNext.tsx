import React, { useState } from 'react';
import { Card, Col, Row, Menu } from 'antd';

import NextRemote from 'next/dinamic-next';

import { NavLink, redirect } from 'react-router-dom';
import { getCookie } from '../../libs/hooks/useCookies';

function RoutingMasterView() {
  const [current, setCurrent] = useState(getCookie('custom'));

  const path = window.location.pathname;
  const params = path.split('/');
  const indexPath = params[2] ?? '';

  const onClick = e => {
    console.log('click ', e);
  };

  const items = [
    {
      label: <NavLink to={'/p/auth'}>Auth (custom next js)</NavLink>,
      key: 'auth',
    },
    {
      label: <NavLink to={'/p/preview'}>Preview (custom next js )</NavLink>,
      key: 'preview',
    },
  ];
  return (
    <>
      <div className="layout-content">
        <Row gutter={[24, 0]}>
          <Col xs={24} sm={24} className="mb-24">
            <Card className="criclebox h-full">
              <h1> Next JS Routing</h1>
              <Row>
                <Col xs={20}>
                  <Menu onClick={onClick} mode="horizontal" items={items} style={{ marginBottom: '20px' }} />
                </Col>
              </Row>
            </Card>
          </Col>

          <Col xs={24} sm={24} className="mb-24">
            <Card className="criclebox h-full">
              <NextRemote
                value={'value'}
                pathname={indexPath}
                client={current}
                handleRedirect={() => redirect('/hahahahahaha')}
              />
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default RoutingMasterView;
