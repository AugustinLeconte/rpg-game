import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  private map = new BehaviorSubject<string[][]>([]);
  map$ = this.map.asObservable();

  constructor(private _http: HttpClient) {}

  fetchMap(): Observable<string[][]> {
    return this._http.get<string[][]>('http://localhost:3000/map');
  }

  setMap(map: string[][]) {
    this.map.next(map);
  }
}
