import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  
  currentUser!: User
  
  constructor() { }

  ngOnInit(): void {
    const userString = sessionStorage.getItem("user");
    this.currentUser = userString ? JSON.parse(userString): { } 
  }

}
