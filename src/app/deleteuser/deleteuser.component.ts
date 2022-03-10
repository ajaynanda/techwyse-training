import { Component, Inject,OnInit } from '@angular/core';
import { MatDialog, MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Emitters } from 'src/Emmitters/emmitter';
import { ApiserviceService } from '../apiservice.service';
import { NotificationService } from '../notification.service';
@Component({
  selector: 'app-deleteuser',
  templateUrl: './deleteuser.component.html',
  styleUrls: ['./deleteuser.component.css']
})
export class DeleteuserComponent implements OnInit {
  authenticated=false
  constructor(private http:ApiserviceService,
    private route:Router,
    private notification:NotificationService,
   private dialog:MatDialogRef<DeleteuserComponent>,
    @Inject(MAT_DIALOG_DATA) private editdata:any) { }

  ngOnInit(): void {
    console.log(this.editdata.Firstname);
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
