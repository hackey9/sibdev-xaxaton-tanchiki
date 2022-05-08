export function createQrCode<T>(data: T): string {
  return JSON.stringify(data);
}

export function parseQrCode<T>(code: string): T {
  return JSON.parse(code);
}

export type TOfferQrCode = {
  id: string;
  offer: RTCSessionDescriptionInit;
  ices: RTCIceCandidate[];
};

export type TAnswerQrCode = {
  answer: RTCSessionDescriptionInit;
  ices: RTCIceCandidate[];
};
