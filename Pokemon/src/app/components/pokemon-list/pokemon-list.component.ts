import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const imageBaseUrl = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/"
const png = ".png"

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css'],
})
export class PokemonListComponent implements OnInit {
  pokemons: any = [];
  
  constructor(private http: HttpClient) {}


  ngOnInit() {
    this.http
      .get('https://pokeapi.co/api/v2/pokemon?limit=151&offset=0')
      .subscribe((data: any) => {
        this.pokemons = data.results.map((pokemon: any) => {
          let parts = pokemon.url.split('/');
          let id = parts[parts.length - 2];
          let imageUrl = imageBaseUrl + id + png;
          let name = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1).toLowerCase();
          this.http

          return { ...pokemon, id: +id, name: name, image: imageUrl};
        });
      });

  }
  
}
