import { action, makeObservable } from 'mobx';

import { GamePageStore } from './game/GamePageStore';
import { ClientScanQrStore } from './lobby-new/ClientScanQrStore';
import { ClientShowQrStore } from './lobby-new/ClientShowQrStore';
import { ServerReadQrStore } from './lobby-new/ServerReadQrStore';
import { ServerShowQrStore } from './lobby-new/ServerShowQrStore';
import { ClientConnectingStore } from './lobby/ClientConnectingStore';
import { ClientLobbyStore } from './lobby/ClientLobbyStore';
import { ServerConnectingStore } from './lobby/ServerConnectingStore';
import { MainPageStore } from './main/MainPageStore';
import { PagesController } from './PagesController';

export abstract class BasePage {
  protected readonly pages: PagesController;

  protected constructor(pages: PagesController) {
    this.pages = pages;

    makeObservable<this, 'next'>(this, {
      next: action.bound,
    });
  }

  protected next(page: BasePage) {
    this.pages.next(page);
  }

  init(): void {}

  dispose(): void {}

  abstract accept<R>(visitor: IPageVisitor<R>): R;
}

export interface IPageVisitor<R> {
  withMainPage(page: MainPageStore): R;
  withServerLobbyQr(page: ServerConnectingStore): R;
  withClientConnectingPage(page: ClientConnectingStore): R;
  withClientLobbyPage(page: ClientLobbyStore): R;
  withGamePage(page: GamePageStore): R;
  withServer1(param: ServerShowQrStore): R;
  withServer2(param: ServerReadQrStore): R;
  withClient1(param: ClientScanQrStore): R;
  withClient2(param: ClientShowQrStore): R;
}
