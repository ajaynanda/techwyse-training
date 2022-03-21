import { Injectable } from '@angular/core';
import {MatSnackBar,MatSnackBarConfig} from '@angular/material/snack-bar'
@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private snackbar:MatSnackBar) { }
config:MatSnackBarConfig={
  duration:3000,
  horizontalPosition:'right',
  verticalPosition:'top'
}
  success(msg:any){
    this.config['panelClass'] = ['notification','success']
    this.snackbar.open(msg,'',this.config)
  }
  error(msg:any){
    this.config['panelClass'] = ['notification','error']
    this.snackbar.open(msg,'',this.config)
  }
}
