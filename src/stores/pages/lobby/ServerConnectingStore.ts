import { action, flow, makeObservable, observable, runInAction } from 'mobx';

import { LocalServer } from '../../../model/client-server';
import { PlayerConnection } from '../../../model/connections';
import { __stubGameStateReducer } from '../../../model/game-state';
import { newPlayerId } from '../../../utils/newPlayerId';
import { createQrCode, parseQrCode, TAnswerQrCode, TOfferQrCode } from '../../../utils/qr-code';
import { BasePage, IPageVisitor } from '../BasePage';
import { GamePageStore } from '../game/GamePageStore';
import { PagesController } from '../PagesController';

export class ServerConnectingStore extends BasePage {
  localServer: LocalServer;
  showQR: boolean;
  lastPeer?: PlayerConnection<unknown, unknown>;
  players: any[];
  qrCodeString?: string;

  constructor(pages: PagesController, hostUsername: string) {
    super(pages);
    this.showQR = true;
    this.players = [];

    this.localServer = new LocalServer(hostUsername, __stubGameStateReducer);

    makeObservable(this, {
      showQR: observable,
      onBack: action.bound,
      onClientCodeScan: flow.bound,
      onStartGame: action.bound,
      qrCodeString: observable,
      goScan: action.bound,
      createPeer: flow.bound,
    });
  }

  async init() {
    this.createPeer();
  }

  async *createPeer() {
    const peer = new PlayerConnection();
    peer.initConnection();
    peer.createDataChannel();
    const offer = await peer.createLocalOffer();
    const ices = await peer.getIceCandidates();
    yield;

    this.qrCodeString = createQrCode<TOfferQrCode>({ offer, ices });
    this.lastPeer = peer;
  }

  accept<R>(visitor: IPageVisitor<R>): R {
    return visitor.withServerLobbyQr(this);
  }

  onBack() {
    this.showQR = true;
  }

  async *onClientCodeScan(qrCode: string): Promise<void> {
    const qrData = parseQrCode<TAnswerQrCode>(qrCode);

    const peer = this.lastPeer!;
    await peer.setRemoteAnswer(qrData.answer);
    await peer.setIceCandidates(qrData.ices);

    const playerId = newPlayerId();
    this.localServer.addRemoteClient(playerId, peer);

    yield;
    this.qrCodeString = void 0;
    this.lastPeer = void 0;
    this.showQR = true;
    await this.createPeer();
  }

  onStartGame(): void {
    this.localServer.broadcast({ type: 'start' });
    this.next(new GamePageStore(this.pages, this.localServer));
  }

  goScan() {
    this.showQR = false;
  }
}
