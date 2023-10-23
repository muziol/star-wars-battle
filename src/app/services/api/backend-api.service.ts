import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { mapPerson, mapStarship } from './backend-api.utils';
import {
  DataType,
  APIResponse,
  APIPerson,
  APIStarship,
} from '../backend.interface';
import { CardPerson, CardStarship } from 'src/app/store/battler';

@Injectable({
  providedIn: 'root',
})
export class BackendAPIService {
  private readonly swapiUrl = 'https://www.swapi.tech/api';

  constructor(private readonly http: HttpClient) {}

  public getListType(
    type: DataType,
    page: number = 1,
    limit: number = 10,
  ): Observable<APIResponse> {
    return this.http
      .get<any>(`${this.swapiUrl}/${type}?page=${page}&limit=${limit}`)
      .pipe(
        map((result) => {
          const { total_records, total_pages, results: records } = result;
          return { total_records, total_pages, records, page, limit };
        }),
      );
  }

  public getPerson(uid: number | string): Observable<CardPerson> {
    return this.http
      .get<{ result: APIPerson }>(`${this.swapiUrl}/people/${uid}`)
      .pipe(
        map((res) => {
          const { result } = res;

          return result;
        }),
        map(mapPerson),
      );
  }

  public getStarship(uid: number | string): Observable<CardStarship> {
    return this.http
      .get<{ result: APIStarship }>(`${this.swapiUrl}/starships/${uid}`)
      .pipe(
        map((res) => {
          const { result } = res;

          return result;
        }),
        map(mapStarship),
      );
  }
}
