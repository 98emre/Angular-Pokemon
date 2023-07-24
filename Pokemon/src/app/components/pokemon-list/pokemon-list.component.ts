import { Component, OnInit } from '@angular/core';
import { PokemonService } from 'src/app/services/pokemon-service';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css'],
})
export class PokemonListComponent implements OnInit {
  pokemons: any = [];
  
  constructor(private pokemonService: PokemonService) {}

  ngOnInit() {
    this.pokemonService.getPokemons().subscribe((pokemons: any[]) => {
      this.pokemons = pokemons;
    });
  }
}
