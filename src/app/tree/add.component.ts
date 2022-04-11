import { Component, OnInit,Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ApiserviceService } from '../apiservice.service';
@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styles: [`
  container{
    border-radius:30px;
  }
  form{
    padding:10px;
    margin:5px;
  }
  input{
    padding:10px;
    height:30px;
    border:none;
    border-outline:none;
    margin:10px auto;
  }
  button{
    display:block;
    margin:auto;
  }
  `]
})
export class AddComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) private data:any,private http:ApiserviceService) { }
  addchildForm=new FormGroup({
    name:new FormControl('',[Validators.required]),
    team:new FormControl('',[Validators.required]),
    teamid:new FormControl('',[Validators.required]),
    position:new FormControl('',[Validators.required]),
})
  ngOnInit(): void {     
    if(this.data){
      this.addchildForm.controls['team'].setValue(this.data.team)
      this.addchildForm.controls['teamid'].setValue(this.data.teamid)
      this.addchildForm.controls['name'].setValue('')
      this.addchildForm.controls['position'].setValue('')
  } 
  }
  addchild(data:any){
    console.log(data);
    console.log(this.addchildForm.value);
    this.http.addchild(this.data._id,data).subscribe((res:any)=>{
      console.log(res);  
    })
   }
}