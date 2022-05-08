import React from 'react';

import ClientConnectionPage from '../pages/clientConnectionPage/clientConnectionPage';
import ClientLobbyPage from '../pages/clientLobbyPage/clientLobbyPage';
import ClientQRPage from '../pages/clientQRPage/clientQRPage';
import GamePage from '../pages/gamePage/gamePage';
import HomePage from '../pages/homePage/homePage';
import ServerConnectionPage from '../pages/serverConnectionPage/serverConnectionPage';
import { BasePage, IPageVisitor } from '../stores/pages/BasePage';

const renderPageVisitor: IPageVisitor<React.ReactElement> = {
  withMainPage: (page) => <HomePage handleConnect={page.onPlayAsClient} handleCreateGame={page.onPlayAsServer} />,
  withServerLobbyQr: (page) => (
    <>
      {page.showQR ? (
        <ServerConnectionPage
          users={page.localServer.clients.map(({ playerId, color }) => ({ color, name: playerId }))}
          handleStartGame={page.onStartGame}
          qrValue={page.qrCodeString}
          handleScan={page.goScan}
        />
      ) : (
        <ClientConnectionPage handleReturn={page.onBack} handleQRResult={page.onClientCodeScan} />
      )}
    </>
  ),
  withClientConnectingPage: (page) => (
    <>
      {!page.showAnswerQR ? (
        <ClientConnectionPage handleReturn={page.onBack} handleQRResult={page.onQrRead} />
      ) : (
        <ClientQRPage qrValue={page.answerQrCodeString} />
      )}
    </>
  ),
  withClientLobbyPage: (page) => (
    <>
      <ClientLobbyPage users={page.users} />
    </>
  ),
  withGamePage: (page) => (
    <>
      <GamePage onFire={page.fire} server={page.server} onMove={page.move} />
    </>
  ),
  withServer1: (page) => (
    <>
      <ServerConnectionPage
        users={[]}
        handleStartGame={page.onStartGame}
        qrValue={page.offerQr}
        handleScan={page.onNext}
      />
    </>
  ),
  withServer2: (page) => (
    <>
      <ClientConnectionPage handleReturn={() => {}} handleQRResult={page.onQrFromClient} />
    </>
  ),
  withClient1: (page) => (
    <>
      <ClientConnectionPage handleReturn={() => {}} handleQRResult={page.onQrFromServer} />
    </>
  ),
  withClient2: (page) => (
    <>
      <ClientQRPage qrValue={page.answerQr} />
    </>
  ),
};

export function usePageRenderer() {
  return (page: BasePage) => page.accept(renderPageVisitor);
}
