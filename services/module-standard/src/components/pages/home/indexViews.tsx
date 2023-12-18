import React, { useEffect } from 'react';
import { EllipsisOutlined } from '@ant-design/icons';
import { Avatar, Badge, Card, Segmented, Row, Col, Button } from 'antd';
import { useAppContext } from '@/libs/context/appContext';
import useSocket from '@/libs/hooks/useSocket';

const { Meta } = Card;

const CardProfile: React.FC = () => (
  <Card
    className="w-full"
    actions={[
      <Badge key="ini" status="success" text="8:30" />,
      <Badge key="ini" status="success" text="--:---" />,
      <EllipsisOutlined key="ellipsis" />,
    ]}
  >
    <Meta
      avatar={
        <Avatar
          style={{ marginTop: '-10px', border: 'solid 6px #fff', boxShadow: '0px 1px 10px rgba(0,0,0,.13)' }}
          size={{ xs: 24, sm: 32, md: 40, lg: 50, xl: 70 }}
          src="https://cliimg-sf7doffice.dataon.com/cli7img/photo/indodevniaga/202308/401C2042416F0C7FEAAE260E34746FEDD6B370C6_avatar.png"
        />
      }
      title={
        <>
          <h2 style={{ fontSize: '18px' }}>Ahmad Ruslan Kurniawan</h2>
          <p style={{ fontWeight: '300' }}>Frontend Engineer</p>
        </>
      }
    />
  </Card>
);

const Balance: React.FC = () => {
  const { setState, globalState } = useAppContext();
  return (
    <Card type="inner" title="My Balance" extra={<a href="#">More</a>}>
      <p>
        <b>Latest Search History</b>
      </p>
      <p>text :{globalState?.search}</p>
      <br />
      <h4> mutilang key</h4>
      <p> title</p>

      <p> about</p>
    </Card>
  );
};

const LogActivity: React.FC = () => <Card title="My Calendar"></Card>;

const Reminder: React.FC = () => {
  const { setState, globalState } = useAppContext();
  const [value, setValue] = React.useState<string | number>('Map');

  return (
    <Card
      title={<Segmented options={['Feed', 'Reminder', 'Notification']} value={value} onChange={setValue} />}
      extra={<a href="#">More</a>}
    >
      <p>Data Change at local {globalState.reminder}</p>

      <br />
      <Button onClick={() => setState({ reminder: globalState.reminder + 1 })}> Add Reminders</Button>
    </Card>
  );
};

const ViewsHome: React.FC = () => {
  const [value, setValue] = React.useState<string | number>('Map');
  const roomId = '666';
  // const { messages, sendMessage, setConnect, socket } = useSocket(roomId);
  const { setState, globalState } = useAppContext();
  const [latestUpdate, setlatestUpdate] = React.useState<any>({});

  useEffect(() => {
    const minify = JSON.stringify(latestUpdate);
    const minifyState = JSON.stringify(globalState);

    if (minify !== minifyState) {
      console.log('update state from inner Remote');
      // sendMessage(globalState);
    } else {
      console.log('update state from socket host', globalState);
    }
  }, [globalState]);
  /*
  useEffect(() => {
   
    console.log('Event Message Remote', messages);
    if (messages && messages.senderId === 'host') {
      const updates = { ...globalState, ...messages.body };
      const minify = JSON.stringify(updates);
      const minifyState = JSON.stringify(globalState);
      if (minify !== minifyState) {
        console.log('event masuk state from hose');
        setState(updates);
        setlatestUpdate(updates);
      } else {
        console.log('message sama', messages);
      }
    }
   
  }, [messages]);
   */

  useEffect(() => {
    // setConnect(true);

    return () => {
      // setConnect(false);
    };
  }, []);
  return (
    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
      <Col span={8} className="flex flex-col gap-4">
        <CardProfile />
        <Balance />
      </Col>
      <Col span={8}>
        <Reminder />
      </Col>
      <Col span={8}>
        <LogActivity />
      </Col>
    </Row>
  );
};

export default ViewsHome;
