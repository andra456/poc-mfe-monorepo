import React, { useState, useEffect } from 'react';
import { Layout, Drawer, Affix } from 'antd';
import Sidenav from './Sidenav';
import Header from './Header';

import { Route, Routes, useLocation } from 'react-router-dom';
import axios from 'axios';
import { getCookie } from '../../libs/hooks/useCookies';
// page
import RoutingFeature from '../../pages/routing';
import Bilingual from '../../pages/bilingual';
import Auth from '../../pages/auth';
import Dashboard from '../../pages/dashboard';
import NotFound from '../../pages/empty';
import RouteMasterNext from '../../pages/routing/MasterRoutersNext';

// extension
import loadable from '@loadable/component';
import Loader from '../../components/common/loader';

const { Header: AntHeader, Content, Sider } = Layout;
interface IPropsCustom {
  name: string;
  isAuth: boolean;
  isLayout: boolean;
  icon: null | any;
}

function Main() {
  const [visible, setVisible] = useState(false);
  const [isLayout, setIsLayout] = useState(false);
  const [sidenavColor, setSidenavColor] = useState('#1890ff');
  const [sidenavType, setSidenavType] = useState('transparent');
  const [fixed, setFixed] = useState(true);

  // state route
  const [isCustom, setIsCustom] = useState(false);
  const [loading, setLoading] = useState(true);
  const [current] = useState(getCookie('custom'));
  const location = useLocation();
  const [remoteConfig, setRemoteConfig] = useState<IPropsCustom | null>(null);

  const openDrawer = () => setVisible(!visible);
  const handleSidenavType = type => setSidenavType(type);
  const handleSidenavColor = color => setSidenavColor(color);
  const handleFixedNavbar = type => setFixed(type);

  const path = window.location.pathname;
  const params = path.split('/');

  let { pathname } = useLocation();
  pathname = pathname.replace('/', '');
  const barWidth = 270;

  const standardRoutes = [RoutingFeature, Bilingual, Auth, Dashboard];

  const FrameRoutes = ({ children, config }) => {
    useEffect(() => {
      setIsLayout(config.isLayout);
    }, []);

    return <div>{children}</div>;
  };

  const DynamicAsyncPage = loadable(() => import(`customize/routes`), {
    cacheKey: props => props.page,
    ssr: false,
    fallback: <Loader />,
  });

  const onHandleConfig = config => {
    if (config) {
      setIsLayout(config.isLayout);
      setRemoteConfig(config);
    }
    console.log(config);
  };

  const getAnyCostome = async () => {
    setLoading(true);
    const indexPath = params[1];
    const client = getCookie('custom') ?? 'airasia';
    const base_url = 'http://localhost:3009';
    const path_full = `src/routes/source/${client}/pages/${indexPath}`;
    const regexName = path_full.replaceAll('/', '_');
    const regexChunk = `${regexName}_index_tsx.chunk.bundle.js`;

    try {
      const isAny = await axios(`${base_url}/p/${regexChunk}`);
      if (isAny) {
        setIsCustom(true);
      }
    } catch {
      setIsCustom(false);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  };
  useEffect(() => {
    getAnyCostome();
  }, [location]);

  return (
    <Layout className={isLayout ? `layout-dashboard` : 'blank'}>
      {isLayout && (
        <>
          <Drawer
            title={false}
            placement={'left'}
            closable={false}
            onClose={() => setVisible(false)}
            visible={visible}
            key={'left'}
            width={barWidth}
            className={`drawer-sidebar  `}
          >
            <Layout className={`layout-dashboard `}>
              <Sider
                trigger={null}
                width={barWidth}
                theme="light"
                className={`sider-primary ant-layout-sider-primary ${sidenavType === '#fff' ? 'active-route' : ''}`}
                style={{ background: sidenavType }}
              >
                <Sidenav color={sidenavColor} />
              </Sider>
            </Layout>
          </Drawer>
          <Sider
            breakpoint="lg"
            collapsedWidth="0"
            onCollapse={(collapsed, type) => {
              console.log(collapsed, type);
            }}
            trigger={null}
            width={barWidth}
            theme="light"
            className={`sider-primary ant-layout-sider-primary ${sidenavType === '#fff' ? 'active-route' : ''}`}
            style={{ background: sidenavType }}
          >
            <Sidenav color={sidenavColor} />
          </Sider>
        </>
      )}
      <Layout>
        {isLayout && (
          <>
            {fixed ? (
              <Affix>
                <AntHeader className={`${fixed ? 'ant-header-fixed' : ''}`}>
                  <Header
                    onPress={openDrawer}
                    name={pathname}
                    subName={pathname}
                    handleSidenavColor={handleSidenavColor}
                    handleSidenavType={handleSidenavType}
                    handleFixedNavbar={handleFixedNavbar}
                  />
                </AntHeader>
              </Affix>
            ) : (
              <AntHeader className={`${fixed ? 'ant-header-fixed' : ''}`}>
                <Header
                  onPress={openDrawer}
                  name={pathname}
                  subName={pathname}
                  handleSidenavColor={handleSidenavColor}
                  handleSidenavType={handleSidenavType}
                  handleFixedNavbar={handleFixedNavbar}
                />
              </AntHeader>
            )}
          </>
        )}
        <Content className="content-ant body-wrappers">
          {!loading && isCustom && (
            <Routes>
              <Route path="*" element={<DynamicAsyncPage onConfig={onHandleConfig} clientId={current} />} />
            </Routes>
          )}
          {!loading && !isCustom && (
            <Routes>
              {standardRoutes.map((e, i) => (
                <Route
                  key={e.keyIndex}
                  path={e.path}
                  element={<FrameRoutes config={{ ...e, element: null }}>{e.element}</FrameRoutes>}
                />
              ))}

              <Route path="/p/*" element={<RouteMasterNext />} />
              <Route path="*" element={<>{getCookie('custom') ? <NotFound /> : <NotFound />}</>} />
            </Routes>
          )}
          {loading && <Loader />}
        </Content>
      </Layout>
    </Layout>
  );
}

export default Main;
