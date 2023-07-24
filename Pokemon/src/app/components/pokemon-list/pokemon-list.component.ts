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
  detailBool: boolean = false;

  constructor(private pokemonService: PokemonService) {}

  ngOnInit() {
    this.pokemonService.getPokemons().subscribe((pokemons: any[]) => {
      this.pokemons = pokemons;
    });
  }

  handleCatchClick(pokemon: any) {
 
    this.caughtPokemons.push(pokemon);
  }

  isCaught(pokemon: any) {
    return this.caughtPokemons.includes(pokemon);
  }
  handleDetailsClick(pokemon: any): any {
    this.detailBool = true;
    this.pokemonService.getPokemonDetails(pokemon.name.toLowerCase()).subscribe(
      (pokemonDetails) => {
        console.log(pokemonDetails);
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
