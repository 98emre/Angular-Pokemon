import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-catalogue-page',
  templateUrl: './catalogue-page.component.html',
  styleUrls: ['./catalogue-page.component.css']
})
export class CataloguePageComponent {

  constructor(private readonly route : Router){
    if(sessionStorage.getItem("username") != null || sessionStorage.getItem("username")?.trim() != "") {
      this.route.navigateByUrl("catalogue")
    }
  }
}
