import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiserviceService } from '../apiservice.service';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})
export class ChangepasswordComponent implements OnInit {
error:any
sucess:any
  constructor(private http:ApiserviceService,private router:ActivatedRoute) { }

  ngOnInit(): void {
  }
  passwordform = new FormGroup({
    opassword: new FormControl('',[Validators.required]),
    npassword:new FormControl('',[Validators.required]),
  })
  changepassword(){
   this.http.changepass(this.router.snapshot.params['id'],this.passwordform.value).subscribe((res:any)=>{
     console.log(res.message);
     this.sucess = res.message
   },(err=>{
     console.log(err);
     this.error = err.error.message
   }))
    
  }
  get opassword(){return this.passwordform.get('opassword')}
  get npassword(){return this.passwordform.get('npassword')}
}
