import React, { useState, useEffect } from 'react';
import { Fragment } from './_style';

interface IFeature {
  title?: string;
}
interface IState {
  arg: null | string;
}

export function FeatuesOne({ title = '' }: IFeature): JSX.Element {
  const initState = {
    arg: null,
  };
  // always define initial state
  const [first, setFirst] = useState<IState>(initState);

  useEffect(() => {
    setFirst({ arg: 'Congrats page has create' });

    return () => {
      setFirst(initState);
    };
  }, []);

  return (
    <Fragment>
      <h1>Feature has been create</h1>
      <h4>{first.arg}</h4>
      <p>This page only sample temlate feature</p>
    </Fragment>
  );
}

export default React.memo(FeatuesOne);
