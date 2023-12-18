import React from 'react';
import { useAppContext, AppProvider } from '@/libs/context/appContext';

interface PropsReminder {
  updateContainer: (e: any) => void;
  valueContainer: any;
  children?: any;
}
const Reminder: React.FC<PropsReminder> = ({ updateContainer, valueContainer, children }) => {
  const { setState, globalState } = useAppContext();

  React.useEffect(() => {
    updateContainer(globalState);
    return () => {};
  }, [globalState]);

  React.useEffect(() => {
    setState(valueContainer);
    return () => {};
  }, [valueContainer]);

  return <div></div>;
};
