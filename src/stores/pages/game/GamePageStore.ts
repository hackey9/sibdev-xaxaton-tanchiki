import { action, makeObservable } from 'mobx';

import { IServer } from '../../../model/client-server';
import { Directions } from '../../../types/Tank';
import { BasePage, IPageVisitor } from '../BasePage';
import { PagesController } from '../PagesController';

export class GamePageStore extends BasePage {
  server: IServer;

  constructor(pages: PagesController, server: IServer) {
    super(pages);
    this.server = server;

    makeObservable(this, {
      fire: action.bound,
      move: action.bound,
    });
  }

  accept<R>(visitor: IPageVisitor<R>): R {
    return visitor.withGamePage(this);
  }

  fire() {
    this.server.send({ type: 'fire' });
  }

  move(direction: Directions) {
    this.server.send({ type: 'move', direction });
  }
}
