import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiserviceService } from '../apiservice.service';
import { NotificationService } from '../notification.service';
@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})
export class ChangepasswordComponent implements OnInit {
error:any
sucess:any
  constructor(private http:ApiserviceService,private router:ActivatedRoute,private notification:NotificationService) { }

  ngOnInit(): void {
  }
  passwordform = new FormGroup({
    opassword: new FormControl('',[Validators.required]),
    npassword:new FormControl('',[Validators.required]),
  })
  changepassword(){
   this.http.changepass(this.router.snapshot.params['id'],this.passwordform.value).subscribe((res:any)=>{
     this.sucess = res.message
     this.notification.success(res.message)
     this.notification.success('Password Changed Successfully')
   },(err=>{
     console.log(err);
     this.error = err.error.err.message
     this.notification.error(this.error)
   }))
    
  }
  get opassword(){return this.passwordform.get('opassword')}
  get npassword(){return this.passwordform.get('npassword')}
}
