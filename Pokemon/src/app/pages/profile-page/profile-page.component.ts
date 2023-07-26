import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {
  userDetails?: User;

  constructor(private readonly userService: UserService) { }

  ngOnInit(): void {

  }

  get user(): User{
    console.log(this.userService.user)
    return this.userService.user
  }

}
