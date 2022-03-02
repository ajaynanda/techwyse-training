import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ActivatedRoute } from '@angular/router';
import { ApiserviceService } from '../apiservice.service';
@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  sucessmsg: any
  errormsg: any
  Updateform = new FormGroup({
    fname: new FormControl('', [Validators.required]),
    lname: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    dob: new FormControl('', Validators.required),
    gender: new FormControl('', Validators.required),
    prof: new FormControl('', [Validators.required]),
  })
  constructor(private http: ApiserviceService, private router: ActivatedRoute) { }

  ngOnInit(): void {
    this.http.getuserbyid(this.router.snapshot.params['id']).subscribe((res: any) => {
      this.Updateform = new FormGroup({
        fname: new FormControl(res.data.Firstname),
        lname: new FormControl(res.data.Lastname),
        email: new FormControl(res.data.Email),
        dob: new FormControl(res.data.dateofbirth),
        gender: new FormControl(res.data.Gender),
        prof: new FormControl(res.data.Proffession),
      })
    })
  }
  updateuser() {
    this.http.updateuser(this.router.snapshot.params['id'], this.Updateform.value).subscribe((res: any) => {
      console.log(res);
      this.sucessmsg = res.message
    }, (err => {
      this.errormsg = err.message
    }))
  }
  get emailformat() { return this.Updateform.get('email') }
  get fname() { return this.Updateform.get('fname') }
  get lname() { return this.Updateform.get('lname') }
  get email() { return this.Updateform.get('email') }
  get prof() { return this.Updateform.get('prof') }
  get dob() { return this.Updateform.get('dob') }
  get gender() { return this.Updateform.get('gender') }
}
