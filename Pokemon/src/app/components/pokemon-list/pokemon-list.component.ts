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

  public currentUser!: User


  ngOnInit() {
    this.pageChanged(0);
    const userString = sessionStorage.getItem("user");

    this.currentUser = userString ? JSON.parse(userString): {}
    console.log(this.currentUser?.pokemon)
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
    console.log("current:  ", this.currentUser)

    let updatedUser: User = { ...this.currentUser };

    updatedUser.pokemon = [... this.currentUser!.pokemon]
    updatedUser.pokemon.push(pokemon.name);

    this.caughtPokemons.push(pokemon.name);
    this.currentUser = updatedUser;
    console.log("update: ", updatedUser)
    sessionStorage.setItem('user', JSON.stringify(updatedUser))

    this.userService.updateUser(updatedUser).subscribe(
      res => {
        console.log("update successful: ", res);
      },
      err => {
        console.log("update error: ", err);
      }
    );

    console.log("update: ", updatedUser);

  }

  removeCatch(pokemon: any){
    console.log("current:  ", this.currentUser)

    let updatedUser: User = { ...this.currentUser };

    updatedUser.pokemon = [... this.currentUser!.pokemon]
    updatedUser.pokemon = updatedUser.pokemon.filter(pokemonName => pokemonName !== pokemon.name);

    this.currentUser = updatedUser;

    this.userService.updateUser(updatedUser).subscribe(
      res => {
        console.log("update successful: ", res);
      },
      err => {
        console.log("update error: ", err);
      }
    );
    console.log("update: ", updatedUser);
    }

  isCaught(pokemon: any) {
    return this.currentUser.pokemon.includes(pokemon.name);
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
