import React, { useState } from 'react';

const flying = '/flying.png';

function PageNotFound() {
  return (
    <>
      <div
        className="layout-content"
        style={{
          display: 'flex',
          flexDirection: 'column',
          textAlign: 'center',
          justifyContent: 'center',
          maxWidth: '250px',
          margin: '20px auto',
        }}
      >
        <p>Page not available</p>
        <img src={flying} alt="a" />
      </div>
    </>
  );
}

export default PageNotFound;
