import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {

  username?: string = "not logged"

  constructor(private readonly route : Router){
  }

  login(){
      sessionStorage.setItem("username",this.username!)
      this.route.navigateByUrl("catalogue")
  }

  usernameChange(event:any): void{
      this.username = event.target.value.trim()
  }
}
