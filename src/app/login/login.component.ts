import { Component} from '@angular/core';
import { FormControl, FormGroup,Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

Loginform = new FormGroup({
  email:new FormControl('',[Validators.required,Validators.email]),
  password:new FormControl('',[Validators.required, Validators.minLength(6)])
})
loguser(){
  console.log(this.Loginform.value);
  
}
get email(){return this.Loginform.get('email')}
get emailformat(){return this.Loginform.get('email')}
get password(){return this.Loginform.get('password')}
get passwordlength(){return this.Loginform.get('password')}
}
