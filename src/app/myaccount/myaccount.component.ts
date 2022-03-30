
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApiserviceService } from '../apiservice.service';
import { NotificationService } from '../notification.service';
import {array} from "./array.model"
import { ImageComponent } from './image.component';

@Component({
  selector: 'app-myaccount',
  templateUrl: './myaccount.component.html',
  styleUrls: ['./myaccount.component.css']
})
export class MyaccountComponent implements OnInit {
user:any
authenticated:any
array=new array()
result:any
editdata:any
dataarray:any=[]
  constructor(private http:ApiserviceService,private notification:NotificationService,private dialog:MatDialog) { }

  ngOnInit(): void {
    const name =  JSON.parse(localStorage.getItem('userdata') || '{}');
    const id = name._id
    this.http.getuserbyid(id).subscribe((res:any)=>{
    this.user = res.data
    this.result= res.data.Qualification
    this.authenticated = true
    this.array=new array()
    this.dataarray.push(this.array)
    })
  }
  updatecourse(id:any,data:any){
    console.log(data);
    console.log(this.dataarray);  
         this.http.updatecourses(id,data).subscribe((res)=>{
       console.log(res);
       if(res) return  this.notification.success('Qualification Updated Successfully')
     })  
  }
  addcourse(id:any,data:any){
    data.forEach((item:any) =>{
    console.log(item);
    this.http.addcourse(id,item).subscribe((res)=>{
      console.log(res);
      this.notification.success('Qualification Added Successfully')
    })
  }) 
  }
  edit(id:any,data:any){
    console.log(data);
      this.editdata=data
  }
  add(){
   this.array=new array()
   this.dataarray.push(this.array)
  }
  remove(index:number){
    this.array=new array()
this.dataarray.splice(index)
  }

close(id:any,editid:any){
  alert("Are you sure to delete")
  this.http.deletecourse(id,editid).subscribe((res)=>{
    console.log(res); 
    this.notification.error('Qualification deleted Successfully')
  })
  }
  open(){
    this.dialog.open(ImageComponent,{
      width:'40%',
      height:'60%'
    })
  }
  filechange(event:any){
    console.log(event.target.files); 
  }
  submit(data:any){
    console.log(data); 
  }
}
