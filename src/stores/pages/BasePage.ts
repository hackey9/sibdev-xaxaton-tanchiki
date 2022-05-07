import { action, makeObservable } from 'mobx';

import { ClientLobbyStore } from './lobby/ClientLobbyStore';
import { ServerLobbyStore } from './lobby/ServerLobbyStore';
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
  withServerLobbyQr(page: ServerLobbyStore): R;
  withClientConnectingPage(page: ClientLobbyStore): R;
}
