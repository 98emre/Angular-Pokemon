import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { CataloguePageComponent } from './pages/catalogue-page/catalogue-page.component';
import { AuthGuard } from './guards/auth.guard';
import { ErrorPageComponent } from './pages/error-page/error-page.component';
import { LoginFormGuard } from './guards/login-form.guard';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component:LoginPageComponent,
    canActivate: [LoginFormGuard]
  },
  {
    path:'catalogue',
    component:CataloguePageComponent,
    canActivate: [AuthGuard]
    
  },
  {
    path: 'profile',
    component: ProfilePageComponent,
    canActivate: [AuthGuard]
  },

  {
    path: '**',
    component: ErrorPageComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
