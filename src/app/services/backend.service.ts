import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, switchMap, map } from 'rxjs';
import { getRandomId } from './backend.service.utils';

type DataType = 'people' | 'starships';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  private swapiUrl = 'https://www.swapi.tech/api/';

  constructor(private readonly http: HttpClient) { }

  private getListLengthOfType(type: DataType): Observable<number> {
    return this.http.get<any>(this.swapiUrl + type).pipe(
      map(result => result.total_records)
    );
  }

  private getElementOfType(type: DataType, uid: number): Observable<any> {
    return this.http.get<any>(`${this.swapiUrl + type}/${uid}`);
  }

  public getRandomElementOfType(type: DataType = 'people'): Observable<any> {
    return this.getListLengthOfType(type).pipe(
      switchMap(listLength => {
        const id = getRandomId(1, listLength + 1);

        return this.getElementOfType(type, id);
      })
    )
  }
}
