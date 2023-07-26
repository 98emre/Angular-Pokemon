import { Component  } from '@angular/core';
import { NgForm } from "@angular/forms";
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {

  private _user!: User

  constructor(private readonly router : Router, private readonly userService: UserService){

  }

  login(form: NgForm) {
    this.userService.getUser(form.value.username.trim())
      .subscribe({
        next: (user) => {
          if (user.length === 0) {
            let newUser: User = {
              id: 0,
              username: form.value.username.trim(),
              pokemon: []
            }
  
            this._user = newUser
            console.log(this._user)
            sessionStorage.setItem("user", JSON.stringify(this._user))
            this.userService.postUser(this._user)
            this.router.navigate(["catalogue"])
          } 
          
          else {
            this._user = user[0]
            console.log(this._user)
            sessionStorage.setItem("user", JSON.stringify(this._user))
            this.router.navigate(["catalogue"])
          }
        },
        error: error => {
          console.log(error)
        }
      })
  }
  

}
