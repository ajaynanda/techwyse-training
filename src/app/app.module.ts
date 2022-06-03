import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component'
import { ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import  {DashboardComponent} from './dashboard/dashboard.component';
import { MyaccountComponent } from './myaccount/myaccount.component';
import { UpdateComponent } from './update/update.component';
import { ChangepasswordComponent } from './changepassword/changepassword.component'
import { MatDialogModule } from '@angular/material/dialog';
import { DeleteuserComponent } from './deleteuser/deleteuser.component'
import { TokenInterceptor } from './token.interceptor';
import { UserlistComponent } from './userlist/userlist.component';
import { FormsModule } from '@angular/forms';
import {MatTableModule} from '@angular/material/table'
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card'
import {  MatSnackBarModule } from '@angular/material/snack-bar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap'
import { ImageComponent } from './myaccount/image.component';
import {ImageCropperModule} from 'ngx-image-cropper';
import { InlineditComponent } from './inlinedit/inlinedit.component';
import {Ng2SearchPipeModule} from 'ng2-search-filter';
import {Ng2OrderModule} from "ng2-order-pipe";
import {NgxPaginationModule} from 'ngx-pagination';
import { TreeComponent } from './tree/tree.component';
import {MatTreeModule} from '@angular/material/tree';
import { ExcelExportService, TreeGridModule} from '@syncfusion/ej2-angular-treegrid';
import { PageService, SortService, FilterService ,ToolbarService,EditService, PdfExportService} from '@syncfusion/ej2-angular-treegrid';
import { AddComponent } from './tree/add.component';
import {DragDropModule} from '@angular/cdk/drag-drop' ;
import {TreeViewModule} from '@syncfusion/ej2-angular-navigations'
import { MatExpansionModule } from '@angular/material/expansion';
import { ToastModule } from '@syncfusion/ej2-angular-notifications';
import { WorkfrontComponent } from './workfront/workfront.component';
import { InputboxComponent } from './workfront/inputbox.component';
import { ImageDownloadComponent } from './image-download/image-download.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    RegisterComponent,
    MyaccountComponent,
    UpdateComponent,
    ChangepasswordComponent,
    DeleteuserComponent,
    UserlistComponent,
    ImageComponent,
    InlineditComponent,
    TreeComponent,
    AddComponent,
    WorkfrontComponent,
    InputboxComponent,
    ImageDownloadComponent
],  
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatButtonModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatDialogModule,
    HttpClientModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    NgbModule,
    ToastModule,
    ImageCropperModule,
    Ng2SearchPipeModule,
    Ng2OrderModule,
    NgxPaginationModule,
    MatTreeModule,
    TreeGridModule,
    DragDropModule,
    MatCardModule,
    TreeViewModule,
    MatExpansionModule
  ],
  providers:[ PageService,SortService,FilterService,ToolbarService,EditService, PdfExportService,ExcelExportService,{provide:HTTP_INTERCEPTORS,useClass:TokenInterceptor,multi:true}],
  bootstrap: [AppComponent],
  entryComponents:[]
})
export class AppModule { }
