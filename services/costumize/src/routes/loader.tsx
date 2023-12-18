import React from 'react';
interface PropsPush {
  type: string;
  generalState: any;
}
interface IProps {
  data?: any;
  pushState: (e: PropsPush) => void;
}
function DefaultPage({ data, pushState }: IProps) {
  return null;
}

export default DefaultPage;
