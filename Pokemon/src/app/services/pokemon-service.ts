import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Pokemon } from '../models/pokemon';

const imageBaseUrl = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/"
const png = ".png"

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor(private http: HttpClient) { }

  
  getPokemons( offset: number, limit: number,): Observable<Pokemon[]> {
    return this.http.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`).pipe(
      map((data: any) => {
        let newPokemons = data.results.map((pokemon: any) => {
          let parts = pokemon.url.split('/');
          let id = parts[parts.length - 2];
          let imageUrl = imageBaseUrl + id + png;
          let name = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1).toLowerCase();

          return { ...pokemon, id: +id, name: name, image: imageUrl} as Pokemon[];
        });
        return newPokemons;
      })
    );
  }

  getPokemonDetails(name: string) {
    return this.http.get<Pokemon>('https://pokeapi.co/api/v2/pokemon/' + name)
      .pipe(
        map((response: any) => {
          const capitalize = (s: string) => s && s[0].toUpperCase() + s.slice(1);
          const pokemonDetails: Pokemon = {
            id: response.id,
            image: imageBaseUrl + response.id + png,
            name: capitalize(response.name),
            types: response.types.map((typeData: any) => capitalize(typeData.type.name)),
            weight: response.weight,
            height: response.height,
            hp: response.stats.find((stat: any) => stat.stat.name === 'hp').base_stat,
            attack: response.stats.find((stat: any) => stat.stat.name === 'attack').base_stat,
            defense: response.stats.find((stat: any) => stat.stat.name === 'defense').base_stat
          };
          return pokemonDetails
        })
      );
      
  }
}
