import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthGuard } from './auth.guard';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DeleteuserComponent } from './deleteuser/deleteuser.component';

import { LoginComponent } from './login/login.component';
import { MyaccountComponent } from './myaccount/myaccount.component';
import { RegisterComponent } from './register/register.component';
import { UpdateComponent } from './update/update.component';
import { UserlistComponent } from './userlist/userlist.component';
const routes: Routes = [
  { path: 'Login', component: LoginComponent},
  { path: 'Register', component: RegisterComponent },
  {path:'Home',component:AppComponent},
  {path:'dashboard',component:DashboardComponent,canActivate:[AuthGuard]},
  {path:'myprofile',component:MyaccountComponent,canActivate:[AuthGuard]},
  {path:'updateme/:id',component:UpdateComponent,canActivate:[AuthGuard]},
  {path:'changepasswordme/:id',component:ChangepasswordComponent,canActivate:[AuthGuard]},
  {path:'deleteme/:id',component:DeleteuserComponent,canActivate:[AuthGuard]},
  {path:'userlist',component:UserlistComponent,canActivate:[AuthGuard]}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
