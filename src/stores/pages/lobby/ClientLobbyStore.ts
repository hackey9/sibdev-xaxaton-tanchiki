import { RemoteServer } from '../../../model/client-server';
import { BasePage, IPageVisitor } from '../BasePage';
import { PagesController } from '../PagesController';

export class ClientLobbyStore extends BasePage {
  private server: RemoteServer;

  constructor(pages: PagesController, server: RemoteServer) {
    super(pages);
    this.server = server;
  }

  get users(): { name: string; color: string }[] {
    return [];
  }

  accept<R>(visitor: IPageVisitor<R>): R {
    return visitor.withClientLobbyPage(this);
  }
}
