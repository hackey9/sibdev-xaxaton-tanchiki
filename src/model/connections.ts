import { newPlayerId } from '../utils/newPlayerId';

export const rtcPeerConfig: RTCConfiguration = {} || { iceServers: [{ urls: ['stun:stun.l.google.com:19302'] }] };
export const rtcDataChannelInit: RTCDataChannelInit = { ordered: true };
export const rtcDataChannelName = 'data-channel';
export const rtcOfferOptions: RTCOfferOptions = {};

export class PlayerConnection<TSend, TReceive> {
  connection!: RTCPeerConnection;
  private dataChannel!: RTCDataChannel;
  private iceCandidates: RTCIceCandidate[] = [];
  private gatheringStateReadyPromise!: Promise<void>;
  connectedPromise!: Promise<void>;

  onMessage?: (message: TReceive) => void;

  send(message: TSend): void {
    console.log('$send', message);
    this.dataChannel.send(JSON.stringify(message));
  }

  initConnection() {
    this.connection = new RTCPeerConnection(rtcPeerConfig);

    this.connection.addEventListener('icecandidate', (ev) => {
      if (ev.candidate) {
        this.iceCandidates.push(ev.candidate);
      }
    });

    const pingChannel = this.connection.createDataChannel(newPlayerId());
    setInterval(() => {
      try {
        pingChannel.send('ping');
      } catch {}
    }, 1000);

    this.connectedPromise = new Promise<void>((resolve, reject) => {
      this.connection.addEventListener('datachannel', (ev) => {
        if (ev.channel.label !== rtcDataChannelName) return;

        console.log('!!!!!channel was received');
        this.dataChannel = ev.channel;
        this.dataChannel.onmessage = (ev) => {
          console.log(ev, this.onMessage);
          this.onMessage?.(JSON.parse(ev.data));
        };
        // console.log('$connected');
        // resolve();
      });
      this.connection.addEventListener('connectionstatechange', () => {
        console.log('connectionstatechange', this.connection.connectionState);
        if (this.connection.connectionState === 'connected') {
          resolve();
        }
        if (this.connection.connectionState === 'failed') {
          reject(new Error('Connection status failed'));
        }
      });
    });

    this.gatheringStateReadyPromise = new Promise<void>((resolve) => {
      this.connection.addEventListener('icegatheringstatechange', () => {
        if (this.connection.iceGatheringState === 'complete') {
          resolve();
        }
      });
    });
  }

  createDataChannel(): void {
    console.log('datachannel');
    this.dataChannel = this.connection.createDataChannel(rtcDataChannelName, rtcDataChannelInit);
    this.dataChannel.onmessage = (ev) => {
      console.log(ev, this.onMessage);
      this.onMessage?.(JSON.parse(ev.data));
    };
  }

  async getIceCandidates(): Promise<RTCIceCandidate[]> {
    console.log('$get ices');
    await this.gatheringStateReadyPromise;
    return this.iceCandidates;
  }

  async setIceCandidates(candidates: RTCIceCandidateInit[]) {
    console.log('$set ices');
    for (const candidate of candidates) {
      try {
        await this.connection.addIceCandidate(candidate);
      } catch (e) {}
    }
  }

  async createLocalOffer(): Promise<RTCSessionDescriptionInit> {
    console.log('$createLocalOffer');
    const offer = await this.connection.createOffer(rtcOfferOptions);
    await this.connection.setLocalDescription(offer);
    console.log(offer);
    return offer;
  }

  async createLocalAnswer(): Promise<RTCSessionDescriptionInit> {
    console.log('$createLocalAnswer');
    const answer = await this.connection.createAnswer();
    await this.connection.setLocalDescription(answer);
    return answer;
  }

  async setRemoteOffer(offer: RTCSessionDescriptionInit) {
    console.log('$setRemoteOffer');
    await this.connection.setRemoteDescription(offer);
  }

  async setRemoteAnswer(answer: RTCSessionDescriptionInit) {
    console.log('$setRemoteAnswer');
    await this.connection.setRemoteDescription(answer);
  }
}
