import { CardPerson, CardStarship, PlayerModel } from './battler.state';
import {
  addScoreToPlayer,
  cardIsPerson,
  cardIsShip,
  comparePlayersCards,
  getWinnerPlayer,
  mapCardsToPlayers,
} from './battler.utils';

describe('battler.utils.ts', () => {
  describe('cardIsPerson', () => {
    it('should return false', () => {
      expect(cardIsPerson({ type: 'starships' } as CardStarship)).toEqual(
        false,
      );
    });
    it('should return true', () => {
      expect(cardIsPerson({ type: 'people' } as CardPerson)).toEqual(true);
    });
  });

  describe('cardIsShip', () => {
    it('should return true', () => {
      expect(cardIsShip({ type: 'starships' } as CardStarship)).toEqual(true);
    });
    it('should return false', () => {
      expect(cardIsShip({ type: 'people' } as CardPerson)).toEqual(false);
    });
  });

  describe('comparePlayersCards', () => {
    describe('cards people', () => {
      const getMockPlayer = (id: number, mass: number): PlayerModel =>
        ({
          id,
          score: 0,
          card: { type: 'people', properties: { mass } },
        }) as PlayerModel;

      it('should win p1', () => {
        expect(
          comparePlayersCards(getMockPlayer(1, 10), getMockPlayer(2, 5))?.id,
        ).toEqual(1);
      });
      it('should win p2', () => {
        expect(
          comparePlayersCards(getMockPlayer(1, 1), getMockPlayer(2, 5))?.id,
        ).toEqual(2);
      });
      it('should draw', () => {
        expect(
          comparePlayersCards(getMockPlayer(1, 1), getMockPlayer(2, 1)),
        ).toEqual(null);
      });
    });

    describe('cards starships', () => {
      const getMockPlayer = (id: number, crew: number): PlayerModel =>
        ({
          id,
          score: 0,
          card: { type: 'starships', properties: { crew } },
        }) as PlayerModel;

      it('should win p1', () => {
        expect(
          comparePlayersCards(getMockPlayer(1, 10), getMockPlayer(2, 5))?.id,
        ).toEqual(1);
      });
      it('should win p2', () => {
        expect(
          comparePlayersCards(getMockPlayer(1, 1), getMockPlayer(2, 5))?.id,
        ).toEqual(2);
      });
      it('should draw', () => {
        expect(
          comparePlayersCards(getMockPlayer(1, 1), getMockPlayer(2, 1)),
        ).toEqual(null);
      });
    });
  });

  it('getWinnerPlayer should works', () => {
    const p1 = {
      id: 1,
      score: 0,
      card: { type: 'people', properties: { mass: 5 } },
    } as PlayerModel;
    const p2 = {
      id: 1,
      score: 0,
      card: { type: 'people', properties: { mass: 10 } },
    } as PlayerModel;
    expect(getWinnerPlayer([p1, p2])).toEqual(p2);
  });

  it('addScoreToPlayer should works', () => {
    expect(
      addScoreToPlayer(
        [
          { id: 1, score: 0, card: null },
          { id: 2, score: 0, card: null },
        ],
        1,
      ),
    ).toEqual([
      { id: 1, score: 1, card: null },
      { id: 2, score: 0, card: null },
    ]);
  });

  it('mapCardsToPlayers should works', () => {
    expect(
      mapCardsToPlayers(
        [
          {
            id: 1,
            score: 0,
            card: null,
          },
        ],
        [
          {
            uid: '123',
            type: 'people',
          } as CardPerson,
        ],
      ),
    ).toEqual([
      {
        id: 1,
        score: 0,
        card: { uid: '123', type: 'people' } as CardPerson,
      },
    ]);
  });
});
