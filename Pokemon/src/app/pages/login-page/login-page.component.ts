import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {

  constructor(private readonly route : Router){
    if(sessionStorage.getItem("username") != null || sessionStorage.getItem("username")?.trim() != "") {
      this.route.navigateByUrl("catalogue")
    }
   }

}
