import { Injectable } from '@angular/core';
import { Observable, switchMap, of, forkJoin, catchError, tap } from 'rxjs';
import {
  APIRecord,
  CachedData,
  CardPerson,
  CardStarship,
} from '../store/battler';
import { APIResponse, BackendAPIService } from './api/backend-api.service';
import { getRandomIndexesFromList } from './backend.service.utils';

type DataType = 'people' | 'starships';

interface APIStarshipProps {
  model: string;
  starship_class: string;
  manufacturer: string;
  cost_in_credits: string;
  length: string;
  crew: string;
  passengers: string;
  max_atmosphering_speed: string;
  hyperdrive_rating: string;
  MGLT: string;
  cargo_capacity: string;
  consumables: string;
  pilots: string[];
  created: string;
  edited: string;
  name: string;
  url: string;
}
interface APIPersonProps {
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  created: string;
  edited: string;
  name: string;
  homeworld: string;
  url: string;
}

export interface APICommonProps {
  __v: number;
  _id: string;
  uid: string;
  description: string;
}

export interface APIPerson extends APICommonProps {
  properties: APIPersonProps;
}
export interface APIStarship extends APICommonProps {
  properties: APIStarshipProps;
}

@Injectable({
  providedIn: 'root',
})
export class BackendService {
  constructor(private readonly backendAPIService: BackendAPIService) {}

  private getRecordProps(
    type: DataType,
    uid: number | string,
  ): Observable<CardStarship | CardPerson> {
    if (type === 'starships') {
      return this.backendAPIService.getStarship(uid);
    }

    return this.backendAPIService.getPerson(uid);
  }

  public getListTypeWithCache(
    type: DataType,
    numberCards: number,
    cache: CachedData,
  ): Observable<APIResponse & { randomIndexes: number[] }> {
    let obs: Observable<APIResponse>;
    if (
      cache.total !== null &&
      cache.total > 0 &&
      cache.pages !== null &&
      cache.pages > 0
    ) {
      obs = of({
        total_records: cache.total,
        total_pages: cache.pages,
        records: cache.records,
      });
    } else {
      obs = this.backendAPIService.getListType(type);
    }

    return obs.pipe(
      switchMap((res) => {
        const randomIndexes = getRandomIndexesFromList(
          numberCards,
          0,
          res.total_records,
        );
        const newRecords: Observable<APIResponse>[] = [];

        randomIndexes.forEach((index) => {
          if (!res.records[index]) {
            newRecords.push(
              this.backendAPIService.getListType(type, index + 1, 1),
            );
          }
        });

        return forkJoin({
          res: of(res),
          randomIndexes: of(randomIndexes),
          newRecords: forkJoin(newRecords),
        });
      }),
      switchMap(({ res, randomIndexes, newRecords }) => {
        const { total_pages, total_records, records } = res;

        const newArray = [...records];

        newRecords.forEach(({ page = 0, records: elements }) => {
          newArray[page - 1] = elements[0];
        });

        return of({
          total_pages,
          total_records,
          records: newArray,
          randomIndexes,
        });
      }),
    );
  }

  public getRandomCards(
    type: DataType,
    records: APIRecord[],
    randomCardsIndexes: number[],
  ): Observable<(CardPerson | CardStarship)[]> {
    const cards: Observable<CardStarship | CardPerson>[] = [];

    randomCardsIndexes.forEach((index) => {
      cards.push(this.getRecordProps(type, records[index].uid));
    });

    return forkJoin(cards);
  }
}
