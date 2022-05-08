import { Directions } from '../types/Tank';

import { TGameState } from './game-state';

export type TPlayerAction = { type: 'toServer' } | { type: 'fire' } | { type: 'move'; direction: Directions };

export type TServerResponse = { type: 'gameState'; state: TGameState } | { type: 'start' } | { type: 'ping' };
