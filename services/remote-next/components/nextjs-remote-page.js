import React from 'react';
import { Row, Typography, Button, Input, Form, notification, Card } from 'antd';
import axios from 'axios';

const Bridge = ({ updateContainer, valueContainer }) => {
  const { Title, Paragraph } = Typography;
  const { TextArea } = Input;
  const [pokemon, setPokemon] = React.useState([]);

  React.useEffect(() => {
    console.log(valueContainer);
    handleChangeKeyword();
    return () => {};
  }, [valueContainer]);

  const { Meta } = Card;
  const [form] = Form.useForm();
  const submit = e => {
    updateContainer({ ...e });
    form.resetFields();
    openNotification();
  };

  const fetchPokemon = name => {
    const detailPokemonList = axios
      .get(`https://ex.traction.one/pokedex/pokemon/${name}`)
      .then(e => e.data)
      .catch(() => []);

    return detailPokemonList;
  };
  const handleChangeKeyword = async () => {
    const key = valueContainer?.keyword ?? '';
    try {
      if (key.length > 3) {
        const data = await fetchPokemon(key);
        console.log(data);
        if (data && data.length > 0) {
          setPokemon(data);
        }
      } else {
        setPokemon([]);
      }
    } catch {
      setPokemon({});
      console.log('err');
    }
  };

  const openNotification = () => {
    notification.open({
      message: 'Notification',
      description: 'Your message already succses send',
      onClick: () => {
        console.log('Notification Clicked!');
      },
    });
  };
  return (
    <div>
      <>
        <div className="chart-vistior">
          <Title style={{ width: '100%' }} level={5}>
            Aplication Remote Next.JS
          </Title>
          <p> This componet will send data to host using context</p>
          <Paragraph className="lastweek">
            running port at <span className="bnb2">8081</span>
          </Paragraph>
          <Paragraph className="lastweek">
            <Form
              form={form}
              onFinish={submit}
              name="validateOnly"
              layout="vertical"
              style={{ width: '100%' }}
              autoComplete="off"
            >
              <Form.Item name="text" label="Message" rules={[{ required: true }]}>
                <TextArea rows={4} placeholder="maxLength is 16" maxLength={16} />
              </Form.Item>

              <Button htmlType="submit" style={{ marginTop: '15px' }}>
                Send Notification
              </Button>
            </Form>
          </Paragraph>
          <Row>
            <Title style={{ width: '100%' }} level={5}>
              As a sample will send data as global state
            </Title>
            <p style={{ width: '100%' }}> This component will show data from host </p>
            <p style={{ width: '100%' }}> Query dari host : {valueContainer?.keyword ?? ''}</p>
            <p style={{ width: '100%' }}> Result Query from api in host :</p>
            <div style={{ width: '100%' }}>
              {' '}
              {pokemon?.map((e, i) => (
                <Card key={i} hoverable style={{ width: 240 }} cover={<img alt="example" src={e.sprite} />}>
                  <Meta title={e.name} description={e.species} />
                </Card>
              ))}
            </div>
          </Row>
        </div>
      </>
    </div>
  );
};

export default Bridge;
