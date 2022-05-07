import { action, makeObservable } from 'mobx';

import { BasePage, IPageVisitor } from '../BasePage';
import { ServerLobbyStore } from '../lobby/ServerLobbyStore';
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
    this.next(new ServerLobbyStore(this.pages, username));
  }

  onPlayAsClient(username: string) {
    // TODO
  }

  accept<R>(visitor: IPageVisitor<R>): R {
    return visitor.withMainPage(this);
  }

  init(): void {}

  dispose(): void {}
}
