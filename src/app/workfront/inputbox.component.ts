import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
    selector: 'app-inputbox',
    templateUrl: './inputbox.component.html',
    styles: [`
    .commentbox{
        margin: 10px auto; 
    }
    mat-card{
        margin: 25px;
        padding: 5px;
        width: 80%;
    }
    input{
        width: 340px;
        height: 100px;
        margin: 10px;
    }
    button{
        margin: 10px;
        padding:5px;
    }
    `],
})
export class InputboxComponent implements OnInit{
    constructor(@Inject(MAT_DIALOG_DATA) private data:any,){}
    
    
ngOnInit(): void {
    console.log(this.data);
}
post(datas:any){
console.log(datas);
this.data.comments.push(datas.comment)
}
}