import React from 'react';
import './App.css';
import Provider from './context/Provider';
import 'bootstrap/dist/css/bootstrap.min.css';
import Routes from './routes/Routes';
import Header from './components/Header/Header';

function App() {
  return (
    <Provider>
      <Routes />
      <Header />
    </Provider>
  );
}

export default App;
