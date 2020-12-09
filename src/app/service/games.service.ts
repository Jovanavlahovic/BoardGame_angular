import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Game, GameList } from '../games/model/game.model';

const baseUrl = 'http://localhost:3000/api/games';

@Injectable({
  providedIn: 'root'
})
export class GamesService {

  constructor(private http: HttpClient) { }

  getGames(params?): Observable<GameList>{
     let queryParams = {};

    if(params){
      queryParams = { params: new HttpParams()
        .set('page', params.page && params.page.toString() || '')
        .set('pageSize', params.pageSize && params.pageSize.toString() || '')
        .set('filter', params.filter && JSON.stringify(params.filter) || '')
      }
    }
    return this.http.get(baseUrl, queryParams).pipe(map((x:any) => new GameList(x)))
  }

  getGame(id:number): Observable<Game>{
    return this.http.get(`${baseUrl}/${id}`).pipe(map(x => new Game(x)))
  }

  getCategories(): Observable<string[]> {
    return this.http.get('http://localhost:3000/api/categories').pipe(map(x => x as Array<string>))
  }

  updateGame(game: Game): Observable<Game>{
    return this.http.put(`${baseUrl}/${game._id}`, game).pipe(map(x => new Game(x)))
  }
  
  addGame(game: Game): Observable<Game>{
    return this.http.post(baseUrl, game).pipe(map(x => new Game(x)))
  }
}
