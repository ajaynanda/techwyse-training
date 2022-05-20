import { Component, OnInit, Query, ViewChild } from '@angular/core';
import { ApiserviceService } from '../apiservice.service';
import { FlatTreeControl, TreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AddComponent } from './add.component';
import { NotificationService } from '../notification.service';
import { treearray } from '../myaccount/array.model'
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { MatExpansionPanel } from '@angular/material/expansion';
import { PageSettingsModel, SortSettingsModel, EditSettingsModel, ToolbarItems, FilterSettingsModel, TreeGridComponent ,SelectionSettingsModel} from '@syncfusion/ej2-angular-treegrid'
import { DataManager, WebApiAdaptor } from '@syncfusion/ej2-data'
import { ClickEventArgs } from '@syncfusion/ej2-angular-navigations'
import { ToastComponent } from '@syncfusion/ej2-angular-notifications';
import {PdfExportProperties,ExcelExportProperties} from '@syncfusion/ej2-grids'
interface TeamNode {
  Name: string;
  Team: string;
  Position: string;
  Teamid: string;
  _id: string,
  Childrens?: TeamNode[];
}

interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  position: string;
  team: string;
  teamid: string;
  id: string;
  level: number;
}


@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.css']
})

export class TreeComponent implements OnInit {
  public selection!:SelectionSettingsModel
  public filterSettings!: FilterSettingsModel
  public pageSettings!: Object
  public toolbar!: ToolbarItems[]
  public editsettings!: EditSettingsModel
  public sort!: SortSettingsModel
  user: any = []
  userdata:Object[]=[]
  users: any = []
  treearray = new treearray()
  data: any = []
  datarray: any = []
  childuser: any = []
  idList: any = [];
  idsList: any = [];
  public datamanager!: DataManager;
  todo = ['Get to work', 'Pick up groceries', 'Go home', 'Fall asleep'];

