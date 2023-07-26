import { Component, Input, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon';
import { User } from 'src/app/models/user';
import { PokemonService } from 'src/app/services/pokemon-service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-pokemon-list-item',
  templateUrl: './pokemon-list-item.component.html',
  styleUrls: ['./pokemon-list-item.component.css']
})
export class PokemonListItemComponent implements OnInit {

  @Input() pokemon!: Pokemon;

  pokemonDetails: Pokemon | undefined

  @Input() currentUser!: User

  constructor(private readonly pokemonService: PokemonService, private readonly userService: UserService) {
  }


  ngOnInit(): void { }


  handleCatchClick(pokemon: Pokemon) {
    const userString = sessionStorage.getItem("user");
    this.currentUser = userString ? JSON.parse(userString): { }    

    let updatedUser: User = { ...this.currentUser };
  
    updatedUser.pokemon = [... this.currentUser!.pokemon]
    updatedUser.pokemon.push(pokemon.name);

    this.currentUser = {...updatedUser};
    sessionStorage.setItem('user', JSON.stringify(  this.currentUser))

    this.userService.updateUser(updatedUser).subscribe(
      res => {
        console.log("update successful: ", res);
      },
      err => {
        console.log("update error: ", err);
      }
    );
  }

  isCaught(pokemon: Pokemon) {
    const userString = sessionStorage.getItem("user");
    this.currentUser = userString ? JSON.parse(userString): { }    
    return this.currentUser.pokemon.includes(pokemon.name);
  }

  handleDetailsClick(pokemon: Pokemon) {
    if (pokemon) {
      if (this.pokemonDetails === undefined) {
        this.pokemonService.getPokemonDetails(pokemon.name.toLowerCase()).subscribe(
          (response) => {
            this.pokemonDetails = response;
          },
          (error) => {
            console.error(error);
          }
        );
      } else {
        this.pokemonDetails = undefined;
      }
    }
  }
  
  

}