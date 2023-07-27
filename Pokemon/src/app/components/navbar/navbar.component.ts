import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{

  constructor(private readonly userService: UserService){
  }

  

  ngOnInit(): void {
  }


  userLoggedIn(){
    return this.userService.user.username.length !=0
  }

}
