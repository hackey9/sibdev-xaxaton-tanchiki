import { action, makeObservable, observable } from 'mobx';

import { createExternalPromise } from '../utils/externalPromise';
import { newPlayerId } from '../utils/newPlayerId';

import { PlayerConnection } from './connections';
import { TGameState, IGameStateReducer } from './game-state';
import { TServerResponse, TPlayerAction } from './messages';

export interface IServer {
  readonly state: TGameState;
  send(message: TPlayerAction): void;
}

export class RemoteServer implements IServer {
  private readonly peer: PlayerConnection<TPlayerAction, TServerResponse>;
  state: TGameState;
  connectedPromise: Promise<void>;
  startedPromise!: Promise<void>;

  onConnect?: VoidFunction;
  private readonly resolveStart: VoidFunction;

  constructor(peer: PlayerConnection<TPlayerAction, TServerResponse>) {
    makeObservable(this, {
      state: observable,
      onConnect: observable,
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
      case 'ping':
        alert('ping from remote');
        break;
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

  private getInitialGameState(): TGameState {
    return { blocks: [], isEnd: false, tanks: [] };
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
  }
}

class RemoteClient {
  private readonly localServer: LocalServer;
  readonly peer: PlayerConnection<TServerResponse, TPlayerAction>;
  private readonly playerId: string;

  constructor(localServer: LocalServer, playerId: string, peer: PlayerConnection<TServerResponse, TPlayerAction>) {
    this.localServer = localServer;
    this.peer = peer;
    this.playerId = playerId;

    makeObservable(this, {
      onMessage: action.bound,
    });

    this.peer.onMessage = this.onMessage;
  }

  send(data: TServerResponse) {
    this.peer.send(data);
  }

  onMessage(action: TPlayerAction) {
    this.localServer.handleActionFrom(this.playerId, action);
  }
}
