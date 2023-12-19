import React from 'react';
import Footer from './Footer';
import Header from './Header';
import Bridge from './bridge';
import { Card } from 'antd';

function App() {
  return (
    <div className="App">
      <Card>
        <Bridge updateContainer={e => {}} valueContainer={null} />
      </Card>
      <Header />
      <div style={{ padding: '36px', height: '128px', width: '90vw' }}>REMOTE APP</div>
      <Footer />
    </div>
  );
}

export default App;
