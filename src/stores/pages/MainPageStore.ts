import { action, makeObservable } from 'mobx';

import { PlayerColors } from '../../constants/PlayerColors';
import { PlayerConnection } from '../../model/connections';
import { LobbyPlayer } from '../../model/lobby';

import { BasePage, IPageVisitor } from './BasePage';
import { ServerLobbyStore } from './lobby/ServerLobbyStore';
import { PagesController } from './PagesController';

export class MainPageStore extends BasePage {
  constructor(pages: PagesController) {
    super(pages);

    makeObservable(this, {
      onPlayAsServer: action.bound,
      onPlayAsClient: action.bound,
    });
  }

  onPlayAsServer(username: string) {
    // TODO поменять цвет
    const color = PlayerColors.green;

    // TODO нормальный ID сделать
    const uuid = `${Math.random()}`;

    const connection = new PlayerConnection();
    const player = new LobbyPlayer(uuid, connection, color);

    this.next(new ServerLobbyStore(this.pages, username, player));
  }

  onPlayAsClient(username: string) {
    // TODO
  }

  accept<R>(visitor: IPageVisitor<R>): R {
    return visitor.withMainPage(this);
  }
}
