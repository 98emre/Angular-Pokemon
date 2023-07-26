
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
  public pokemons: any = [];
  
  currentPage: number = 0;
  itemsPerPage: number = 48
  maxPages: number = 10;

  constructor(private readonly route: ActivatedRoute, private readonly pokemonService: PokemonService, private readonly userService: UserService ) {}

  ngOnInit() {
    this.pokemonService.getPokemons(0, 1008).subscribe((pokemons: any[]) => {
      window.sessionStorage.setItem('pokemons', JSON.stringify(pokemons));
      this.pageChanged(0);
    }); 
  }  
  pageChanged(newPage: number) {
    if(newPage < 0 || newPage >= this.maxPages){
      console.error("Page doesn't exist, pagenmr: ", newPage);
      return;
    }
    this.currentPage = newPage;
    let pokemons = window.sessionStorage.getItem('pokemons');
    if(pokemons) {
      let allPokemons = JSON.parse(pokemons);
      this.maxPages = Math.ceil(allPokemons.length / this.itemsPerPage);
  
      if(newPage >= 0 && newPage < this.maxPages){
        let start = newPage * this.itemsPerPage;
        let end = start + this.itemsPerPage;
        this.pokemons = allPokemons.slice(start, end);
      } else {
        console.error("Page doesn't exist, pagenmr: ", newPage);
      }
    } else {
      console.error("No pokemons found in SessionStorage");
    }
  }
}

