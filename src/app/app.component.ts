import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Emitters } from 'src/Emmitters/emmitter';
import { ApiserviceService } from './apiservice.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  name:any
  authenticated= false
  constructor(private http:ApiserviceService,private route:Router,private router:ActivatedRoute){}
  ngOnInit(): void {
  this.name =   JSON.parse(localStorage.getItem('userdata') || '{}')
  console.log(this.name.Firstname);
  
    Emitters.authemitter.subscribe((auth:boolean)=>{
      this.authenticated = auth
      })
  }
 Logout(){
   this.http.logoutuser().subscribe((user)=>{
     this.authenticated=false
     localStorage.removeItem('token')
     localStorage.removeItem('userdata')
     this.route.navigate(['/Login'])
     })
 }
}