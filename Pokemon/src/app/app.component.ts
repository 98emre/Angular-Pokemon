import { Component, OnInit } from '@angular/core';
import { AuthGuard } from './guards/auth.guard';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit{
  
  constructor() { }

  ngOnInit(): void {
    
  }
}
