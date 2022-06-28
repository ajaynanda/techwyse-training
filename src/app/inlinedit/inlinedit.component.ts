import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiserviceService } from '../apiservice.service';
import { inline } from '../myaccount/array.model'
import { NotificationService } from '../notification.service';
@Component({
  selector: 'app-inlinedit',
  templateUrl: './inlinedit.component.html',
  styleUrls: ['./inlinedit.component.css']
})
export class InlineditComponent implements OnInit {
  firstname:any
  p:any
user:any
edit:boolean=false
searchText:any
key:String='Name'
inline = new inline()
dataarray:any=[]
adds:boolean=true
reverse:boolean=false
  constructor(private http:ApiserviceService,private notification:NotificationService) { }
  ngOnInit(): void {
    this.http.inlinefinduser().subscribe((res: any) => {
   
      this.user=res.data
      this.user.forEach((element:any)=>{
        element['isEdit'] = false
      })
      console.log(this.user); 
      
    })
  }
  inlineForm=new FormGroup({
    name:new FormControl('',[Validators.required]),
    phone:new FormControl('',[Validators.required,Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
    email:new FormControl('',[Validators.required,Validators.email]),
    city:new FormControl('',[Validators.required])
  })
update(id:any,data:any){
  console.log(this.inlineForm.value);
  
  this.http.inlineupdateuser(id,this.inlineForm.value).subscribe((res:any)=>{
    console.log(res);
    data.isEdit=false
    this.notification.success("User updated successfully")  
  })
}
delete(id:any,data:any){
  this.http.inlinedeleteuser(id).subscribe((res)=>{
    data.isEdit=false
    this.notification.error("User deleted succesfully")
})
}
edits(data:any){
  data.isEdit=true
}
cancel(data:any){
data.isEdit=false
}
get email() { return this.inlineForm.get('email') }
get phone() { return this.inlineForm.get('phone') }
get name(){return this.inlineForm.get('name')}
get city(){return this.inlineForm.get('city')}
sort(key:any){
  this.key=key
  this.reverse=!this.reverse
}
add(){
  this.inline = new inline()
  console.log(this.inline);
  this.dataarray.push(this.inline) 
  this.adds=false
}
cancels(){
  this.dataarray.splice(this.inline)
  this.adds=true
}
adduser(data:any){
    this.http.inlineadduser(data).subscribe((res)=>{
      console.log(res);
      this.inlineForm.reset()
      this.notification.success("user added sucessfully")    
    })
}
}
