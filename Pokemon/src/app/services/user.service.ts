import { Injectable } from '@angular/core';
import { AuthGuard } from '../guards/auth.guard';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private authGuard: AuthGuard, private router: Router) { }

  isUserLoggedIn(): boolean {
    const currentRoute: ActivatedRouteSnapshot = this.router.routerState.snapshot.root;
    const currentState: RouterStateSnapshot = this.router.routerState.snapshot;

    return this.authGuard.canActivate(currentRoute, currentState);
  }
}
