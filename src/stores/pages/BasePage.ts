import { makeObservable } from 'mobx';

import { ClientLobbyStore } from './lobby/ClientLobbyStore';
import { ServerLobbyStore } from './lobby/ServerLobbyStore';
import { MainPageStore } from './MainPageStore';
import { PagesController } from './PagesController';

export abstract class BasePage {
  protected readonly pages: PagesController;

  protected constructor(pages: PagesController) {
    this.pages = pages;

    makeObservable(this, {});
  }

  protected next(page: BasePage) {
    this.pages.next(page);
  }

  abstract accept<R>(visitor: IPageVisitor<R>): R;
}

export interface IPageVisitor<R> {
  withMainPage(page: MainPageStore): R;
  withServerLobbyQr(page: ServerLobbyStore): R;
  withClientConnectingPage(page: ClientLobbyStore): R;
}
