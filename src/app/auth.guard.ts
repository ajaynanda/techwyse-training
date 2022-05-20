import { Injectable } from '@angular/core';
import { CanActivate} from '@angular/router';
import { ApiserviceService } from './apiservice.service';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private auth:ApiserviceService){}
  canActivate(){
    if(this.auth.haveaccess()){
      return true
    }else{
      return false
    }
  }
}
