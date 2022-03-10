import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Emitters } from 'src/Emmitters/emmitter';
import { ApiserviceService } from '../apiservice.service';
import { DeleteuserComponent } from '../deleteuser/deleteuser.component';
import { UpdateComponent } from '../update/update.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  name:any
message:any
authenticated =false;
data:any
isExpanded: boolean = false;
  constructor(private http:ApiserviceService,private dialog:MatDialog) { }
  ngOnInit(): void {
    this.name = JSON.parse(localStorage.getItem('userdata') || '{}');
    const id = this.name._id
    this.http.getuserbyid(id).subscribe((res:any)=>{
      console.log(res.data);
      this.data = res.data
      
    })
    this.http.getalluser().subscribe((res:any)=>{
      Emitters.authemitter.emit(true)
      this.authenticated = true
     const token =  localStorage.getItem('token')
     this.name = JSON.parse(localStorage.getItem('userdata') || '{}');;
      }),(err:any)=>{
        console.log(err);
        this.message = "You are not logged in"
      Emitters.authemitter.emit(false)
    }
  }
  updatebyid(row:any,id:any){
    console.log(id);
    this.dialog.open(UpdateComponent,{
      data:row
    })
 
  }
  deletebyid(id:any){
    this.dialog.open(DeleteuserComponent,{
      width:'50%'
    })
    confirm("Are you sure to delete your account")
  }
}
