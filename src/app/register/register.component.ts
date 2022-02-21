import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup,Validators } from '@angular/forms';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent{
Regform = new FormGroup({
   fname: new FormControl('',[Validators.required,Validators.pattern('a-zA-Z+$')]),
   lname:new FormControl('',[Validators.required,Validators.pattern('a-zA-Z+$')]),
   email: new FormControl('',[Validators.required,Validators.email]),
   dob:new FormControl('',Validators.required),
   gender:new FormControl('',Validators.required),
   prof:new FormControl('',[Validators.required,Validators.pattern('a-zA-Z+$')]),
   password:new FormControl('',[Validators.required,Validators.minLength(6)])
 })
 reguser(){
  console.log(this.Regform.value);
}
get emailformat(){return this.Regform.get('email')}
get email(){return this.Regform.get('email')}
get fname(){return this.Regform.get('fname')}
get lname(){return this.Regform.get('lname')}
get dob(){return this.Regform.get('dob')}
get prof(){return this.Regform.get('prof')}
get passwordlength(){return this.Regform.get('password')}
get password(){return this.Regform.get('password')}
}
