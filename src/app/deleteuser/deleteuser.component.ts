import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Emitters } from 'src/Emmitters/emmitter';
import { ApiserviceService } from '../apiservice.service';
@Component({
  selector: 'app-deleteuser',
  templateUrl: './deleteuser.component.html',
  styleUrls: ['./deleteuser.component.css']
})
export class DeleteuserComponent implements OnInit {

  constructor(private http:ApiserviceService,private router:ActivatedRoute,private route:Router) { }

  ngOnInit(): void {
  }
  delete(){
    console.log(this.router.snapshot.params['id']);
    
    this.http.deleteuser(this.router.snapshot.params['id']).subscribe((res:any)=>{
      console.log(res);
      localStorage.removeItem('userdata')
      localStorage.removeItem('token')
      Emitters.authemitter.emit(false)
      this.route.navigate(['Register'])
    },(err=>{
      console.log(err);
      
    }))
    
  }
  close(){
    this.route.navigate(['dashboard'])
  }
}
