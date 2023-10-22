import { CardPerson, CardStarship } from 'src/app/store/battler/battler.state';
import { APIPerson, APIStarship } from '../backend.service';

export const mapPerson = (person: APIPerson): CardPerson => {
  const { uid, description, properties } = person;
  const { height = 0, mass = 0, name, hair_color, homeworld, url } = properties;
  return {
    type: 'people',
    uid,
    description,
    properties: {
      height: height !== 'unknown' ? Number(height) : 0,
      mass: mass !== 'unknown' ? Number(mass) : 0,
      name,
      hair_color,
      homeworld,
      url,
    },
  };
};

export const mapStarship = (ship: APIStarship): CardStarship => {
  const { uid, description, properties } = ship;
  const { crew = 0, passengers = 0, pilots, name, url } = properties;
  return {
    type: 'starships',
    uid,
    description,
    properties: {
      // eg. 'unknown', '16-76', '5'
      crew: crew !== 'unknown' ? Number(crew) : 0,
      passengers: passengers !== 'unknown' ? Number(passengers) : 0,
      pilots,
      name,
      url,
    },
  };
};
