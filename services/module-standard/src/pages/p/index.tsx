import { useRouter } from 'next/router';
import React, { useEffect, useLayoutEffect } from 'react';

import axios from 'axios';

export default function PostList() {
  const router = useRouter();
  const { slug = [] } = router.query;
  const fetchRoutes = async ({ path }: { path: string }) => {
    console.log(path);
    const res = await axios({
      method: 'GET',
      url: path,
    });
    console.log(res);
  };
  let path = '/';
  if (typeof slug === 'object') {
    path = `/${slug.join('/')}`;
  }
  useLayoutEffect(() => {
    fetchRoutes({ path });
    return () => {};
  }, []);
  return <ul>post</ul>;
}