  done = ['Get up', 'Brush teeth', 'Take a shower', 'Check e-mail', 'Walk dog'];
  private _transformer = (node: TeamNode, level: number) => {
    return {
      expandable: !!node.Childrens && node.Childrens.length > 0,
      name: node.Name,
      position: node.Position,
      team: node.Team,
      teamid: node.Teamid,
      id: node._id,
      level: level,
    };
  }

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level, node => node.expandable);

  treeFlattener = new MatTreeFlattener(
    this._transformer, node => node.level, node => node.expandable, node => node.Childrens)
  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
  addteamform = new FormGroup({
    name: new FormControl('', [Validators.required]),
    team: new FormControl('', [Validators.required]),
    teamid: new FormControl('', [Validators.required]),
    position: new FormControl('', [Validators.required])
  })


  constructor(private http: ApiserviceService, private dialog: MatDialog, private notification: NotificationService) {

    this.http.findteam().subscribe((res: any) => {
      this.user = res.data
      this.userdata = res.data
      console.log(this.userdata);

      this.idList = res.data.map((parent: any) => {
        return parent._id
      })
      this.idsList = this.idList
      console.log(this.idList);
      this.childuser = res.data.Childrens
      this.user.forEach((element: any) => {


        element['isEdit'] = false
        element.Childrens.map((o: any) => {
          this.data.push(o)
          console.log(this.data);

        })
      })
      const TREE_DATA: TeamNode[] = this.user
      this.dataSource.data = TREE_DATA;

    })

  }
  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;
  ngOnInit(): void {
    new DataManager({
      url: 'http://localhost:4000/findteam',
      adaptor: new WebApiAdaptor(),
      crossDomain: true
    })
    console.log(this.datamanager);
    this.pageSettings = { pageSize: 4, pageSizes: true }
    this.sort = {
      columns: [{ field: 'Teamid', direction: 'Ascending' },
      { field: 'Name', direction: 'Ascending' },
      { field: 'Position', direction: 'Ascending' }
      ]
    }
    this.editsettings = { allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Dialog' }
    this.toolbar = ['Add', 'Edit', 'Delete', 'Cancel', 'PdfExport', 'CsvExport', 'ExcelExport']
    this.filterSettings = { ignoreAccent: true,hierarchyMode:'None' }
    this.selection={ checkboxMode: 'ResetOnRowClick'}
  }
   @ViewChild('treegrid', { static: false })
// @ViewChild('element')element:any
  public treegrid!: TreeGridComponent
  public position = { X: 'Center' };
  public toolbarClick(args: ClickEventArgs): void {
    console.log(args);

    switch (args.item.text) {
      case 'PDF Export':
        var exportproperties:PdfExportProperties={
          fileName:'team details.pdf',
          header:{
            fromTop:0,
            height:130,
            contents:[{
              type:'Text',
              value:'Team Details',
              position:{x:0,y:60},
              style:{textBrushColor:'#000000',fontSize:30}
            }]
          },
          footer:{
            fromBottom:0,
            height:130,
            contents:[{
              type:'Text',
              value:'End of the Page',
              position:{x:50,y:50},
              style:{textBrushColor:'#000000',fontSize:30}
            }]
          },
          theme:{
            header:{
                fontColor:'#FF7F07',
                fontName:'Calibri',
                fontSize:20,
                bold:true
                
            },
            record:{
              fontColor:'#293DEF',
              fontName:'Calibri',
              fontSize:10,  
              bold:true
            }
          }
        }
      
        this.treegrid.pdfExport(exportproperties);
        break;
      case 'CSV Export':
       
        this.treegrid.csvExport();
        break;
      case 'Excel Export':
        let excelproperties:ExcelExportProperties={
          fileName:'Team Details.xlsx',
          header:{
            headerRows:1,
            rows:[{
              cells:[{
                colSpan:4,
                value:'Team Details',
                style:{
                  fontColor:'#293DEF',
                  fontSize:15,
                  fontName:'Calibri',
                  hAlign:"Center"
                }
              }]
            }]
          },
          footer:{
            footerRows:1,
            rows:[{
              cells:[{
                colSpan:4,
                value:'End Of the Page',
                style:{
                  fontColor:'#293DEF',
                  fontSize:15,
                  fontName:'Calibri',
                  hAlign:"Center"
                }
              }]
            }]
          },
          theme:{
            header:{
                fontColor:'#FF7F07',
                fontName:'Calibri',
                fontSize:20,
                bold:true
                
            },
            record:{
              fontColor:'#293DEF',
              fontName:'Calibri',
              fontSize:10,  
              bold:true
            }
          }
      }
        this.treegrid.excelExport(excelproperties);
        break;
    }
  }
  onCreate(e:any): void {
    // this.element.show();
  }
  btnClick(e:any): void {
    // this.element.show();
  }
  update(data: any) {
    console.log(data);
    this.dialog.open(AddComponent, {
      width: '40%',
      data: data
    })
  }
  onindrop(event: CdkDragDrop<string[]>) {
    console.log(event.container.data, event.previousIndex, event.currentIndex);
    console.log(event.previousContainer, event.container);
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }
  dropItem(event: any) {
    console.log(event);
    if (event.container === event.previousContainer) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      this.http.findteambyid(event.container.id, event.previousIndex, event.currentIndex).subscribe((res: any) => {
        console.log(res);
      }, (err => {
        console.log(err);
      }))
    }
    else {
      const ids = event.previousContainer.data[event.previousIndex]._id
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      this.http.arrayremoveitem(event.previousContainer.id, ids, event.previousIndex, event.container.id, event.currentIndex).subscribe((res: any) => {
        console.log(res);
      }, (err => {
        console.log(err);

      }))
    }
  }
  ondrop(event: CdkDragDrop<string[]>) {
    console.log(event);
    console.log(event.container, event.previousContainer);
    if (event.container === event.previousContainer) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      console.log(event.previousContainer.data, event.container.data);

      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
  mouseEnterHandler(
    event: MouseEvent,
    chapterExpansionPanel: MatExpansionPanel
  ) {
    if (event.buttons && !chapterExpansionPanel.expanded) {
      chapterExpansionPanel.open();
    }
  }
  drop(event: CdkDragDrop<string[]>) {
    console.log(event.container.data, event.previousIndex, event.currentIndex);
    console.log(event.previousContainer, event.container);

    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }
  indrop(event: CdkDragDrop<string[]>) {
    console.log(event.previousIndex, event.currentIndex);
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);

    } else {
      console.log(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
      transferArrayItem(
        this.user,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }
  childdrop(event: CdkDragDrop<string[]>) {
    console.log(this.data, event.previousIndex, event.currentIndex);
    if (event.previousContainer === event.container) {
      moveItemInArray(this.data, event.previousIndex, event.currentIndex);
    } else {
      console.log(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
      transferArrayItem(
        this.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }
  remove() {
    this.treearray = new treearray()
    this.datarray.splice(this.treearray)
  }
  addteamleaderform() {
    this.treearray = new treearray()
    this.datarray.push(this.treearray)
  }
  deleteteam(id: any) {
    alert("Are you sure to delete")
    this.http.deleteteam(id).subscribe((res) => {
      console.log(res);
      this.notification.error("Team leader deleted sccessfully")
    })
  }
  addteam() {
    console.log(this.addteamform.value);
    this.http.addteam(this.addteamform.value).subscribe((res) => {
      console.log(res);
      this.notification.success("Team leader added successfully")
    })
  }
  deletechild(id: any, childid: any) {
    console.log(id);
    console.log(childid);
    this.http.deletechild(id, childid).subscribe((res) => {
      console.log(res);
      this.notification.error("Team Member deleted sccessfully")
    })
  }
  add(data: any) {
    console.log(data.name);
    this.dialog.open(AddComponent, {
      width: '40%',
      data: data
    })
  }
}


