import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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
authenticated= true
  constructor(private http:ApiserviceService,private router:ActivatedRoute,private notification:NotificationService,private dialog:MatDialogRef<ChangepasswordComponent>,
    @Inject(MAT_DIALOG_DATA) private id:any,private formbuilder:FormBuilder) { }

  ngOnInit(): void {
  }
  passwordform = this.formbuilder.group({
    opassword: new FormControl('',[Validators.required,Validators.minLength(6)]),
    npassword:new FormControl('',[Validators.required,Validators.minLength(6)]),
    cpassword:new FormControl('',Validators.required)
  },{
      validators:this.mustmatch('npassword','cpassword')
    })
  changepassword(){
    console.log(this.id._id);
    
   this.http.changepass(this.id._id,this.passwordform.value).subscribe((res:any)=>{
     this.sucess = res.message
     this.notification.success(res.message)
     this.notification.success('Password Changed Successfully')
     this.authenticated = true
   },(err=>{
     console.log(err);
     this.error = err.error.err.message
     this.notification.error(this.error)
   }))
    
  }
  get opassword(){return this.passwordform.get('opassword')}
  get npassword(){return this.passwordform.get('npassword')}
  close(){
    this.dialog.close()
  }
  mustmatch(npassword:any,cpassword:any){
    return (formGroup:FormGroup)=>{
      const npasswordcontrol=formGroup.controls[npassword]
      const cpasswordcontrol=formGroup.controls[cpassword]
      if(cpasswordcontrol.errors && !cpasswordcontrol.errors['mustmatch']){
        return 
      }
      if(npasswordcontrol.value!=cpasswordcontrol.value){
        cpasswordcontrol.setErrors({mustmatch:true})
      }else{
        cpasswordcontrol.setErrors(null)
      }
    }
  }
  get cpass(){return this.passwordform.get('cpassword')}
  get f(){
    return this.passwordform.controls
  }
}
