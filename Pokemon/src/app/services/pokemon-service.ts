import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const imageBaseUrl = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/"
const png = ".png"

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor(private http: HttpClient) { }

  getPokemons(): Observable<any[]> {
    return this.http.get('https://pokeapi.co/api/v2/pokemon?limit=151&offset=0').pipe(
      map((data: any) => {
        return data.results.map((pokemon: any) => {
          let parts = pokemon.url.split('/');
          let id = parts[parts.length - 2];
          let imageUrl = imageBaseUrl + id + png;
          let name = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1).toLowerCase();

          return { ...pokemon, id: +id, name: name, image: imageUrl};
        });
      })
    );
  }
}
