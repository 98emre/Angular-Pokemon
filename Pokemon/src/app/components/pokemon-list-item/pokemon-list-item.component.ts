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


  constructor(private readonly userService: UserService, private readonly pokemonService: PokemonService) { }


    ngOnInit(): void {

    }
    
  handleCatchClick(pokemon: Pokemon) {
    if(confirm(`Do you want to catch ${pokemon.name}?`)){
    this.currentUser.pokemon.push(pokemon.name);

    sessionStorage.setItem('user', JSON.stringify(  this.currentUser))

    this.userService.updateUser(this.currentUser).subscribe(
      res => { console.log("Update successful: ", res); },
      err => { console.log("Update error: ", err); }
    );
  }
  else{
    return;
  }
  }

  isCaught(pokemon: Pokemon) {
    const userString = sessionStorage.getItem("user");
    this.currentUser = userString ? JSON.parse(userString): { }    
    return this.currentUser.pokemon.includes(pokemon.name);
  }

  handleDetailsClick(pokemon: Pokemon) {
    this.checkDetailStatus = !this.checkDetailStatus
    const currentPageString = sessionStorage.getItem(`page-${this.currentPage}`);
    
    if (currentPageString) {
      const currentPokemonPage: Pokemon[] = JSON.parse(currentPageString);
      this.pokemonDetails = currentPokemonPage.find(p => p.name === pokemon.name);
    }
  }
}
