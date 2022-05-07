export const rtcPeerConfig: RTCConfiguration = { iceServers: [{ urls: ['stun:stun.l.google.com:19302'] }] };
export const rtcDataChannelInit: RTCDataChannelInit = { ordered: true };
export const rtcDataChannelName = 'data-channel';
export const rtcOfferOptions: RTCOfferOptions = {};

export class PlayerConnection {
  private connection!: RTCPeerConnection;
  private dataChannel!: RTCDataChannel;
  private iceCandidates: RTCIceCandidate[] = [];
  private gatheringStateReadyPromise!: Promise<void>;

  initConnection() {
    this.connection = new RTCPeerConnection(rtcPeerConfig);

    this.connection.addEventListener('icecandidate', (ev) => {
      if (ev.candidate) {
        this.iceCandidates.push(ev.candidate);
      }
    });

    this.gatheringStateReadyPromise = new Promise<void>((resolve) => {
      this.connection.addEventListener('icegatheringstatechange', () => {
        if (this.connection.iceGatheringState === 'complete') {
          resolve();
        }
      });
    });

    this.connection.addEventListener('datachannel', (ev) => {
      this.dataChannel = ev.channel;
    });
  }

  createDataChannel(): void {
    this.dataChannel = this.connection.createDataChannel(rtcDataChannelName, rtcDataChannelInit);
  }

  async getIceCandidates(): Promise<RTCIceCandidate[]> {
    await this.gatheringStateReadyPromise;
    return this.iceCandidates;
  }

  async setIceCandidates(candidates: RTCIceCandidateInit[]) {
    for (const candidate of candidates) {
      await this.connection.addIceCandidate(candidate);
    }
  }

  async createLocalOffer(): Promise<RTCSessionDescriptionInit> {
    const offer = await this.connection.createOffer(rtcOfferOptions);
    await this.connection.setLocalDescription(offer);
    return offer;
  }

  async createLocalAnswer(): Promise<RTCSessionDescriptionInit> {
    const answer = await this.connection.createAnswer();
    await this.connection.setLocalDescription(answer);
    return answer;
  }

  async setRemoteOffer(offer: RTCSessionDescriptionInit) {
    await this.connection.setRemoteDescription(offer);
  }

  async setRemoteAnswer(answer: RTCSessionDescriptionInit) {
    await this.connection.setRemoteDescription(answer);
  }
}
