import React from 'react';
import styled from 'styled-components';

const LoaderComponent = styled.div`
  display: flex;
  position: absolute;
  z-index: 2222;
  inset: 0;
  background: #fafafa;
  opacity: 0.5;
  justify-content: center;
  align-items: center;
  animation: fadeIn 200ms;
  svg {
    width: 68px;
  }
  span {
    font-size: 16px;
    color: #000;
  }
`;

function Loader() {
  return (
    <LoaderComponent>
      <svg version="1.1" id="L9" xmlns="http://www.w3.org/2000/svg" y="0px" viewBox="0 0 100 100" enable-background="new 0 0 0 0">
        <path fill="#ddd" d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50">
          <animateTransform
            attributeName="transform"
            attributeType="XML"
            type="rotate"
            dur="1s"
            from="0 50 50"
            to="360 50 50"
            repeatCount="indefinite"
          ></animateTransform>
        </path>
      </svg>{' '}
      <span>Loading...</span>
    </LoaderComponent>
  );
}

export default Loader;
