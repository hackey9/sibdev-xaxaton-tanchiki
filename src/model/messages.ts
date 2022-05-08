import { TGameState } from './game-state';

export type TPlayerAction = { type: 'toServer' } | { type: 'fire' };

export type TServerResponse = { type: 'gameState'; state: TGameState } | { type: 'start' } | { type: 'ping' };
