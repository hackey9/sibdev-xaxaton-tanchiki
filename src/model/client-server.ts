import { action, makeObservable, observable } from 'mobx';

import { MAP_SIZE } from '../consts';
import { MAP } from '../consts/map';
import { Directions } from '../types/Tank';
import { createExternalPromise } from '../utils/externalPromise';
import { getNextColor } from '../utils/getNextColor';
import { newPlayerId } from '../utils/newPlayerId';

import { PlayerConnection } from './connections';
import { IGameStateReducer, TGameState } from './game-state';
import { TPlayerAction, TServerResponse } from './messages';

export interface IServer {
  readonly state: TGameState;
  send(message: TPlayerAction): void;
  readonly id: string;
}

export class RemoteServer implements IServer {
  private readonly peer: PlayerConnection<TPlayerAction, TServerResponse>;
  state: TGameState;
  connectedPromise: Promise<void>;
  startedPromise!: Promise<void>;

  private readonly resolveStart: VoidFunction;
  readonly id: string;

  constructor(peer: PlayerConnection<TPlayerAction, TServerResponse>, id: string) {
    this.id = id;

    makeObservable(this, {
      state: observable,
      onMessage: action.bound,
    });

    this.peer = peer;
    this.state = this.getInitialGameState();
    this.peer.onMessage = this.onMessage;
    this.connectedPromise = this.peer.connectedPromise;
    const { promise, resolveWith } = createExternalPromise<void>();
    this.startedPromise = promise;
    this.resolveStart = resolveWith;
  }

  private getInitialGameState(): TGameState {
    return { blocks: [], isEnd: false, tanks: [] };
  }

  send(message: TPlayerAction) {
    this.peer.send(message);
  }

  onMessage(response: TServerResponse) {
    switch (response.type) {
      case 'start':
        this.resolveStart();
        break;
      // case 'ping':
      //   alert('ping from remote');
      //   break;
      case 'gameState':
        this.state = response.state;
        break;

      // TODO: обработать все сообщения от сервера
      //  здесь может быть инфа по лобби, или исключение из игры
    }
  }
}

export class LocalServer implements IServer {
  private readonly gameStateReducer: IGameStateReducer;
  private readonly localPlayerId: string;
  private readonly localPlayerUsername: string;

  get id() {
    return this.localPlayerId;
  }

  readonly clients: RemoteClient[];
  state: TGameState;

  constructor(localUsername: string, gameStateReducer: IGameStateReducer) {
    this.localPlayerUsername = localUsername;
    this.gameStateReducer = gameStateReducer;
    this.localPlayerId = newPlayerId();
    this.clients = [];
    this.state = this.getInitialGameState();

    makeObservable(this, {
      clients: observable,
      state: observable,
    });
  }

  resetGameState() {
    this.state = this.getInitialGameState();
  }

  private getInitialGameState(): TGameState {
    const tanksCoordinates = [
      { x: 3, y: 1, direction: Directions.right, color: 'red' },
      { x: 3, y: MAP_SIZE - 2, direction: Directions.down, color: 'white' },
      { x: MAP_SIZE - 2, y: 1, direction: Directions.left, color: 'blue' },
      { x: 8, y: MAP_SIZE - 6, direction: Directions.up, color: 'yellow' },
    ];

    const playersNumber = this.clients.length;
    const TANK_HEALTH = 10;

    const tanks = tanksCoordinates.slice(0, playersNumber).map(({ x, y, direction, color }, index) => ({
      position: { x, y },
      playerId: this.clients[index].playerId,
      direction,
      health: TANK_HEALTH,
      lastMoveTime: 0,
      lastShootTime: 0,
      color: color,
    }));

    const coords = tanksCoordinates[playersNumber];
    tanks.push({
      playerId: this.localPlayerId,
      direction: coords.direction,
      position: { x: coords.x, y: coords.y },
      health: TANK_HEALTH,
      lastMoveTime: 0,
      lastShootTime: 0,
      color: 'yellow',
    });

    return { blocks: MAP.blocks, isEnd: false, tanks };
    // TODO добавить карту, добавить себя как игрока
  }

  send(action: TPlayerAction): void {
    this.handleActionFrom(this.localPlayerId, action);
  }

  broadcast(action: TServerResponse): void {
    this.clients.forEach((client) => {
      client.send(action);
    });
  }

  handleActionFrom(playerId: string, action: TPlayerAction): void {
    this.state = this.gameStateReducer(this.state, playerId, action);
    this.broadcast({ type: 'gameState', state: this.state });
  }

  addRemoteClient(playerId: string, peer: PlayerConnection<TServerResponse, TPlayerAction>): void {
    this.clients.push(new RemoteClient(this, playerId, peer));
    this.resetGameState();
  }
}

class RemoteClient {
  private readonly localServer: LocalServer;
  readonly peer: PlayerConnection<TServerResponse, TPlayerAction>;
  readonly playerId: string;
  readonly color: string;

  constructor(localServer: LocalServer, playerId: string, peer: PlayerConnection<TServerResponse, TPlayerAction>) {
    this.localServer = localServer;
    this.peer = peer;
    this.playerId = playerId;
    this.color = getNextColor();

    makeObservable(this, {
      onMessage: action.bound,
    });

    this.peer.onMessage = this.onMessage;
  }

  send(data: TServerResponse) {
    this.peer.send(data);
  }

  onMessage(action: TPlayerAction) {
    console.log(action, this.playerId);
    this.localServer.handleActionFrom(this.playerId, action);
  }
}
