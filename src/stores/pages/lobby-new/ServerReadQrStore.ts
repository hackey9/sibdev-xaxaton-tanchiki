import { flow, makeObservable } from 'mobx';

import { LocalServer } from '../../../model/client-server';
import { PlayerConnection } from '../../../model/connections';
import { newPlayerId } from '../../../utils/newPlayerId';
import { parseQrCode, TAnswerQrCode } from '../../../utils/qr-code';
import { BasePage, IPageVisitor } from '../BasePage';
import { PagesController } from '../PagesController';

import { ServerShowQrStore } from './ServerShowQrStore';

export class ServerReadQrStore extends BasePage {
  private readonly peer: PlayerConnection<unknown, unknown>;
  private readonly server: LocalServer;

  constructor(pages: PagesController, localServer: LocalServer, peer: PlayerConnection<unknown, unknown>) {
    super(pages);
    this.server = localServer;
    this.peer = peer;

    makeObservable(this, {
      onQrFromClient: flow.bound,
    });
  }

  flag = false;

  async *onQrFromClient(qr: string) {
    if (this.flag) return;
    this.flag = true;
    const { ices, answer } = parseQrCode<TAnswerQrCode>(qr);

    try {
      await this.peer.setRemoteAnswer(answer);
      await this.peer.setIceCandidates(ices);
      yield;
    } catch (e) {
      debugger;
    }

    try {
      await this.peer.connectedPromise;
      yield;
    } catch (e) {
      debugger;
    }

    this.server.addRemoteClient(newPlayerId(), this.peer);

    this.next(new ServerShowQrStore(this.pages, this.server));
  }

  accept<R>(visitor: IPageVisitor<R>): R {
    return visitor.withServer2(this);
  }
}
