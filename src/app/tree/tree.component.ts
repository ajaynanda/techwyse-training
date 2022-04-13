import { Component, OnInit } from '@angular/core';
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
  user: any=[]
  userdata:Object[]=[]
  users: Object[] = []
  treearray = new treearray()
  data: any = []
  datarray: any = []
  childuser: any
  nestedArray = [
    {
      title: 'Parent 1',
      id: '1', // Make sure ID is in string as to attach it with cdkDropListConnectedTo we need it in string
      child: [
        {
          title: 'Child 11',
        },
        {
          title: 'Child 12',
        },
        {
          title: 'Child 13',
        },
      ],
    },
    {
      title: 'Parent 2',
      id: '2',
      child: [
        {
          title: 'Child 21',
        },
        {
          title: 'Child 22',
        },
        {
          title: 'Child 23',
        },
      ],
    },
    {
      title: 'Parent 3',
      id: '3',
      child: [
        {
          title: 'Child 31',
        },
        {
          title: 'Child 32',
        },
        {
          title: 'Child 33',
        },
      ],
    },
  ];
  idList :any= [];
  idsList:any=[];
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
      this.userdata=res.data
      console.log(this.userdata);
      this.idList=res.data.map((parent:any) => {
        return parent._id
       })
       this.idsList=this.idList
       console.log(this.idList);
      this.childuser = res.data.Childrens
      this.user.forEach((element: any) => {
        element['isEdit'] = false
        element.Childrens.map((o: any) => {
          this.data.push(o)
        })
      })
      const TREE_DATA: TeamNode[] = this.user
      this.dataSource.data = TREE_DATA;
    
    })
   
  }
  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;
  ngOnInit(): void {
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
      moveItemInArray(event.container.data,event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
 
    }
  }
  dropItem(event:any) {
    console.log(event); 
    if (event.container === event.previousContainer) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      this.http.findteambyid(event.container.id,event.previousIndex,event.currentIndex).subscribe((res:any)=>{
        console.log(res);   
      },(err=>{
        console.log(err);    
      }))
    }    
     else {
    const ids=event.previousContainer.data[event.previousIndex]._id
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
           this.http.arrayremoveitem(event.previousContainer.id,ids,event.previousIndex,event.container.id,event.currentIndex).subscribe((res:any)=>{
             console.log(res);        
           },(err=>{
             console.log(err);
             
           }))
    }
  }
  ondrop(event: CdkDragDrop<string[]>) {
    console.log(event);
    console.log(event.container,event.previousContainer);
    if (event.container === event.previousContainer) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      console.log(event.previousContainer.data,event.container.data);
      
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


