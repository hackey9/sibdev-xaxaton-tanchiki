import React from 'react';

import './App.css';
import HomePage from './pages/homePage/homePage';
import ServerConnectionPage from './pages/serverConnectionPage/serverConnectionPage';
import { PageType } from './types/pages';

import './styles/index.scss';

export let page: PageType = PageType.connectionServer;

const App = () => {
  return (
    <div className="App">
      {page === PageType.home && <HomePage />}
      {/*@ts-ignore*/}
      {page === PageType.connectionServer && <ServerConnectionPage />}
    </div>
  );
};

export default App;
