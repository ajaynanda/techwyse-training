import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component'
import { ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import  {DashboardComponent} from './dashboard/dashboard.component';
import { MyaccountComponent } from './myaccount/myaccount.component';
import { UpdateComponent } from './update/update.component';
import { ChangepasswordComponent } from './changepassword/changepassword.component'
import { MatDialogModule } from '@angular/material/dialog';
import { DeleteuserComponent } from './deleteuser/deleteuser.component'
import { TokenInterceptor } from './token.interceptor';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    RegisterComponent,
    
    MyaccountComponent,
    UpdateComponent,
    ChangepasswordComponent,
    DeleteuserComponent,
  
],  
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatButtonModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatDialogModule,
    HttpClientModule,
  ],
  providers:[ {provide:HTTP_INTERCEPTORS,useClass:TokenInterceptor,multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
