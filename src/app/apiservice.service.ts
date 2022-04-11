import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TOUCH_BUFFER_MS } from '@angular/cdk/a11y/input-modality/input-modality-detector';
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
  searchuser(name:any){
    return this.http.get(`${environment.searchuser}/${name}`)
  }
 updatecourses(id:any,data:any){
  return this.http.put(`${environment.updatecourse}/${id}`,data)
 }
 addcourse(id:any,data:any){
   return this.http.post(`${environment.addcourse}/${id}`,data)
 }
 deletecourse(id:any,ids:any){
  return this.http.get(`${environment.deletecourse}/${id}/${ids}`)
 }

 photouplaod(id:any,data:any):Observable<any>{
   return this.http.post(`${environment.profile}/${id}`,data)
 }
 deleteprofile(id:any,profile:any,crop:any){
   return this.http.get(`${environment.deleteprofile}/${id}/${profile}/${crop}`)
 }
 inlineadduser(data:any){
 return   this.http.post(`${environment.inlineadduser}`,data)
 }
 inlineupdateuser(id:any,data:any){
   return this.http.put(`${environment.inlineupdatesuer}/${id}`,data)
 }
 inlinedeleteuser(id:any){
  return this.http.delete(`${environment.inlinedeleteuser}/${id}`)
 }
 inlinefinduser(){
   return this.http.get(`${environment.inlinefinduser}`)
 }
 addteam(data:any){
   return this.http.post(`${environment.addteam}`,data)
 }
 findteam(){
   return this.http.get(`${environment.findteam}`)
 }
 addchild(id:any,data:any){
   return this.http.post(`${environment.addchild}/${id}`,data)
 }
 updateteam(id:any,data:any){
  return this.http.put(`${environment.updateteam}/${id}`,data)
 }
 updatechild(data:any){
   return this.http.put(`${environment.updatechild}`,data)
 }
 deleteteam(id:any){
  return this.http.delete(`${environment.deleteteam}/${id}`)
 }
 deletechild(id:any,childid:any){
 return this.http.delete(`${environment.deletechild}/${id}/${childid}`)
 }
 arrayremoveitem(id:any,ids:any,index:any,addid:any,ia:any){
   return this.http.get(`${environment.arrayremoveitem}/${id}/${ids}/${index}/${addid}/${ia}`)
 }
 changearray(newindex:any){
   return this.http.get(`${environment.changearray}`,newindex) 
 }
}

