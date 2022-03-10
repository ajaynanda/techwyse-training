
import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from '../apiservice.service';
@Component({
  selector: 'app-myaccount',
  templateUrl: './myaccount.component.html',
  styleUrls: ['./myaccount.component.css']
})
export class MyaccountComponent implements OnInit {
user:any
authenticated:any
  constructor(private http:ApiserviceService) { }

  ngOnInit(): void {
    const name =  JSON.parse(localStorage.getItem('userdata') || '{}');
    const id = name._id
    this.http.getuserbyid(id).subscribe((res:any)=>{
    this.user = res.data
    this.authenticated = true
    })
   
   
   
  }
}
