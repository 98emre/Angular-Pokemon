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
  @Input() currentPage!: number
  @Input() currentUser!: User

  pokemonDetails: Pokemon | undefined

   
  checkDetailStatus: boolean = false

  constructor(private readonly userService: UserService) { }


  ngOnInit(): void {
 
  }

  handleCatchClick(pokemon: Pokemon) {
    const userString = sessionStorage.getItem("user");
    this.currentUser = userString ? JSON.parse(userString): { }    
    this.currentUser.pokemon.push(pokemon.name);

    sessionStorage.setItem('user', JSON.stringify(  this.currentUser))

    this.userService.updateUser(this.currentUser).subscribe(
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
    const currentPageKey = `page-${this.currentPage}`;
    const currentPageString = sessionStorage.getItem(currentPageKey);
    
    this.checkDetailStatus = !this.checkDetailStatus
  
    if (currentPageString) {
      const currentPagePokemons: Pokemon[] = JSON.parse(currentPageString);
      const pokemonDetails = currentPagePokemons.find(p => p.name === pokemon.name);

      if (pokemonDetails) {
        this.pokemonDetails = pokemonDetails;
      }
    }
  }
}
