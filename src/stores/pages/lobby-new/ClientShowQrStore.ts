import { flow, makeObservable, observable } from 'mobx';

import { RemoteServer } from '../../../model/client-server';
import { PlayerConnection } from '../../../model/connections';
import { createQrCode, TAnswerQrCode } from '../../../utils/qr-code';
import { BasePage, IPageVisitor } from '../BasePage';
import { GamePageStore } from '../game/GamePageStore';
import { PagesController } from '../PagesController';

export class ClientShowQrStore extends BasePage {
  private readonly peer: PlayerConnection<unknown, unknown>;
  answerQr?: string;

  constructor(pages: PagesController, peer: PlayerConnection<unknown, unknown>) {
    super(pages);
    this.peer = peer;

    makeObservable(this, {
      answerQr: observable,
      connect: flow.bound,
    });
  }

  flag = false;

  init() {
    this.connect();
  }

  async *connect() {
    if (this.flag) return;
    this.flag = true;
    console.log('run connect');

    try {
      const answer = await this.peer.createLocalAnswer();
      const ices = await this.peer.getIceCandidates();
      yield;

      console.log(answer);
      console.log(ices);

      this.answerQr = createQrCode<TAnswerQrCode>({ answer, ices });
    } catch (e) {
      debugger;
    }

    try {
      await this.peer.connectedPromise;
    } catch (e) {
      debugger;
    }

    const server = new RemoteServer(this.peer);

    this.next(new GamePageStore(this.pages, server));
  }

  accept<R>(visitor: IPageVisitor<R>): R {
    return visitor.withClient2(this);
  }
}
