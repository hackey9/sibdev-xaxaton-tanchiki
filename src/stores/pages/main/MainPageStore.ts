import { action, makeObservable } from 'mobx';

import { LocalServer } from '../../../model/client-server';
import { __stubGameStateReducer } from '../../../model/game-state';
import { BasePage, IPageVisitor } from '../BasePage';
import { ClientScanQrStore } from '../lobby-new/ClientScanQrStore';
import { ServerShowQrStore } from '../lobby-new/ServerShowQrStore';
import { PagesController } from '../PagesController';

export class MainPageStore extends BasePage {
  constructor(pages: PagesController) {
    super(pages);

    makeObservable(this, {
      onPlayAsServer: action.bound,
      onPlayAsClient: action.bound,
    });
  }

  onPlayAsServer(username: string) {
    const server = new LocalServer(username, __stubGameStateReducer);
    this.next(new ServerShowQrStore(this.pages, server));
  }

  onPlayAsClient(username: string) {
    this.next(new ClientScanQrStore(this.pages));
  }

  accept<R>(visitor: IPageVisitor<R>): R {
    return visitor.withMainPage(this);
  }

  init(): void {}

  dispose(): void {}
}
