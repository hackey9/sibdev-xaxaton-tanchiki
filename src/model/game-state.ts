import { TPlayerAction } from './messages';

export interface TGameState {
  // TODO
  blocks: Array<{
    position: { x: number; y: number };
    destroyable: boolean;
  }>;
  tanks: Array<{
    playerId: string;
    position: { x: number; y: number };
    lastMoveTime: number;
    health: number;
  }>;
  // hits: [];
  isEnd: boolean;
}

export interface IGameStateReducer {
  (state: TGameState, playerId: string, action: TPlayerAction): TGameState;
}

export function __stubGameStateReducer(state: TGameState, playerId: string, action: TPlayerAction): TGameState {
  switch (action.type) {
    case 'fire':
      // TODO
      break;
  }
  return state;
}
