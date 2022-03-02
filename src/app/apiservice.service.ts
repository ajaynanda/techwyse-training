import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {
  private isLoggedin = new BehaviorSubject<boolean>(false)
  private readonly TOKEN_NAME = 'token'
  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
  gettoken(){
    return localStorage.getItem(this.TOKEN_NAME)
  }
  constructor(private http: HttpClient) { }
  getalldata() {
    return this.http.get(`${environment.getalluser}`)
  }
  postusers(data: any): Observable<any> {
    console.log(data);
    
    return this.http.post<any>(`${environment.posturl}`, data)
  }
  loginuser(user: any): Observable<any> {
    console.log(user);
    return this.http.post<any>(`${environment.loginurl}`, user)
  }
  getalluser(){
    return this.http.get(`${environment.getalluser}`)
  }
  logoutuser(){
    return this.http.get(`${environment.logoutuser}`)
  }
  myaccount(){
    return this.http.get(`${environment.myaccount}`)
  }
  getuserbyid(id:any){
    return this.http.get(`${environment.myaccount}/${id}`)
  }
  updateuser(id:any,data:any){
    return this.http.put(`${environment.updateuser}/${id}`,data)
  }
  changepass(id:any,data:any){
    return this.http.put(`${environment.changepassword}/${id}`,data)
  }
  deleteuser(id:any){
    return this.http.delete(`${environment.deleteuser}/${id}`)
  }
 
}

