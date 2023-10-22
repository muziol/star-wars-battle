import { Injectable } from '@angular/core';
import { Observable, switchMap, of, forkJoin, catchError } from 'rxjs';
import { getIndexListFromRandomNum } from './backend.service.utils';
import { CardPerson, CardStarship } from '../store/battler/battler.state';
import { BackendAPIService } from './api/backend-api.service';
import { Store } from '@ngxs/store';

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
  constructor(
    private readonly backendAPIService: BackendAPIService,
    private readonly store: Store,
  ) {}

  private getRecordProps(
    type: DataType,
    uid: number | string,
  ): Observable<CardStarship | CardPerson> {
    if (type === 'starships') {
      return this.backendAPIService.getStarship(uid);
    }

    return this.backendAPIService.getPerson(uid);
  }

  private getRandomElementOfType(
    type: DataType,
  ): Observable<CardStarship | CardPerson> {
    const randomNum = Math.random();

    return this.backendAPIService.getListType(type).pipe(
      switchMap(({ total_records, records }) => {
        const randomIndex = getIndexListFromRandomNum(
          randomNum,
          0,
          total_records,
        );

        if (randomIndex < records.length - 1) {
          return of({ records: [records[randomIndex]] });
        }

        return this.backendAPIService.getListType(type, randomIndex + 1, 1);
      }),
      switchMap(({ records }) => this.getRecordProps(type, records[0].uid)),
      catchError((err) => {
        console.log(err);
        // TODO: catch error
        return of();
      }),
    );
  }

  public getRandomCards(
    type: DataType = 'people',
    numberCards: number,
  ): Observable<Array<CardStarship | CardPerson>> {
    const cards = [];
    for (let i = 0; i < numberCards; i++) {
      cards.push(this.getRandomElementOfType(type));
    }
    return forkJoin(cards);
  }
}
