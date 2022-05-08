import { RemoteServer } from '../../../model/client-server';
import { BasePage, IPageVisitor } from '../BasePage';
import { GamePageStore } from '../game/GamePageStore';
import { PagesController } from '../PagesController';

export class ClientLobbyStore extends BasePage {
  private readonly server: RemoteServer;

  constructor(pages: PagesController, server: RemoteServer) {
    super(pages);
    this.server = server;
  }

  async init() {
    await this.server.startedPromise;
    this.next(new GamePageStore(this.pages, this.server));
  }

  get users(): { name: string; color: string }[] {
    return [];
  }

  accept<R>(visitor: IPageVisitor<R>): R {
    return visitor.withClientLobbyPage(this);
  }
}
