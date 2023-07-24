import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent {

  constructor(private readonly route : Router){
    if(sessionStorage.getItem("username") != null || sessionStorage.getItem("username")?.trim() != "") {
      this.route.navigateByUrl("catalogue")
    }
  }
}
