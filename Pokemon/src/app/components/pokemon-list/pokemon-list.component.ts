import { Component, OnInit } from '@angular/core';
import { PokemonService } from 'src/app/services/pokemon-service';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css'],
})
export class PokemonListComponent implements OnInit {
  pokemons: any = [];
  caughtPokemons: any = [];


  currentPage: number = 0;
  itemsPerPage: number = 50
  maxPages: number = 10;

  constructor(private pokemonService: PokemonService) {}

  ngOnInit() {
    this.pageChanged(0);
  }

  pageChanged(newPage: number) {
    this.currentPage = newPage;
    this.pokemonService.getPokemons(this.currentPage * this.itemsPerPage, this.itemsPerPage).subscribe((pokemons: any[]) => {
      this.pokemons = pokemons;
      this.maxPages = Math.ceil(this.pokemons.count / this.itemsPerPage);
    });
  }

  handleCatchClick(pokemon: any) {
    this.caughtPokemons.push(pokemon.name);
    console.log(pokemon);
  }

  isCaught(pokemon: any) {
    const ar: any = ['Charmander', 'Squirtle'];
    for (let i = 0; i < ar.length; i++) {
      this.caughtPokemons.push(ar[i]);
    }
    return this.caughtPokemons.includes(pokemon.name);
  }
  handleDetailsClick(pokemon: any): any {
    if (!pokemon.details) {
      this.pokemonService.getPokemonDetails(pokemon.name.toLowerCase()).subscribe(
        (response) => {
          pokemon.details = response.pokemonDetails;
          pokemon.detailsVisible = true;
        },
        (error) => {
          console.error(error);
        }
      );
    } else {
      pokemon.detailsVisible = !pokemon.detailsVisible;
    }
  }
  
  
}
