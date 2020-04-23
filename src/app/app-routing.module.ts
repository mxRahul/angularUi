import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { UpdateUserComponent } from './user/update-user/update-user.component';
import { ViewProfileComponent } from './view-profile/view-profile.component';
import { RegisterUserComponent } from './user/register-user/register-user.component';
import { UpdatePasswordComponent } from './update-password/update-password.component';


const appRoutes: Routes = [
  { path: '',  redirectTo: '/login', pathMatch: 'full'},
  { path: 'login', component: LoginComponent },
  { path: 'update', component: UpdateUserComponent },
  { path: 'profile', component: ViewProfileComponent },
  { path: 'register', component: RegisterUserComponent },
  { path: 'updatePassword', component: UpdatePasswordComponent },
];


@NgModule({
  imports: [RouterModule.forRoot(appRoutes, { useHash: false, initialNavigation: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
