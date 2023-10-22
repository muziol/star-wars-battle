import { PlayerModel } from '../../../store/battler/battler.state';
import { BattleStatusType } from './player.component';

export const getPlayerStatus = (
  player: PlayerModel,
  wonPlayerId: number | null,
  gameInProgress: boolean,
): BattleStatusType => {
  if (gameInProgress) {
    return 'none';
  }
  if (player.card === null) {
    return 'none';
  }
  if (wonPlayerId === null) {
    return 'tie';
  }
  if (player.id === wonPlayerId) {
    return 'win';
  }
  return 'loose';
};

export const getStatusTitle = (status: BattleStatusType): string => {
  switch (status) {
    case 'win':
      return 'Winner';

    case 'loose':
      return 'Looser';

    case 'tie':
      return 'Draw';

    case 'none':
    default:
      return '';
  }
};
