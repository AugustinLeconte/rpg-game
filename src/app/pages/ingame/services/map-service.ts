import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  private map = new BehaviorSubject<string[][]>([]);
  map$ = this.map.asObservable();

  constructor(private _http: HttpClient) {}

  fetchMap(): Observable<string[][]> {
    return this._http.get<string[][]>(environment.misericordiaAPIURI + 'map');
  }

  getMap(): string[][] {
    return this.map.value;
  }

  setMap(map: string[][]) {
    this.map.next(map);
  }
}
