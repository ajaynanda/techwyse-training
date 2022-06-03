import { Component, OnInit } from '@angular/core';
import {Observable, Observer } from 'rxjs';
import { ApiserviceService } from '../apiservice.service';
import { FormControl, FormGroup} from '@angular/forms';
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
  

  constructor(private service:ApiserviceService) { }

  ngOnInit(): void {
  }
downloadImage(imageUrl:any){
this.getbase64fromURL(imageUrl).subscribe((base64data:any)=>{
this.base64Image= 'data:image/jpg;base64,' + base64data;
let link =document.createElement('a')
document.body.appendChild(link)
link.setAttribute('href',this.base64Image)
link.setAttribute('download','image.jpg')
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
  const dataURL= canvas.toDataURL('image/png') as string
  return dataURL.replace(/^data:image\/(png|jpg);base64,/, '');
}

downloadZipImage(images:String){
  console.log(images);
    this.service.zipfile(images).subscribe((result:any)=>{
     console.log(result);

     this.getbase64fromURL(result.url).subscribe((base64data:any)=>{
      this.base64Image= 'data:image/jpg;base64,' +result.buffer;
      console.log(this.base64Image);
     
      let link =document.createElement('a')
      document.body.appendChild(link)
      link.setAttribute('href',this.base64Image)
      link.setAttribute('download',"image.jpg")
      link.click()
    })
})
}

}






