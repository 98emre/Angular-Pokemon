import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public showNavbar = false;

  constructor(private readonly router: Router) {
    this.router.events.subscribe((event) => {
       if(event instanceof NavigationEnd){
        this.showNavbar = ['/catalogue', '/profile'].includes(this.router.url);
       }
    })
  }

  ngOnInit(): void {
  }
}
