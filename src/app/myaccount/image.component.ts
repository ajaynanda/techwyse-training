import { Component, OnInit } from '@angular/core';
import { ImageCroppedEvent} from 'ngx-image-cropper';
import { ApiserviceService } from '../apiservice.service';
import { NotificationService } from '../notification.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
const uri = "http://localhost/4000/public";
@Component({
    selector: 'app-myaccount',
    templateUrl: './image.component.html',
    styles: [`
    #upload{
        padding:5px;
        margin:10px 10px;
    }
    #close{
        float:right;
    }
    `]
})
export class ImageComponent implements OnInit {
    imagefiles = false
    user: any
    imagechange: any = ''
    filename: any
    cropImgPreview: any
    imageEvent: any
    uploadForm: any = FormGroup
    cropImgPreviewfilename: any
    previews = false
    newimage: any
    cropped = false
    constructor(private http: ApiserviceService, private notification: NotificationService, private formbuilder: FormBuilder,private dialog:MatDialogRef<ImageComponent>) {

    }
    ngOnInit(): void {
        this.uploadForm = this.formbuilder.group({
            Image: String,
            imageurl:String,
            cropimg: String,
        })
        const name = JSON.parse(localStorage.getItem('userdata') || '{}');
        const id = name._id
        this.http.getuserbyid(id).subscribe((res: any) => {
            this.user = res.data
        })
    }
    base64ToFile(data: any, filename: any) {
        const arr = data.split(',');
        const mime = arr[0].match(/:(.*?);/)[1];
        const bstr = atob(arr[1]);
        let n = bstr.length;
        let u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, { type: mime });
    }
    cropImg(e: ImageCroppedEvent) {
        this.cropImgPreview = e.base64
        this.cropped = true
        this.cropImgPreviewfilename = this.base64ToFile(
            e.base64,
            this.filename.name,
        )
        console.log(this.cropImgPreviewfilename);
        return this.cropImgPreviewfilename
    }
    preview() {
        this.previews = true
    }
    filers(event: any) {
        if (event.target.files) {
            this.imageEvent = event
            let reader = new FileReader()
            reader.readAsDataURL(event.target.files[0])
            reader.onload = (event: any) => {
                this.newimage = reader.result as string
                this.imagefiles = true
                this.imagechange = event.target.result

            }
        }
        this.filename = event.target.files[0]
        const file = event.target.files[0]
        this.uploadForm.get('Image').setValue(file.name)
        this.uploadForm.get('imageurl').setValue(uri + file.name)
        this.uploadForm.get("cropimg").setValue(file.name)
        console.log(this.uploadForm);
    }
    imgLoad() {
        this.notification.success("image is loading")
    }
    initCropper() {
    }
    imgFailed() {
        this.notification.error("image failed to show")
    }
    remove() {
        this.cropped = false
        this.uploadForm.reset()
        this.imagefiles = false
        this.imagechange = null
        this.cropImgPreview = this.imagechange
        this.cropImgPreviewfilename=this.filename
        this.previews = false
    }
    deleteprofile(id:any,profile:any,crop:any){
        this.http.deleteprofile(id,profile,crop).subscribe((res)=>{
            console.log(res);
            this.dialog.close(ImageComponent)
            this.notification.error("Profile Photo Deleted")
        },(err=>{
            console.log(err);       
            this.notification.success("No Profile Photo")
        }))
    }
    postimage(id: any, data: any) {
        console.log(data);
        const formdata = new FormData()
        formdata.append('images', this.filename)
        formdata.append('cropimg', this.cropImgPreviewfilename || this.filename)
        this.http.photouplaod(id, formdata).subscribe((result) => {
            console.log(result)
            this.notification.success("Profile image uploaded")
            this.dialog.close(ImageComponent)
        }, (err => {
            this.notification.error(err.error.message)
            console.log(err);
        }))
    }
    cancel(){
        this.dialog.close(ImageComponent)
    }
}
