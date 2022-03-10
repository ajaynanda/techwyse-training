import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiserviceService } from '../apiservice.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { DeleteuserComponent } from '../deleteuser/deleteuser.component';
import { RegisterComponent } from '../register/register.component';
import { UpdateComponent } from '../update/update.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent implements OnInit {
  datas: any
  displayedColumns = ["Firstname", "Email", "Gender", "dateofbirth", "Proffession", "actions"]
  elements: any
  dataSource!: MatTableDataSource<any>
  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private http: ApiserviceService, private dialog: MatDialog, private router: Router) { }
  searchText: any
  ngOnInit(): void {
    this.http.getalldata().subscribe((res: any) => {
      this.dataSource = new MatTableDataSource(res.data)
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator
    })
  }
  filter($event: any) {
    this.dataSource.filter = $event.target.value
  }
  openDialog(row: any, id: any) {
    this.dialog.open(DeleteuserComponent, {
      width: '50%',
      data: row
    })
    this.router.navigate([`/userlist`])
  }
  adduser() {
    
    this.dialog.open(RegisterComponent,{
      width:'30%'
    })
  }
  edituser(row: any, id: any) {
    this.dialog.open(UpdateComponent, {
      width: '30%',
      data: row
    })
    this.router.navigate([`/userlist`])
    this.http.getuserbyid(id).subscribe((res: any) => {
      console.log("here");
      this.datas = res.data
    })
  }
}
