import React, { useState } from 'react';
import NextRemote from 'next/dinamic-next';
import { getCookie } from '../../libs/hooks/useCookies';

interface IPropsRouting {
  onConfig: (e: any) => void;
}

function RoutingMasterView({ onConfig }: IPropsRouting) {
  const [current] = useState(getCookie('custom'));

  const path = window.location.pathname;
  const params = path.split('/');
  const indexPath = params[2] ?? '';

  return (
    <>
      <div className="layout-content">
        <NextRemote value={'value'} pathname={indexPath} client={current} onConfig={onConfig} />
      </div>
    </>
  );
}

export default RoutingMasterView;
