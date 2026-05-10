import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PokemonListService {
  constructor(private _http: HttpClient) { }

  getPokemonList(): Observable<any> {
    return this._http.get(`https://pokeapi.co/api/v2/pokemon`)
  }

  getPokemonByName(value: string): Observable<any> {
    return this._http.get(`https://pokeapi.co/api/v2/pokemon/${value}`)
  }
}
