import { Component } from '@angular/core';
import { AuthGuard } from './guards/auth.guard';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {
  
  constructor(private authGuard: AuthGuard, private route: Router) { }

  isUserLoggedIn(): boolean {
    const currentRoute: ActivatedRouteSnapshot = this.route.routerState.snapshot.root;
    const currentState: RouterStateSnapshot = this.route.routerState.snapshot;

    return this.authGuard.canActivate(currentRoute, currentState);
  }
}
