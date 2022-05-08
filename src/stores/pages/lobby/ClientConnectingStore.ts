import { action, flow, makeObservable, observable } from 'mobx';

import { RemoteServer } from '../../../model/client-server';
import { PlayerConnection } from '../../../model/connections';
import { createQrCode, parseQrCode, TAnswerQrCode, TOfferQrCode } from '../../../utils/qr-code';
import { BasePage, IPageVisitor } from '../BasePage';
import { PagesController } from '../PagesController';

import { ClientLobbyStore } from './ClientLobbyStore';

/** @deprecated */
export class ClientConnectingStore extends BasePage {
  showAnswerQR: Boolean;
  answerQrCodeString?: string;
  private remoteServer?: RemoteServer;

  constructor(pages: PagesController) {
    super(pages);
    this.showAnswerQR = false;

    makeObservable(this, {
      showAnswerQR: observable,
      answerQrCodeString: observable,
      onBack: action.bound,
      onQrRead: flow.bound,
    });
  }

  accept<R>(visitor: IPageVisitor<R>): R {
    return visitor.withClientConnectingPage(this);
  }

  onBack() {
    this.showAnswerQR = false;
  }

  /**
   * Клиент считывает QR-код сервера
   */
  async *onQrRead(qrCode: string) {
    // 1. читаем данные из QR-кода
    this.showAnswerQR = true;
    const qrData = parseQrCode<TOfferQrCode>(qrCode);

    console.log('данные из QR-кода', qrData);

    // 2. создаём соединение. не подключаем никакие каналы.
    const peer = new PlayerConnection();
    peer.initConnection();

    console.log('connection handle', peer);

    // 3. устанавливаем удалённые данные
    try {
      await peer.setRemoteOffer(qrData.offer);
      await peer.setIceCandidates(qrData.ices);
      yield;
    } catch (e) {
      console.log('Ошибка при установке офферов/кандидатов', e);
      return;
    }

    // 4. создаём локальные данные, создаём qr-код
    try {
      const answer = await peer.createLocalAnswer();
      const ices = await peer.getIceCandidates();
      console.log('данные для сервера', { answer, ices });

      // 5. создаём qr-код
      this.answerQrCodeString = createQrCode<TAnswerQrCode>({ answer, ices });

      // 6. ждём полного подключения
      await peer.connectedPromise;
      console.log('соединение установлено успешно. канал связи создан');
    } catch (e) {
      console.log('ошибка при подключении', e);
      return;
    }

    // 6. создаём сервер
    this.remoteServer = new RemoteServer(peer, '');

    console.log('connected');

    this.next(new ClientLobbyStore(this.pages, this.remoteServer!));
  }
}
