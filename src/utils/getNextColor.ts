import { PlayerColors } from '../constants/PlayerColors';

function* generateColors(): Generator<PlayerColors> {
  while (true) {
    yield PlayerColors.red;
    yield PlayerColors.orange;
    yield PlayerColors.yellow;
    yield PlayerColors.green;
    yield PlayerColors.blue;
    yield PlayerColors.violet;
    yield PlayerColors.black;
    yield PlayerColors.white;
  }
}

const colorsGenerator = generateColors();

export function getNextColor(): PlayerColors {
  return colorsGenerator.next().value;
}
