import { Component, OnInit } from '@angular/core';
import {Observable, Observer } from 'rxjs';
import { ApiserviceService } from '../apiservice.service';
import * as  JSzip from 'jszip'
import * as FileSaver from 'file-saver'
import { NgbNavLink } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup } from '@angular/forms';
import * as saveAs from 'file-saver';
@Component({
  selector: 'app-image-download',
  templateUrl: './image-download.component.html',
  styleUrls: []
})
export class ImageDownloadComponent implements OnInit {
imageUrls:any=["https://workluge-work-files.s3.ap-south-1.amazonaws.com/files/pexels-stijn-dijkstra-2583852.jpg",
                "https://workluge-work-files.s3.ap-south-1.amazonaws.com/files/pexels-flickr-145939.jpg",
                "https://workluge-work-files.s3.ap-south-1.amazonaws.com/files/low-cost-simple-houseplan-kerala.jpg"]
base64Image: any;
  newimage: any;
  imagechange: any;
zipimage:any
files:any
  base64forzipImage:any=[];
  constructor(private service:ApiserviceService) { }

  ngOnInit(): void {
  }
downloadImage(imageUrl:any){
 
this.getbase64fromURL(imageUrl).subscribe((base64data:any)=>{
this.base64Image= 'data:image/jpg;base64,' + base64data;
let link =document.createElement('a')
document.body.appendChild(link)
link.setAttribute('href',this.base64Image)
link.setAttribute('download','images.jpg')
link.click()
})
}
getbase64fromURL(url:string){
  return Observable.create((observer:Observer<string>)=>{
    const img=new Image() as HTMLImageElement
img.crossOrigin='anonymous'
 img.src=url + '?' 
if(!img.complete){
  img.onload=()=>{
      observer.next(this.base64Images(img))
      observer.complete()
  }
  img.onerror=(err)=>{
    observer.error(err)
  }
}else{
  observer.next(this.base64Images(img))
}
  })
}
base64Images(img:HTMLImageElement){
  const canvas=document.createElement('canvas') as HTMLCanvasElement
  canvas.width=img.width
  canvas.height=img.height
  const context = canvas.getContext('2d') as CanvasRenderingContext2D
  context.drawImage(img, 0, 0);
  const dataURL= canvas.toDataURL('image/jpg') as string
  return dataURL.replace(/^data:image\/(png|jpg);base64,/, '');
}

downloadZipImage(data:any){
//   console.log(data);
//   this.getbase64fromURL(data.images).subscribe((base64data:any)=>{
//     this.base64forzipImage.push( 'data:image/jpg;base64,' + base64data);
//     const jszip = new JSzip();
//     for(let i = 0; i < this.base64forzipImage.length; i++) {
//     var binary = atob(this.base64forzipImage[i].split(',')[1]);





































































































































































































































































//         var array = [];
//       for (let j = 0; j < binary.length; j++) {
//         array.push(binary.charCodeAt(j));
//       }
//     let image = new Blob([new Uint8Array(array)], {
//         type: 'image/zip'
//     });
//     jszip.file(`hello${i}.jpg`, image)
//     if(i === (this.base64forzipImage.length -1)){
//       jszip.generateAsync({ type: 'blob' }).then(function(content) {
//         // see FileSaver.js
//         saveAs(content, 'imagezipped.zip');   
//       });
//     }
//   }
// })
this.getbase64fromURL(data).subscribe((basedata:any)=>{
  console.log(data);

  this.service.zipfile(data).subscribe((result:any)=>{
    console.log(result);
     let link =document.createElement('a')
     document.body.appendChild(link)
     const url ='data:image/zip;base64,' + basedata;
     link.setAttribute('href',url)
     link.setAttribute('download',"image.zip")
     console.log(link)
     link.click()
})
})
   
}
}






