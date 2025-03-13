import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  constructor(private _http: HttpClient) {}

  fetchMap(): Observable<string[][]> {
    return this._http.get<string[][]>('http://localhost:3000/map');
  }
}
