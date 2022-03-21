import { Component} from '@angular/core';
import { FormControl, FormGroup,Validators } from '@angular/forms';
import { ApiserviceService } from '../apiservice.service';
import { Router } from '@angular/router';
import { NotificationService } from '../notification.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
constructor(private  http:ApiserviceService,private route:Router,private notification:NotificationService){}
errormsg:any
successmsg:any
authenticated = true
Loginform = new FormGroup({
  email:new FormControl('',[Validators.required,Validators.email]),
  password:new FormControl('',[Validators.required, Validators.minLength(6)])
})
  loginuser(){
    this.http.loginuser(this.Loginform.value).subscribe((res)=>{
    if(res){
      this.Loginform.reset()
      localStorage.setItem('userdata',JSON.stringify(res.user))
      localStorage.setItem('token',res.token)
      this.successmsg= res.Message
      this.notification.success('You are Logged in successfully')
      this.authenticated = true
      this.route.navigate(['/dashboard'])
    }
  },(err=>{
    console.log(err);
    this.errormsg = err.error.Message
    this.notification.error(this.errormsg)
  }))
}
register(){
  this.route.navigate(['Register'])
}
get email(){return this.Loginform.get('email')}
get emailformat(){return this.Loginform.get('email')}
get password(){return this.Loginform.get('password')}
get passwordlength(){return this.Loginform.get('password')}
}
