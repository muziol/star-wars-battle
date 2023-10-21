import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, switchMap, map, of, forkJoin } from 'rxjs';
import { getIndexListFromRandomNum, mapPerson, mapStarship } from './backend.service.utils';
import { CardPerson, CardStarship } from '../store/battler/battler.state';

type DataType = 'people' | 'starships';

interface APIRecord {
  uid: string;
  name: string;
  url: string;
}

interface APIResponse {
  total_records: number;
  total_pages: number;
  records: APIRecord[];
}

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
  providedIn: 'root'
})
export class BackendService {

  private swapiUrl = 'https://www.swapi.tech/api';

  constructor(private readonly http: HttpClient) { }

  private getListType(type: DataType, page: number = 1, limit: number = 10): Observable<APIResponse> {
    return this.http.get<any>(`${this.swapiUrl}/${type}?page=${page}&limit=${limit}`).pipe(
      map(result => {
        const { total_records, total_pages, results: records } = result;
        return { total_records, total_pages, records };
      })
    );
  }

  private getPerson(uid: number | string): Observable<CardPerson> {
    return this.http.get<{ result: APIPerson }>(`${this.swapiUrl}/people/${uid}`).pipe(
      map(res => {
        const { result } = res;

        return result;
      }),
      map(mapPerson)
    )
  }

  private getStarship(uid: number | string): Observable<CardStarship> {
    return this.http.get<{ result: APIStarship }>(`${this.swapiUrl}/starships/${uid}`).pipe(
      map(res => {
        const { result } = res;

        return result;
      }),
      map(mapStarship)
    )
  }

  private getRecordProps(type: DataType, uid: number | string): Observable<CardStarship | CardPerson> {
    if (type === 'starships') {
      return this.getStarship(uid);
    }

    return this.getPerson(uid);
  }

  private getRandomElementOfType(type: DataType): Observable<CardStarship | CardPerson> {
    const randomNum = Math.random();

    return this.getListType(type).pipe(
      switchMap(({ total_records, records }) => {
        const randomIndex = getIndexListFromRandomNum(randomNum, 0, total_records);

        if (randomIndex < records.length - 1) {
          return of({ records: [records[randomIndex]] });
        }

        return this.getListType(type, randomIndex + 1, 1);
      }),
      switchMap(({ records }) => this.getRecordProps(type, records[0].uid)),
    )
  }

  public getRandomCards(type: DataType = 'people', numberCards: number): Observable<Array<CardStarship | CardPerson>> {
    const cards = [];
    for (let i = 0; i < numberCards; i++) {
      cards.push(this.getRandomElementOfType(type));
    }
    return forkJoin(cards);
  }
}
