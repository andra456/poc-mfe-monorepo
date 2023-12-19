import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import loadable from '@loadable/component';
import axios from 'axios';

const AsyncPage = loadable(props => import(`../${props.page}`), {
  cacheKey: props => props.page,
  ssr: false,
  fallback: <div>loading content...</div>,
});

export default function Routing({ value, pathname = 'auth', client = 'airasiax', onConfig }) {
  const router = useRouter();
  const [isAvailable, setIsAvailable] = useState(false);
  const [current, setCurrent] = useState(client);

  const link = `source/${client}/pages/${pathname}`;
  // const path = location.pathname;
  const linkApi = `http://localhost:8081/api/routers/${client}/${pathname}`;

  const checkRouter = async () => {
    console.log('running checker');
    try {
      const isAny = await axios(linkApi);

      if (isAny.status === 200) {
        setIsAvailable(true);
        const config = require(`../source/${client}/pages/${pathname}/config.json`);
        config && onConfig && onConfig(config);
      } else {
        setIsAvailable(false);
        props.handleRedirect && props.handleRedirect();
        console.log('not found');
      }
    } catch {
      console.log('page-not-found');
      props.handleRedirect && props.handleRedirect();
      setIsAvailable(false);
    }
  };
  useEffect(() => {
    if (pathname && client) {
      setIsAvailable(false);
      setCurrent(client);
      checkRouter();
    }
    return () => {
      setIsAvailable(false);
    };
  }, [pathname, client]);

  return isAvailable && current === client && <AsyncPage page={link} />;
}
