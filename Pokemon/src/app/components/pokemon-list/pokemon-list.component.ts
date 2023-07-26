
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
    this.pageChanged(0)    
  }  

  pageChanged(newPage: number, ) {
    if(newPage < 0 || newPage >= this.maxPages){
      console.error("Page doesn't exist, pagenmr: ", newPage)
    }

    this.currentPage = newPage;
    this.pokemonService.getPokemons(this.currentPage * this.itemsPerPage, this.itemsPerPage).subscribe((pokemons: any[]) => {
      this.pokemons = pokemons
      this.maxPages = Math.ceil(this.pokemons.count / this.itemsPerPage);
    });
  }
}

