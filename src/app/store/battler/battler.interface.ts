import { DataType, APIRecord } from 'src/app/services/backend.interface';

export interface CardCommon {
  uid: string;
  type: DataType;
  description: string;
}

export interface StarshipProps {
  crew: number;
  passengers: number;
  pilots: string[];
  name: string;
  url: string;
}
export interface PersonProps {
  height: number;
  mass: number;
  name: string;
  hair_color: string;
  homeworld: string;
  url: string;
}

export interface CardStarship extends CardCommon {
  type: 'starships';
  properties: StarshipProps;
}
export interface CardPerson extends CardCommon {
  type: 'people';
  properties: PersonProps;
}

export interface PlayerModel {
  id: number;
  score: number;
  card: CardStarship | CardPerson | null;
}

export interface CachedData {
  total: number | null;
  pages: number | null;
  records: APIRecord[];
}

export interface BattlerStateModel {
  dataType: DataType;
  players: PlayerModel[];
  lastWinnerId: number | null;
  inProgress: boolean;
  peopleData: CachedData;
  starshipsData: CachedData;
}
