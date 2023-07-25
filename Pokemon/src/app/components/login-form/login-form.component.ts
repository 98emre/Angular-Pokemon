import { Component } from '@angular/core';
import { NgForm, NgModel } from "@angular/forms";
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {

  username?: string = ""

  constructor(private readonly route : Router){

  }

  login(form: NgForm){
      sessionStorage.setItem("username",form.value.username)
      this.route.navigateByUrl("catalogue")
  }

}
