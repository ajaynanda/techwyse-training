import { Component, Inject,OnInit } from '@angular/core';
import {  MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ApiserviceService } from '../apiservice.service';
import { NotificationService } from '../notification.service';
@Component({
  selector: 'app-deleteuser',
  template: `<div class="box">
  <h4>Account will be deleted Permanently</h4>
  <button (click)="close()" class="btn btn-warning">Cancel</button>
  <button class="btn btn-danger" (click)="delete()">Delete</button>
</div>`,
  styles: [
 `  .box{
      background-color: azure;
      padding: 10px;
      margin:10% auto;
      font-family: Verdana, Geneva, Tahoma, sans-serif;
      width: 50%;
      text-align: center;
      }
      .btn{
          padding: 5px;
          margin: 5px;
      }`
  ]
})
export class DeleteuserComponent implements OnInit {
  authenticated=false
  constructor(private http:ApiserviceService,
    private route:Router,
    private notification:NotificationService,
   private dialog:MatDialogRef<DeleteuserComponent>,
    @Inject(MAT_DIALOG_DATA) private editdata:any) { }

  ngOnInit(): void {
  }
  delete(){
    this.http.deleteuser(this.editdata._id).subscribe((res:any)=>{
      this.authenticated=true
      this.route.navigate(['userlist'])
      this.notification.error('User Deleted Sucessfully')
      this.dialog.close(DeleteuserComponent)
    },(err=>{
      console.log(err);
      this.notification.error(err.error.message)
    }))
  }
  close(){
    this.dialog.close()
    
  }
}
