
import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup,Validators } from '@angular/forms';
import { ApiserviceService } from '../apiservice.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent{
  constructor(private http:ApiserviceService){}
  errormsg:any
  successmsg:any
  ngOnInit():void{
    this.http.getalldata().subscribe((res)=>{
      console.log(res);
    })
    }
Regform = new FormGroup({
   fname: new FormControl('',[Validators.required]),
   lname:new FormControl('',[Validators.required]),
   email: new FormControl('',[Validators.required,Validators.email]),
   dob:new FormControl('',Validators.required),
   gender:new FormControl('',Validators.required),
   prof:new FormControl('',[Validators.required]),
   password:new FormControl('',[Validators.required,Validators.minLength(6)]),
   message:new FormControl('',[Validators.required])
 })
 postuser(){
  this.http.postusers(this.Regform.value).subscribe((res)=>{
    if(res){
     this.successmsg = res.message
    }
   },(err)=>{
    this.errormsg = err.error.Message
   })
}
get msg(){return this.Regform.get('message')}
get emailformat(){return this.Regform.get('email')}
get email(){return this.Regform.get('email')}
get fname(){return this.Regform.get('fname')}
get lname(){return this.Regform.get('lname')}
get dob(){return this.Regform.get('dob')}
get prof(){return this.Regform.get('prof')}
get passwordlength(){return this.Regform.get('password')}
get password(){return this.Regform.get('password')}
}

