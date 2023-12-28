import React, { useState, useEffect } from 'react';
import { Row, Col, ColorPicker, Badge, Dropdown, Button, Avatar, Input, Drawer, Select, notification } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

import styled from 'styled-components';
import avtar from '../../assets/images/team-2.jpg';
import { useAppContext } from '../../appContext';
import { getCookie, setCookie } from '../../libs/hooks/useCookies';
import { useLang, fetchAPI, isAnyField } from '../../libs/strorageDb/query';
import useSetTranslation from '../../libs/strorageDb/i18n';

const Logo = styled.div`
  aspect-ratio: 6/1;
  max-height: 20px;
  img {
    max-height: 29px;
  }
`;

const bell = [
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" key={0}>
    <path
      d="M10 2C6.68632 2 4.00003 4.68629 4.00003 8V11.5858L3.29292 12.2929C3.00692 12.5789 2.92137 13.009 3.07615 13.3827C3.23093 13.7564 3.59557 14 4.00003 14H16C16.4045 14 16.7691 13.7564 16.9239 13.3827C17.0787 13.009 16.9931 12.5789 16.7071 12.2929L16 11.5858V8C16 4.68629 13.3137 2 10 2Z"
      fill="#111827"
    ></path>
    <path d="M10 18C8.34315 18 7 16.6569 7 15H13C13 16.6569 11.6569 18 10 18Z" fill="#111827"></path>
  </svg>,
];

const clockicon = [
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" key={0}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18ZM11 6C11 5.44772 10.5523 5 10 5C9.44772 5 9 5.44772 9 6V10C9 10.2652 9.10536 10.5196 9.29289 10.7071L12.1213 13.5355C12.5118 13.9261 13.145 13.9261 13.5355 13.5355C13.9261 13.145 13.9261 12.5118 13.5355 12.1213L11 9.58579V6Z"
      fill="#111827"
    ></path>
  </svg>,
];

const logsetting = [
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" key={0}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M11.4892 3.17094C11.1102 1.60969 8.8898 1.60969 8.51078 3.17094C8.26594 4.17949 7.11045 4.65811 6.22416 4.11809C4.85218 3.28212 3.28212 4.85218 4.11809 6.22416C4.65811 7.11045 4.17949 8.26593 3.17094 8.51078C1.60969 8.8898 1.60969 11.1102 3.17094 11.4892C4.17949 11.7341 4.65811 12.8896 4.11809 13.7758C3.28212 15.1478 4.85218 16.7179 6.22417 15.8819C7.11045 15.3419 8.26594 15.8205 8.51078 16.8291C8.8898 18.3903 11.1102 18.3903 11.4892 16.8291C11.7341 15.8205 12.8896 15.3419 13.7758 15.8819C15.1478 16.7179 16.7179 15.1478 15.8819 13.7758C15.3419 12.8896 15.8205 11.7341 16.8291 11.4892C18.3903 11.1102 18.3903 8.8898 16.8291 8.51078C15.8205 8.26593 15.3419 7.11045 15.8819 6.22416C16.7179 4.85218 15.1478 3.28212 13.7758 4.11809C12.8896 4.65811 11.7341 4.17949 11.4892 3.17094ZM10 13C11.6569 13 13 11.6569 13 10C13 8.34315 11.6569 7 10 7C8.34315 7 7 8.34315 7 10C7 11.6569 8.34315 13 10 13Z"
      fill="#111827"
    ></path>
  </svg>,
];

const toggler = [
  <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" key={0}>
    <path d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"></path>
  </svg>,
];

function Header({ placement, name, subName, onPress, handleSidenavColor, handleSidenavType, handleFixedNavbar }) {
  const [visible, setVisible] = useState(false);

  const { trans } = useLang();

  const { setLanguage, setInitLang } = useSetTranslation();
  useEffect(() => window.scrollTo(0, 0));
  const { globalState, setState } = useAppContext();
  const showDrawer = () => setVisible(true);
  const hideDrawer = () => setVisible(false);
  const [api, contextHolder] = notification.useNotification();

  const openNotification = (placement, text) => {
    api.open({
      message: text,
      placement,
    });
  };

  const handleLang = async e => {
    setCookie('lang', e);
    const anx = await isAnyField(e);

    if (!anx) {
      console.log('huy');

      const api = await fetchAPI();
      console.log(api);
      if (api) {
        setInitLang();
        openNotification('topLeft', 'Initial set language');
      } else {
        openNotification('topLeft', 'Failed set language');
      }
    }
    setLanguage(e);
  };

  const menu = () => {
    console.log(globalState?.message);
    const data =
      globalState?.message?.map(e => {
        return {
          title: 'New  Reminder',
          description: (
            <>
              {clockicon} {e?.date} <p>{e?.text}</p>
            </>
          ),
          avatar: avtar,
        };
      }) ?? [];

    return (
      globalState?.message?.map((item, i) => {
        console.log(item);
        return {
          key: i,
          label: (
            <Row style={{ width: 200 }}>
              <Col style={{ marginRight: 10 }}>
                <Avatar>U</Avatar>
              </Col>
              <Col>
                <span>New Reminder</span>
                <p
                  style={{
                    margin: 0,
                    color: ' #807e7e',
                  }}
                >
                  {item.text}
                </p>
              </Col>
            </Row>
          ),
        };
      }) ?? []
    );
  };

  return (
    <div>
      <Row gutter={[24, 0]}>
        {contextHolder}
        <Col span={6} md={6}>
          <Logo>
            <img src="https://workplaze.dataon.com/2b44c8e47675367568998525c92e77ab.png" alt="logo" />
          </Logo>
        </Col>
        <Col span={18} md={18} className="header-control">
          <Button type="link" onClick={showDrawer}>
            {logsetting}
          </Button>
          <Badge size="small" count={globalState?.message?.length ?? 0}>
            <Button type="link">
              <Dropdown menu={{ items: menu() }} trigger={['click']}>
                <a href="#pablo" className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                  {bell}
                </a>
              </Dropdown>
            </Button>
          </Badge>
          <Button type="link" className="sidebar-toggler" onClick={() => onPress()}>
            {toggler}
          </Button>

          <Input
            className="header-search"
            onChange={e => setState({ keyword: e.target.value })}
            placeholder="Type here..."
            prefix={<SearchOutlined />}
          />
        </Col>
      </Row>
      <Drawer title="Setting" placement={placement} closable={false} onClose={hideDrawer} open={visible} key={placement}>
        <h4>Change Language {trans('Browse')}</h4>
        <Select
          defaultValue={getCookie('lang') ?? 'EN'}
          style={{ width: 120 }}
          onChange={handleLang}
          options={[
            { value: 'ID', label: '🇮🇩 Indonesia' },
            { value: 'EN', label: '🇬🇧 English' },
            { value: 'TH', label: '🇹🇭 Thailand' },
          ]}
        />

        <h4>Custom theme color</h4>
        <ColorPicker showText={color => <span>Primary Color ({color.toHexString()})</span>} />
        <ColorPicker showText={color => <span>Text Color ({color.toHexString()})</span>} />
        <ColorPicker showText={color => <span>Selected Color ({color.toHexString()})</span>} />
        <ColorPicker showText={color => <span>Background Color ({color.toHexString()})</span>} />
      </Drawer>
    </div>
  );
}

export default Header;
