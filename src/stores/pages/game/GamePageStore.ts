import { IServer } from '../../../model/client-server';
import { BasePage, IPageVisitor } from '../BasePage';
import { PagesController } from '../PagesController';

export class GamePageStore extends BasePage {
  private server: IServer;

  constructor(pages: PagesController, server: IServer) {
    super(pages);
    this.server = server;
  }

  accept<R>(visitor: IPageVisitor<R>): R {
    return visitor.withGamePage(this);
  }
}
