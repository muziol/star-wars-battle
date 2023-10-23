import { PlayerModel } from '../../../store/battler/battler.state';
import { BattleStatusType } from './player.component';

export const getPlayerStatus = (
  player: PlayerModel,
  wonPlayerId: number | null,
  gameInProgress: boolean,
): BattleStatusType => {
  switch (true) {
    case gameInProgress || player.card === null:
      return 'none';
    case wonPlayerId === null:
      return 'tie';
    case player.id === wonPlayerId:
      return 'win';
    default:
      return 'loose';
  }
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
