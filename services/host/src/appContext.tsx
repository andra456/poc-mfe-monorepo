import React, { createContext, useState, useCallback, useContext } from 'react';

const AppContext = createContext({});
const { Provider } = AppContext;

export const Consumer = AppContext.Consumer;
const init = {
  reminder: 0,
  search: '',
};

export const AppProvider = ({ children, initialState = init }) => {
  const [state, setActualState] = useState(initialState);
  const setState = useCallback((newState, preUpdate) => {
    setActualState(prevState => {
      if (preUpdate && preUpdate.call) {
        preUpdate();
      }
      return { ...prevState, ...newState };
    });
  }, []);

  const updateState = useCallback(updateFunction => setActualState(updateFunction), []);
  const appContextValue = {
    globalState: { ...initialState, ...state },
    setState,
    updateState,
  };

  return <Provider value={appContextValue}>{children}</Provider>;
};

export const useAppContext: any = () => useContext(AppContext);
export default AppContext;
