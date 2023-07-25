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

  constructor(private pokemonService: PokemonService) {}

  ngOnInit() {
    this.pokemonService.getPokemons().subscribe((pokemons: any[]) => {
      this.pokemons = pokemons;
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
