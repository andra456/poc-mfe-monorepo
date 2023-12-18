import React, { useState } from 'react';

import { Card, Col, Row } from 'antd';

// import Bridge from 'remote/bridge';

import { useAppContext } from '../../appContext';
import Bridge from 'remote/bridge';

// import NextComponent from '../components/chart/remote-react';
import NextRemote from 'next/nextjs-remote-component';
// import LineChart from '../components/chart/NextComponent';

function Home() {
  const { setState, globalState } = useAppContext();

  const handleMessage = e => {
    const { text = {} } = e;
    const latest = globalState?.message ?? [];
    console.log(latest);
    const lit = { message: [...latest, { text, date: new Date() }] };
    setState({ ...lit });
  };
  return (
    <>
      <div className="layout-content">
        <Row gutter={[24, 0]}>
          <Col xs={24} sm={24} md={12} lg={12} xl={10} className="mb-24">
            <Card bordered={false} className="criclebox h-full">
              <Bridge updateContainer={handleMessage} valueContainer={globalState} />
            </Card>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={14} className="mb-24">
            <Card bordered={false} className="criclebox h-full">
              <NextRemote updateContainer={handleMessage} valueContainer={globalState} />
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Home;
