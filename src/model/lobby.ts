import { PlayerColors } from '../constants/PlayerColors';

import { PlayerConnection } from './connections';

export class LobbyPlayer {
  readonly uuid: string;
  readonly connection: PlayerConnection;
  readonly color: PlayerColors;

  constructor(uuid: string, connection: PlayerConnection, color: PlayerColors) {
    this.uuid = uuid;
    this.connection = connection;
    this.color = color;
  }
}
