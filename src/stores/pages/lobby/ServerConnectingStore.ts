import { action, flow, makeObservable, observable } from 'mobx';

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

  // При переходе на страницу
  async init() {
    console.log('init');
    this.createPeer();
  }

  async *createPeer() {
    // 1. создать соединение, закешировать его
    const peer = new PlayerConnection();
    this.lastPeer = peer;
    peer.initConnection();
    peer.createDataChannel();
    console.log('peer handle', peer);

    // 2. создаём оффер и кандидатов
    try {
      const offer = await peer.createLocalOffer();
      const ices = await peer.getIceCandidates();
      yield;
      console.log('оффер и кандидаты от сервера', { offer, ices });

      // 3. Создаём QR-код
      this.qrCodeString = createQrCode<TOfferQrCode>({ offer, ices, id: newPlayerId() });

      console.log('server created offer & ices');
    } catch (e) {
      console.log('ошибка при создании оффера', e);
      return;
    }
  }

  accept<R>(visitor: IPageVisitor<R>): R {
    return visitor.withServerLobbyQr(this);
  }

  onBack() {
    this.showQR = true;
  }

  async *onClientCodeScan(qrCode: string): Promise<void> {
    const qrData = parseQrCode<TAnswerQrCode>(qrCode);

    console.log('scan client qr data', qrData);
    const peer = this.lastPeer!;
    await peer.setRemoteAnswer(qrData.answer);
    await peer.setIceCandidates(qrData.ices);
    console.log('set remote answer & ices');
    yield;

    const playerId = newPlayerId();
    this.localServer.addRemoteClient(playerId, peer);
    this.qrCodeString = void 0;
    this.lastPeer = void 0;
    this.showQR = true;
    console.log('created remote client go next scan');

    await this.createPeer();
  }

  onStartGame(): void {
    this.localServer.broadcast({ type: 'start' });
    this.localServer.broadcast({ type: 'gameState', state: this.localServer.state });
    this.next(new GamePageStore(this.pages, this.localServer));
  }

  goScan() {
    this.showQR = false;
  }
}
