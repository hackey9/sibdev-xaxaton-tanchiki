import { action, computed, makeObservable, observable } from 'mobx';

import { LocalServer } from '../../../model/client-server';
import { __stubGameStateReducer } from '../../../model/game-state';
import { BasePage, IPageVisitor } from '../BasePage';
import { PagesController } from '../PagesController';

export class ServerLobbyStore extends BasePage {
  localServer: LocalServer;
  showQR: boolean;
  players: any[];

  constructor(pages: PagesController, hostUsername: string) {
    super(pages);

    this.localServer = new LocalServer(hostUsername, __stubGameStateReducer);

    makeObservable(this, {
      showQR: observable,
      onBack: action,
      onClientCodeScan: action,
      onStartGame: action,
      qrCodeString: computed,
    });
  }

  accept<R>(visitor: IPageVisitor<R>): R {
    return visitor.withServerLobbyQr(this);
  }

  onBack() {
    this.showQR = true;
  }

  get qrCodeString(): string | null {
    // TODO
  }

  async *onClientCodeScan(qrResult: string): Promise<void> {
    // TODO
  }

  onStartGame(): void {
    // TODO: сообщить всем игрокам о начале игры. перейти на страницу игры.
  }
}
