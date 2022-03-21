import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor
} from '@angular/common/http';
@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler) {
    const commonUrl = 'http://localhost:4000/'
    const token = localStorage.getItem('token')
    let newRequest = request.clone({
      setHeaders: { 'authorization': 'Bearer ' + token },
      url: commonUrl + request.url
    })
    return next.handle(newRequest);
  }
}
