import { Component  } from '@angular/core';
import { NgForm } from "@angular/forms";
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {

  private _user!: User

  loading: boolean = false
  apiError: string = ""

  constructor(private readonly router : Router, private readonly userService: UserService){
  
  }

  login(form: NgForm) {                
    
    this.loading = true

    this.userService.getUser(form.value.username.trim())
      .subscribe({
        next: (user) => {
          if (user.length === 0) {
            let newUser: User = {
              id: 0,
              username: form.value.username.trim(),
              pokemon: []
            }
            
            this.userService.postUser(newUser).subscribe({
              next: (response) => {
                this._user = response; 
                sessionStorage.setItem("user", JSON.stringify(this._user));
                this.router.navigate(["catalogue"]);
                
              },
              error: (error) => {
                console.log(error, 'user failed creation');
              },
            });
          } 
          
          else {
            this._user = user[0]
            sessionStorage.setItem("user", JSON.stringify(this._user))
            this.router.navigate(["catalogue"])
          }

          this.loading = false
        },
        error: error => {
          console.log(error)
          this.loading = false
          this.apiError = "API ERROR - CHECK INTERNET CONNECTION"
        }
      })
  }
}
