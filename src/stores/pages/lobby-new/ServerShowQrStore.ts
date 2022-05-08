import { action, flow, makeObservable, observable } from 'mobx';

import { LocalServer } from '../../../model/client-server';
import { PlayerConnection } from '../../../model/connections';
import { createQrCode } from '../../../utils/qr-code';
import { BasePage, IPageVisitor } from '../BasePage';
import { GamePageStore } from '../game/GamePageStore';
import { PagesController } from '../PagesController';

import { ServerReadQrStore } from './ServerReadQrStore';

export class ServerShowQrStore extends BasePage {
  offerQr?: string;
  private readonly peer: PlayerConnection<unknown, unknown>;
  private readonly localServer: LocalServer;

  constructor(pages: PagesController, server: LocalServer) {
    super(pages);
    this.peer = new PlayerConnection();
    this.localServer = server;

    makeObservable(this, {
      offerQr: observable,
      initConnection: flow.bound,
      onNext: action.bound,
      onStartGame: action.bound,
    });
  }

  init() {
    this.initConnection();
  }

  async *initConnection() {
    this.peer.initConnection();
    this.peer.createDataChannel();

    try {
      const offer = await this.peer.createLocalOffer();
      const ices = await this.peer.getIceCandidates();
      yield;
      this.offerQr = createQrCode({ offer, ices });
    } catch (e) {
      debugger;
    }
  }

  onNext() {
    this.next(new ServerReadQrStore(this.pages, this.localServer, this.peer));
  }

  accept<R>(visitor: IPageVisitor<R>): R {
    return visitor.withServer1(this);
  }

  onStartGame() {
    this.localServer.broadcast({ type: 'gameState', state: this.localServer.state });
    this.localServer.broadcast({ type: 'start' });

    this.next(new GamePageStore(this.pages, this.localServer));
  }
}
