import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  
  authenticated= false
  constructor(private http:ApiserviceService,private route:Router,private router:ActivatedRoute,private notification:NotificationService){}
  ngOnInit(): void {
    this.names =   JSON.parse(localStorage.getItem('userdata') || '{}')
    const id = this.names._id
    this.http.getuserbyid(id).subscribe((res:any)=>{
      this.name= res.data
    })
 
    Emitters.authemitter.subscribe((auth:boolean)=>{
      this.authenticated = auth
      })
  }
 Logout(){
   this.http.logoutuser().subscribe((user)=>{
     this.authenticated=false
     localStorage.removeItem('token')
     localStorage.removeItem('userdata')
     this.notification.error('You are logged out successfully')
     this.route.navigate(['/Login'])
     })
 }
}