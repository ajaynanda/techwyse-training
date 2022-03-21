import { Injectable } from '@angular/core';
import {CanActivate, Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private route:Router){}
  canActivate(){
  const token = localStorage.getItem('token')
  if(token) {
    return true
  }else{
    alert("You Have not Logged in")
    this.route.navigate(['Login'])
     return false
  }   
  }
}
