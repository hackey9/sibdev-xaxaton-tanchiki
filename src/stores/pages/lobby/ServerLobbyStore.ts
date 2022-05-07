import { makeObservable, observable } from 'mobx';

import { LobbyPlayer } from '../../../model/lobby';
import { BasePage, IPageVisitor } from '../BasePage';
import { PagesController } from '../PagesController';

export class ServerLobbyStore extends BasePage {
  private readonly hostUsername: string;

  players: LobbyPlayer[];
  newPlayer: LobbyPlayer;

  constructor(pages: PagesController, hostUsername: string, newPlayer: LobbyPlayer, players?: LobbyPlayer[]) {
    super(pages);

    this.hostUsername = hostUsername;
    this.newPlayer = newPlayer;
    this.players = players || [];

    makeObservable(this, {
      players: observable,
      newPlayer: observable,
    });
  }

  accept<R>(visitor: IPageVisitor<R>): R {
    return visitor.withServerLobbyQr(this);
  }

  onBack() {
    // TODO вернуться к показу QR
  }
}
