import { Component, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon';
import { PokemonService } from 'src/app/services/pokemon-service';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css'],
})
export class PokemonListComponent implements OnInit {
  public pokemons: Pokemon[] = [];
  public currentPage: number = 0;
  public itemsPerPage: number = 48;
  public maxPages: number = 10;

  constructor(private readonly pokemonService: PokemonService) {}

  ngOnInit() {
    this.pageChanged(0);
  }

  pageChanged(newPage: number) {
    if (newPage < 0 || newPage >= this.maxPages) {
      console.error("Page doesn't exist, pagenmr: ", newPage);
    }
    this.currentPage = newPage;
    const startIndex = this.currentPage * this.itemsPerPage;

    const currentPageKey = `page-${this.currentPage}`;
    const pokemonListString = sessionStorage.getItem(currentPageKey);

    if (pokemonListString) {
      this.pokemons = JSON.parse(pokemonListString);
    } else {
      this.pokemonService.getPokemons(startIndex, this.itemsPerPage).subscribe((pokemons: Pokemon[]) => {
        this.pokemons = pokemons;
        this.fetchAndStorePokemonDetails(currentPageKey, pokemons);
      });
    }
  }

  fetchAndStorePokemonDetails(currentPage: string, pokemons: Pokemon[]) {
    let pokemonList: Pokemon[] = []

    for (const pokemon of pokemons) {
      this.pokemonService.getPokemonDetails(pokemon.name.toLowerCase()).subscribe(
        (response) => {
          pokemonList.push(response)
          sessionStorage.setItem(currentPage, JSON.stringify(pokemonList));
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }
  
}
