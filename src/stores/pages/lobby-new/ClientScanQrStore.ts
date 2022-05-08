import { flow, makeObservable } from 'mobx';

import { PlayerConnection } from '../../../model/connections';
import { parseQrCode, TOfferQrCode } from '../../../utils/qr-code';
import { BasePage, IPageVisitor } from '../BasePage';
import { PagesController } from '../PagesController';

import { ClientShowQrStore } from './ClientShowQrStore';

export class ClientScanQrStore extends BasePage {
  constructor(pages: PagesController) {
    super(pages);

    makeObservable(this, {
      onQrFromServer: flow.bound,
    });
  }

  accept<R>(visitor: IPageVisitor<R>): R {
    return visitor.withClient1(this);
  }

  async *onQrFromServer(qr: string) {
    const { ices, offer } = parseQrCode<TOfferQrCode>(qr);

    const peer = new PlayerConnection();
    peer.initConnection();

    await peer.setRemoteOffer(offer);
    await peer.setIceCandidates(ices);
    yield;

    this.next(new ClientShowQrStore(this.pages, peer));
  }
}
