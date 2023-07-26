import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  public currentUser!: User
  constructor(private router: Router) { }

  ngOnInit(): void {
    const userString = sessionStorage.getItem("user");
    this.currentUser = userString ? JSON.parse(userString): {}
    console.log(this.currentUser?.username)
  }


  logout(){
    sessionStorage.removeItem("user")
    this.router.navigateByUrl("/")
  
  }
}


