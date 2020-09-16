import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import Globalstyle from './styles/global';

import AppProvider from './hooks';

import Routes from './routes';

const App: React.FC = () => (
  <Router>
    <AppProvider>
      <Routes />
    </AppProvider>
    
    <Globalstyle />
  </ Router>
);
export default App;
