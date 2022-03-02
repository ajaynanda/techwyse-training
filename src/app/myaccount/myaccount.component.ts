
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
    const id =  JSON.parse(localStorage.getItem('userdata') || '{}');
    this.authenticated = true
    this.user = id   
  }
}
