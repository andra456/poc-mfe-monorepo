import React, { createContext, useState, useCallback, useContext, ReactNode } from 'react';

interface IAppContext {
  [key: string]: any;
}

interface IAppProviderProps {
  children: ReactNode;
  initialState?: object;
}

const AppContext = createContext({});
const { Provider } = AppContext;

export const Consumer = AppContext.Consumer;
const init = {
  reminder: 0,
  search: '',
};

export const AppProvider = ({ children, initialState = init }: IAppProviderProps) => {
  const [state, setActualState] = useState(initialState);

  const setState = useCallback((newState: any, preUpdate: any) => {
    setActualState(prevState => {
      if (preUpdate && preUpdate.call) {
        preUpdate();
      }
      return { ...prevState, ...newState };
    });
  }, []);

  const updateState = useCallback((updateFunction: any) => setActualState(updateFunction), []);

  const appContextValue = {
    globalState: { ...initialState, ...state },
    setState,
    updateState,
  };

  return <Provider value={appContextValue}>{children}</Provider>;
};

export const useAppContext = (): IAppContext => useContext(AppContext);

export default AppContext;
