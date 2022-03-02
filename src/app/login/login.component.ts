import { Component} from '@angular/core';
import { FormControl, FormGroup,Validators } from '@angular/forms';
import { ApiserviceService } from '../apiservice.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
constructor(private  http:ApiserviceService,private route:Router){}
errormsg:any
successmsg:any
Loginform = new FormGroup({
  email:new FormControl('',[Validators.required,Validators.email]),
  password:new FormControl('',[Validators.required, Validators.minLength(6)])
})
  loginuser(){
    this.http.loginuser(this.Loginform.value).subscribe((res)=>{
    if(res){
      this.Loginform.reset()
      console.log(res);
      localStorage.setItem('userdata',JSON.stringify(res.user))
      localStorage.setItem('token',res.token)
      this.successmsg= res.Message
      console.log(this.successmsg);
      
      this.route.navigate(['/dashboard'])
    }
  },(err=>{
    console.log(err);
    this.errormsg = err.error.Message
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
