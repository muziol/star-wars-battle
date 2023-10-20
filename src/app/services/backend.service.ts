import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';

type DataType = 'people' | 'starships';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  private swapiUrl = 'https://www.swapi.tech/api/';

  constructor(private http: HttpClient) {}

  private getListOfType(type: DataType = 'people'): Observable<any[]> {
    return this.http.get<any[]>(this.swapiUrl + type);
  }
}
