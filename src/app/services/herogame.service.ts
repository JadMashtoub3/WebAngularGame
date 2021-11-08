import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Hero } from '../models/hero';
import { Villain } from '../models/villain';
import { Result } from '../models/result';

@Injectable({
  providedIn: 'root'
})
export class HeroGameService {
  readonly jsonURL: string = 'http://localhost:3000/'
  constructor(private _http: HttpClient) { }
//heroes
  getHeroes(): Observable<Hero[]> {
    const url = this.jsonURL + "hero"
    return this._http.get<Hero[]>(url);
  }
//villains
  getVillains(): Observable<Villain[]> {
    const url = this.jsonURL + "villain"
    return this._http.get<Villain[]>(url);
  }
//results
  getResults(): Observable<Result[]> {
    const url = this.jsonURL + "game"
    return this._http.get<Result[]>(url);
  }
  postResults(result): Observable<Result> {
    return this._http.post<Result>(this.jsonURL + "game", result);}
}

