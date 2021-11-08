
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Hero } from './models/hero';
import { Villain } from './models/villain';
import { Result } from './models/result';
import { Game } from './models/game';

@Injectable({
  providedIn: 'root'
})
export class HeroGameService {
  private jsonURL = "http://localhost:3000/"
  constructor(private _http: HttpClient) { }
  //retrieves from json server

  GetHeroes(): Observable<Hero[]> {
    const url = this.jsonURL + "heroes"
    return this._http.get<Hero[]>(url);
  }
  getAllVillains(): Observable<Villain[]> {
    const url = this.jsonURL + "villains"
    return this._http.get<Villain[]>(url);
  }
    getResults(): Observable<Result[]> {
      const url = this.jsonURL + "game"
      return this._http.get<Result[]>(url);
    }

    postResults(result): Observable<Result> {
      return this._http.post<Result>(this.jsonURL + "game", result);
    }
  }

