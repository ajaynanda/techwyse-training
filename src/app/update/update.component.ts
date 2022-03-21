import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiserviceService } from '../apiservice.service';
import { NotificationService } from '../notification.service';
import { MAT_DIALOG_DATA,MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  datas:any
  sucessmsg: any
  errormsg: any
  authenticated=false
  button:string = 'save'
  constructor(private http: ApiserviceService, 
    private router: ActivatedRoute,
    private route:Router,
    private notification:NotificationService,
    private dialog:MatDialogRef<UpdateComponent>,
    @Inject(MAT_DIALOG_DATA) private editdata:any,
   ) { }
  Updateform = new FormGroup({
    fname: new FormControl('', [Validators.required]),
    lname: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    dob: new FormControl('', Validators.required),
    gender: new FormControl('', Validators.required),
    prof: new FormControl('', [Validators.required]),
  })
  ngOnInit(): void {
     this.authenticated = true
    this.http.getuserbyid(this.router.snapshot.params['id']).subscribe((res: any) => {
      this.datas = res.data
      this.Updateform = new FormGroup({
        fname: new FormControl(res.data.Firstname),
        lname: new FormControl(res.data.Lastname),
        email: new FormControl(res.data.Email),
        dob: new FormControl(res.data.dateofbirth),
        gender: new FormControl(res.data.Gender),
        prof: new FormControl(res.data.Proffession),
      })
    })
   if(this.editdata){
     this.button = 'Update'
     this.Updateform.controls['fname'].setValue(this.editdata.Firstname)
     this.Updateform.controls['lname'].setValue(this.editdata.Lastname)
     this.Updateform.controls['email'].setValue(this.editdata.Email)
     this.Updateform.controls['dob'].setValue(this.editdata.dateofbirth)
     this.Updateform.controls['gender'].setValue(this.editdata.Gender)
     this.Updateform.controls['prof'].setValue(this.editdata.Proffession)
   }
    
  }
 
  updateuser() {
    this.http.updateuser(this.editdata._id, this.Updateform.value).subscribe((res: any) => {
      console.log(res);
      this.sucessmsg = res.message
      this.authenticated = true
     // this.route.navigate(['userlist'])
      this.notification.success('Updated Successfully')
      this.dialog.close(UpdateComponent)
    }, (err => {
      this.errormsg = err.error.message
      this.notification.error(this.errormsg)
    }))
  }
  get emailformat() { return this.Updateform.get('email') }
  get fname() { return this.Updateform.get('fname') }
  get lname() { return this.Updateform.get('lname') }
  get email() { return this.Updateform.get('email') }
  get prof() { return this.Updateform.get('prof') }
  get dob() { return this.Updateform.get('dob') }
  get gender() { return this.Updateform.get('gender') }
 close(){
   this.dialog.close()
 }
}
