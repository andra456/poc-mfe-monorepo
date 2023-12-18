import React from 'react';

import { BrowserRouter } from 'react-router-dom';
import Main from './components/layout/Main';

// style
import './assets/styles/animate.min.css';
import './assets/styles/main.css';
import './assets/styles/responsive.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Main />
      </BrowserRouter>
    </div>
  );
}

export default App;
