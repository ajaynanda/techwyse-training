import { Injectable } from '@angular/core';
import { ApiserviceService } from './apiservice.service';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private authservice: ApiserviceService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler) {
    console.log({ request });
    const commonUrl = 'http://localhost:4000/'
    const token = localStorage.getItem('token')
    let newRequest = request.clone({
      setHeaders: { 'authorization': 'Bearer ' + token },
      url: commonUrl + request.url
    })
    return next.handle(newRequest);
  }
}
