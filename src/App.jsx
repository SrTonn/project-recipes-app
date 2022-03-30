import React from 'react';
import Provider from './context/Provider';
import 'bootstrap/dist/css/bootstrap.min.css';
import Routes from './routes/Routes';

function App() {
  return (
    <Provider>
      <Routes />
    </Provider>
  );
}

export default App;
