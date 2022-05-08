import { action, flow, makeObservable, observable } from 'mobx';

import { RemoteServer } from '../../../model/client-server';
import { PlayerConnection } from '../../../model/connections';
import { createQrCode, parseQrCode, TAnswerQrCode, TOfferQrCode } from '../../../utils/qr-code';
import { BasePage, IPageVisitor } from '../BasePage';
import { PagesController } from '../PagesController';

import { ClientLobbyStore } from './ClientLobbyStore';

export class ClientConnectingStore extends BasePage {
  showQR: Boolean;
  qrCodeString?: string;
  private remoteServer?: RemoteServer;

  constructor(pages: PagesController) {
    super(pages);
    this.showQR = false;

    makeObservable(this, {
      showQR: observable,
      qrCodeString: observable,
      onBack: action.bound,
      onQrRead: flow.bound,
    });
  }

  accept<R>(visitor: IPageVisitor<R>): R {
    return visitor.withClientConnectingPage(this);
  }

  onBack() {
    this.showQR = false;
  }

  async *onQrRead(qrCode: string) {
    const qrData = parseQrCode<TOfferQrCode>(qrCode);
    this.showQR = true;

    const peer = new PlayerConnection();
    peer.initConnection();
    console.log('client connection created');
    await peer.setRemoteOffer(qrData.offer);
    await peer.setIceCandidates(qrData.ices);
    console.log('set remote offer & ices');
    const answer = await peer.createLocalAnswer();
    const ices = await peer.getIceCandidates();
    console.log('set local answer & ices');
    yield;

    this.qrCodeString = createQrCode<TAnswerQrCode>({ answer, ices });
    console.log('qr code', this.qrCodeString);

    this.remoteServer = new RemoteServer(peer);
    await this.remoteServer.connectedPromise;
    console.log('connected');

    this.next(new ClientLobbyStore(this.pages, this.remoteServer!));
  }
}
