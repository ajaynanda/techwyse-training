import { Component, OnInit } from '@angular/core';
import { Emitters } from 'src/Emmitters/emmitter';
import { ApiserviceService } from '../apiservice.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  name:any
message:any
  constructor(private http:ApiserviceService) { }
  ngOnInit(): void {
    this.http.getalluser().subscribe((res:any)=>{
      Emitters.authemitter.emit(true)
     const token =  localStorage.getItem('token')
     this.name = JSON.parse(localStorage.getItem('userdata') || '{}');;
      }),(err:any)=>{
        console.log(err);
        this.message = "You are not logged in"
      Emitters.authemitter.emit(false)
    }
  }
}
