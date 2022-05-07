import { makeObservable } from 'mobx';

import { BasePage, IPageVisitor } from '../BasePage';
import { PagesController } from '../PagesController';

export class ClientLobbyStore extends BasePage {
  constructor(pages: PagesController) {
    super(pages);

    makeObservable(this, {
      //
    });
  }

  accept<R>(visitor: IPageVisitor<R>): R {
    return visitor.withClientConnectingPage(this);
  }
}
