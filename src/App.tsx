import React from 'react';

import './App.css';
import ClientConnectionPage from './pages/clientConnectionPage/clientConnectionPage';
import HomePage from './pages/homePage/homePage';
import ServerConnectionPage from './pages/serverConnectionPage/serverConnectionPage';
import { PageType } from './types/pages';

import './styles/index.scss';

export let page: PageType = PageType.connectionClient;

const App = () => {
  return (
    <div className="App">
      {page === PageType.home && <HomePage />}
      {page === PageType.connectionServer && <ServerConnectionPage />}
      {page === PageType.connectionClient && <ClientConnectionPage />}
    </div>
  );
};

export default App;
