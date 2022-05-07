import React from 'react';

import './App.css';
import ClientConnectionPage from './pages/clientConnectionPage/clientConnectionPage';
import ClientLobbyPage from './pages/clientLobbyPage/clientLobbyPage';
import ClientQRPage from './pages/clientQRPage/clientQRPage';
import { COLORS } from './pages/homePage/constants';
import HomePage from './pages/homePage/homePage';
import ServerConnectionPage from './pages/serverConnectionPage/serverConnectionPage';
import { PageType } from './types/pages';

import './styles/index.scss';

export let page: PageType = PageType.connectionClientLobby;

const App = () => {
  return (
    <div className="App">
      {/*{page === PageType.home && <HomePage />}*/}
      {/*{page === PageType.connectionServer && <ServerConnectionPage />}*/}
      {/*{page === PageType.connectionClient && <ClientConnectionPage />}*/}
      {page === PageType.connectionClientQR && <ClientQRPage qrValue="oifowfoihweofhwoei" />}
      {page === PageType.connectionClientLobby && (
        <ClientLobbyPage
          users={[
            { name: 'user1', color: COLORS[0] },
            { name: 'user2', color: COLORS[1] },
          ]}
        />
      )}
    </div>
  );
};

export default App;
