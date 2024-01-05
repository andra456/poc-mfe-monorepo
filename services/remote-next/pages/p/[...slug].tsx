'use client';
import React, { useState, useEffect } from 'react';

import loadable from '@loadable/component';
import axios from 'axios';

const AsyncPage: any = loadable((props: any) => import(`../${props.page}`), {
  cacheKey: (props: any) => props.page,
  ssr: false,
  fallback: <div>loading content...</div>,
});
interface IProps {
  value: string;
  pathname: string;
  client: string;
  onConfig: (e: any) => void;
}

export default function Routing({ value, pathname = 'auth', client = 'airasia', onConfig }: IProps) {
  const [isAvailable, setIsAvailable] = useState(false);
  const [current, setCurrent] = useState(client);

  const link = `source/${client}/pages/${pathname}`;
  // const path = location.pathname;
  const linkApi = process.env.BASE_URL + `/api/routers/${client}/${pathname}`;

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
        //props.handleRedirect && props.handleRedirect();
        console.log('not found');
      }
    } catch (err) {
      console.log(err);
      console.log('page-not-found');
      //props.handleRedirect && props.handleRedirect();
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

  return (
    isAvailable &&
    current === client && (
      <div>
        <AsyncPage page={link} />
      </div>
    )
  );
}
