import React from 'react';

import ClientConnectionPage from '../pages/clientConnectionPage/clientConnectionPage';
import ClientQRPage from '../pages/clientQRPage/clientQRPage';
import HomePage from '../pages/homePage/homePage';
import ServerConnectionPage from '../pages/serverConnectionPage/serverConnectionPage';
import { BasePage, IPageVisitor } from '../stores/pages/BasePage';

const renderPageVisitor: IPageVisitor<React.ReactElement> = {
  withMainPage: (page) => <HomePage handleConnect={page.onPlayAsClient} handleCreateGame={page.onPlayAsServer} />,
  withServerLobbyQr: (page) => (
    <>
      {!page.showQR ? (
        <ServerConnectionPage
          users={page.players}
          handleStartGame={page.onStartGame}
          qrValue={page.qrCodeString || void 0}
        />
      ) : (
        <ClientConnectionPage handleReturn={page.onBack} handleQRResult={page.onClientCodeScan} />
      )}
    </>
  ),
  withClientConnectingPage: (page) => (
    <>
      {!page.showQR ? (
        <ClientConnectionPage handleReturn={page.onBack} handleQRResult={page.onQrRead} />
      ) : (
        <ClientQRPage qrValue={page.qrCodeString} />
      )}
    </>
  ),
};

export function usePageRenderer() {
  return (page: BasePage) => page.accept(renderPageVisitor);
}
