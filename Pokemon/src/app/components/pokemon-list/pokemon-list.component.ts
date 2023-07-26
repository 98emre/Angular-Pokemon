import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user';
import { PokemonService } from 'src/app/services/pokemon-service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css'],
})
export class PokemonListComponent implements OnInit {
  pokemons: any = [];
  caughtPokemons: any = [];


  currentPage: number = 0;
  itemsPerPage: number = 48
  maxPages: number = 10;

  constructor(private readonly route: ActivatedRoute, private readonly pokemonService: PokemonService, private readonly userService: UserService ) {}

  public currentUser?: User


  ngOnInit() {
    this.pageChanged(0);
    const userString = sessionStorage.getItem("user");

    this.currentUser = userString ? JSON.parse(userString): {}
    console.log(this.currentUser)
  }

  pageChanged(newPage: number, ) {
    if(newPage < 0 || newPage >= this.maxPages){
      console.error("Page doesn't exist, pagenmr: ", newPage)
    }

    this.currentPage = newPage;
    this.pokemonService.getPokemons(this.currentPage * this.itemsPerPage, this.itemsPerPage).subscribe((pokemons: any[]) => {
      this.pokemons = pokemons;
      this.maxPages = Math.ceil(this.pokemons.count / this.itemsPerPage);
    });
  }

  handleCatchClick(pokemon: any) {
    this.caughtPokemons.push(pokemon.name);
  }

  removeCatch(pokemon: any){
    const index = this.caughtPokemons.indexOf(pokemon.name);
    if (index > -1) {
      this.caughtPokemons.splice(index, 1);
    }
  }

  isCaught(pokemon: any) {
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
