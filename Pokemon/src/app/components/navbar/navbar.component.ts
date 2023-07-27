import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public catalogueRoute = false;
  public profileRoute = false;

  constructor(private readonly router: Router) {

    this.router.events.subscribe((event) => {
      
       if(event instanceof NavigationEnd){
        this.catalogueRoute = this.router.url.includes('/catalogue');
        this.profileRoute = this.router.url.includes('/profile');

       }
    })
  }
  ngOnInit(): void {
  }
}
