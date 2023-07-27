import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
  public currentUser!: User;
  
  constructor( private readonly router: Router,private readonly userService: UserService) {}

  ngOnInit(): void {
    const userString = sessionStorage.getItem('user');
    this.currentUser = userString ? JSON.parse(userString) : {};
    console.log(this.currentUser?.username);
  }

  logout() {
    sessionStorage.clear();
    this.router.navigateByUrl('/');
  }

  handleRemovePokemon(pokemon: string) {
      const userString = sessionStorage.getItem('user');
      this.currentUser = userString ? JSON.parse(userString) : {};

      this.currentUser.pokemon = [...this.currentUser.pokemon.filter(name => name != pokemon)];

      sessionStorage.setItem('user', JSON.stringify(this.currentUser));

      this.userService.updateUser(this.currentUser).subscribe(
        (res) => {
          console.log('update successful: ', res);
        },
        (err) => {
          console.log('update error: ', err);
        }
      );
    }
}
