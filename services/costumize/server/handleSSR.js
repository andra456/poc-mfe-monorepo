import React from 'react';
import serialize from 'serialize-javascript';
import { clientEnv } from '../config';

const renderFullPage = () => `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charSet="utf-8">
      <title>React SSR</title>
      <link rel="icon" type="image/x-icon" class="js-site-favicon" href="https://github.githubassets.com/favicon.ico">
      <link rel="stylesheet" type="text/css" href="/main.css">
      
    </head>
    <body>
      <div id="app"></div>
      <script src="/static/bundle.js"></script>
    </body>
  </html>
`;

const handleSSR = (req, res) => {
  res.status(200).send(renderFullPage());
};

export { handleSSR }; // eslint-disable-line
