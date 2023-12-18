import React from 'react';
import { useSelector } from 'react-redux';
import { useAppContext } from './appContext';

export default function Header({ onClear, count }) {
  const { notificationCount } = useSelector(({ notification }) => ({
    notificationCount: notification.count,
  }));
const { globalState } = useAppContext()
  return (
    <div
      style={{
       
       
        padding: '0 16px',
      }}
    >
      <h3>Remote Server</h3>
      <div
        style={{
          
        }}
      ><div> count context {globalState?.reminder}</div>
        <div>count redux: {count}</div>
        <div>notification: {notificationCount}</div>
        <button onClick={onClear}>Clear</button>
      </div>
    </div>
  );
}
