import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, switchMap, map, of, forkJoin } from 'rxjs';
import { getIndexListFromRandomNum } from './backend.service.utils';

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

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  private swapiUrl = 'https://www.swapi.tech/api/';

  constructor(private readonly http: HttpClient) { }

  private getListType(type: DataType, page: number = 1, limit: number = 10): Observable<APIResponse> {
    return this.http.get<any>(`${this.swapiUrl + type}?page=${page}&limit=${limit}`).pipe(
      map(result => {
        const { total_records, total_pages, results: records } = result;
        return { total_records, total_pages, records };
      })
    );
  }

  private getRecordUID(type: DataType, uid: number | string): Observable<any> {
    return this.http.get<any>(`${this.swapiUrl + type}/${uid}`);
  }

  public getRandomElementOfType(type: DataType): Observable<any> {
    console.log('getRandomElementOfType');
    const randomNum = Math.random();

    return this.getListType(type).pipe(
      switchMap(({ total_records, records }) => {
        const randomIndex = getIndexListFromRandomNum(randomNum, 0, total_records);

        if (randomIndex < records.length - 1) {
          return of({ records: [records[randomIndex]] });
        }

        return this.getListType(type, randomIndex + 1, 1);
      }),
      switchMap(({ records }) => this.getRecordUID(type, records[0].uid)),
      map(res => res.result)
    )
  }

  public getRandomCards(type: DataType = 'people', numberCards: number): Observable<any[]> {
    const cards = [];
    for (let i = 0; i < numberCards; i++) {
      cards.push(this.getRandomElementOfType(type));
    }
    return forkJoin(cards);
  }
}
