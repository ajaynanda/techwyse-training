import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Emitters } from 'src/Emmitters/emmitter';
import { ApiserviceService } from './apiservice.service';
import { NotificationService } from './notification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  name:any
  names:any
  today= Date()
  status='active now'
  authenticated= false
  constructor(private http:ApiserviceService,private route:Router,private notification:NotificationService){}
  ngOnInit(): void {
    this.names =   JSON.parse(localStorage.getItem('userdata') || '{}')
    const id = this.names._id
    this.http.getuserbyid(id).subscribe((res:any)=>{
      this.name= res.data
    })
    Emitters.authemitter.subscribe((auth:boolean)=>{
      this.authenticated = auth
      })
      new Observable((observer)=>{
        observer.complete()
        setTimeout(()=>{
          observer.next('1 min ago')
        },2000)
        setTimeout(()=>{
          observer.next('2 min ago')
        },4000)
      }).subscribe((res:any)=>{
        this.status = res
      })
  }
 Logout(){
   this.http.logoutuser().subscribe((user)=>{
     localStorage.removeItem('token')
     localStorage.removeItem('userdata')
     this.notification.error('You are logged out successfully')
     this.route.navigate(['Login'])
     this.authenticated=false
     })
 }
}