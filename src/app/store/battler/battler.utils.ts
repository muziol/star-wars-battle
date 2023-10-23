import { CardStarship, CardPerson, PlayerModel } from './battler.interface';

export const cardIsPerson = (
  card: CardStarship | CardPerson,
): card is CardPerson => {
  return card.type === 'people';
};
export const cardIsShip = (
  card: CardStarship | CardPerson,
): card is CardStarship => {
  return card.type === 'starships';
};

// comparison rules
// for people - higher mass = better card
// for starshiops - more crew = better card
export const comparePlayersCards = (
  p1: PlayerModel,
  p2: PlayerModel,
): PlayerModel | null => {
  if (!p1.card || !p2.card) {
    return null;
  }

  if (p1.card.type === p2.card.type) {
    if (cardIsPerson(p1.card) && cardIsPerson(p2.card)) {
      if (p1.card.properties.mass > p2.card.properties.mass) {
        return p1;
      }
      if (p1.card.properties.mass < p2.card.properties.mass) {
        return p2;
      }
    }

    if (cardIsShip(p1.card) && cardIsShip(p2.card)) {
      if (p1.card.properties.crew > p2.card.properties.crew) {
        return p1;
      }
      if (p1.card.properties.crew < p2.card.properties.crew) {
        return p2;
      }
    }
  }

  return null;
};

export const getWinnerPlayer = (players: PlayerModel[]): PlayerModel | null => {
  let winner!: PlayerModel | null;

  players.forEach((p) => {
    if (!winner) {
      winner = p;
    } else {
      winner = comparePlayersCards(winner, p);
    }
  });

  return winner;
};

export const addScoreToPlayer = (
  players: PlayerModel[],
  scorePlayerId: number,
): PlayerModel[] => {
  return players.map((p) => {
    if (p.id !== scorePlayerId) {
      return p;
    }
    return { ...p, score: p.score + 1 };
  });
};

export const mapCardsToPlayers = (
  players: PlayerModel[],
  cards: (CardPerson | CardStarship)[],
): PlayerModel[] => {
  return players.map((p, index) => {
    return {
      ...p,
      card: cards[index],
    };
  });
};
