import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { CataloguePageComponent } from './pages/catalogue-page/catalogue-page.component';
import { ProfileComponent } from './components/profile/profile.component';

const routes: Routes = [
  {
    path: '',
    component:LoginPageComponent
  },
  {
    path:'catalogue',
    component:CataloguePageComponent
    
  },
  {
    path: 'profile',
    component: ProfileComponent
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
