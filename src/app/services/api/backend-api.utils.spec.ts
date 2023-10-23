import { APIPerson, APIStarship } from '../backend.service';
import { mapPerson, mapStarship } from './backend-api.utils';

describe('backend-api.utils.ts', () => {
  describe('mapPerson', () => {
    const mockedPerson: APIPerson = {
      __v: 0,
      _id: '1-2-3',
      uid: '1',
      description: 't1',
      properties: {
        height: 'unknown',
        mass: 'unknown',
        hair_color: 'brown',
        skin_color: '',
        eye_color: '',
        birth_year: '',
        gender: '',
        created: '',
        edited: '',
        name: 'test',
        homeworld: 'test1',
        url: '',
      },
    };
    it('should return CardPerson with unknown', () => {
      expect(mapPerson(mockedPerson)).toEqual({
        type: 'people',
        uid: '1',
        description: 't1',
        properties: {
          height: 0,
          mass: 0,
          name: 'test',
          hair_color: 'brown',
          homeworld: 'test1',
          url: '',
        },
      });
    });
    it('should return CardPerson with number', () => {
      expect(
        mapPerson({
          ...mockedPerson,
          properties: { ...mockedPerson.properties, height: '10', mass: '25' },
        }),
      ).toEqual({
        type: 'people',
        uid: '1',
        description: 't1',
        properties: {
          height: 10,
          mass: 25,
          name: 'test',
          hair_color: 'brown',
          homeworld: 'test1',
          url: '',
        },
      });
    });
  });

  describe('mapStarship', () => {
    const mockedPerson: APIStarship = {
      __v: 0,
      _id: '1-2-3',
      uid: '1',
      description: 't1',
      properties: {
        model: '',
        starship_class: '',
        manufacturer: '',
        cost_in_credits: '',
        length: '',
        crew: 'unknown',
        passengers: 'unknown',
        max_atmosphering_speed: '',
        hyperdrive_rating: '',
        MGLT: '',
        cargo_capacity: '',
        consumables: '',
        pilots: ['1'],
        created: '',
        edited: '',
        name: 'name',
        url: 'url',
      },
    };
    it('should return CardPerson with unknown', () => {
      expect(mapStarship(mockedPerson)).toEqual({
        type: 'starships',
        uid: '1',
        description: 't1',
        properties: {
          crew: 0,
          passengers: 0,
          pilots: ['1'],
          name: 'name',
          url: 'url',
        },
      });
    });
    it('should return CardPerson with number', () => {
      expect(
        mapStarship({
          ...mockedPerson,
          properties: {
            ...mockedPerson.properties,
            crew: '1,000',
            passengers: '22',
          },
        }),
      ).toEqual({
        type: 'starships',
        uid: '1',
        description: 't1',
        properties: {
          crew: 1000,
          passengers: 22,
          pilots: ['1'],
          name: 'name',
          url: 'url',
        },
      });
    });
  });
});
