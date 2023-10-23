import { CardPerson, PlayerModel } from 'src/app/store/battler';
import { getPlayerStatus, getStatusTitle } from './player.utils';

describe('player.utils.ts', () => {
  describe('getPlayerStatus', () => {
    const mockedPlayer: PlayerModel = {
      id: 1,
      score: 0,
      card: {} as CardPerson,
    };
    it('should return none', () => {
      expect(getPlayerStatus(mockedPlayer, null, true)).toEqual('none');
    });
    it('should return none', () => {
      expect(
        getPlayerStatus({ ...mockedPlayer, card: null }, null, false),
      ).toEqual('none');
    });
    it('should return tie', () => {
      expect(getPlayerStatus(mockedPlayer, null, false)).toEqual('tie');
    });
    it('should return win', () => {
      expect(getPlayerStatus(mockedPlayer, 1, false)).toEqual('win');
    });
    it('should return loose', () => {
      expect(getPlayerStatus(mockedPlayer, 2, false)).toEqual('loose');
    });
  });

  describe('getStatusTitle', () => {
    it('should return Winner', () => {
      expect(getStatusTitle('win')).toEqual('Winner');
    });
    it('should return Looser', () => {
      expect(getStatusTitle('loose')).toEqual('Looser');
    });
    it('should return Draw', () => {
      expect(getStatusTitle('tie')).toEqual('Draw');
    });
    it('should return ""', () => {
      expect(getStatusTitle('none')).toEqual('');
    });
  });
});
