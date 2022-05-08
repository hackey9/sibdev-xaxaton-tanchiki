import { action, makeObservable } from 'mobx';

import { BasePage, IPageVisitor } from '../BasePage';
import { ClientConnectingStore } from '../lobby/ClientConnectingStore';
import { ServerConnectingStore } from '../lobby/ServerConnectingStore';
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
    this.next(new ServerConnectingStore(this.pages, username));
  }

  onPlayAsClient(username: string) {
    this.next(new ClientConnectingStore(this.pages));
  }

  accept<R>(visitor: IPageVisitor<R>): R {
    return visitor.withMainPage(this);
  }

  init(): void {}

  dispose(): void {}
}
