import React from 'react';
import { Home } from './pages/Home';

function App() {
  return (
    <div className="container-fluid">
      <div className="row bg-primary">
        <div className="col-sm-12">
          <h1 className="text-center text-white">NASA App</h1>
       </div>
      </div>
      <div className="row" style={{marginTop: 20}}>
        <Home />
      </div>
    </div>
  );
}

export default App;