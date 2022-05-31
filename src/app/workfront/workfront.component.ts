import { Component, OnInit } from '@angular/core'
import { MatDialog } from '@angular/material/dialog';
import { InputboxComponent } from './inputbox.component';
import { fabric } from 'fabric';
@Component({
  selector: 'app-workfront',
  templateUrl: './workfront.component.html',
  styleUrls: ['./workfront.component.css']
})
export class WorkfrontComponent implements OnInit {
  comments: boolean = false
  classname = 'cross'
  styles: boolean = false
  arrowclass = 'arrow'
  pointclass = 'pointer'
  array = [
    {
      id: '1',
      name: 'John',
      image: '1648641043969c2.jpg',
      comments: []
    },
  ]
  arrows: boolean = false
  point: boolean = false
  painting: boolean = false;
  arrowed: boolean = false;
  showcomments: boolean = false;
  data: any;
  datas: any;
constructor(private dialog: MatDialog) {}
  ngOnInit(): void {
  }
  showcomment(data: any) {
    console.log(data);
    this.showcomments = true
    this.datas = data
  }
  comment() {
    this.comments = true
  }
  close() {
    this.comments = false
  }
  hidecomments() {
    this.showcomments = false
  }
  select() {
    var originX: any, originY: any, isDown: any, rect: any
    this.styles = true
    this.arrows = false
    let selectionbtnclicks = false
    var canvas = new fabric.Canvas('canvas');
    let select1 = document.getElementById('select')
    select1?.addEventListener('click', selectionclicked)
    function selectionclicked() {
      if (selectionbtnclicks === false) {
        selectionbtnclicks = true
        canvas.on('mouse:down', startrect);
        canvas.on('mouse:move', moverect);
        canvas.on('mouse:up', stoprect);
      }
    }

    function startrect(o: any) {
      console.log("hello");
      isDown = true;
      var pointer = canvas.getPointer(o.e);
      originX = pointer.x;
      originY = pointer.y;
      var pointer = canvas.getPointer(o.e);
      rect = new fabric.Rect({
        left: originX,
        top: originY,
        originX: 'left',
        originY: 'top',
        width: pointer.x - originX,
        height: pointer.y - originY,
        angle: 0,
        borderColor: 'red',
        fill: 'red',
        opacity: 0.2,
        transparentCorners: false
      });
      selects = false
      canvas.selection = true
      rect.setCoords()
      canvas.add(rect);
    }
    let selects: boolean = false

    function moverect(o: any) {
      if (!isDown) return;
      var pointer = canvas.getPointer(o.e);

      if (originX > pointer.x) {
        rect.set({ left: Math.abs(pointer.x) });
      }
      if (originY > pointer.y) {
        rect.set({ top: Math.abs(pointer.y) });
      }

      rect.set({ width: Math.abs(originX - pointer.x) });
      rect.set({ height: Math.abs(originY - pointer.y) });
      selects = true
      canvas.selection = true
      canvas.requestRenderAll();
    }

    const stoprect = (o: any) => {
      isDown = false;
      rect.setCoords()
      if (selects == true) {
        this.dialog.open(InputboxComponent, {
          width: '50',
          height: '50',
          data: this.array[0]
        })
      }
      selectionbtnclicks = false
    }

    const deactivates = document.getElementById('deactivate')
    deactivates?.addEventListener('click', deactive)
    function deactive() {

      canvas.off('mouse:down', startrect)
      canvas.off('mouse:move', moverect)
      canvas.off('mouse:up', stoprect)

    }
  }
  arrow() {
    this.styles = false
    this.arrows = true
    let canvas = new fabric.Canvas('canvas')
    const arrowline = document.getElementById('arrowline')
    const deactivates = document.getElementById('deactivate')
    deactivates?.addEventListener('click', deactive)
    let linebtn = false
    arrowline?.addEventListener('click', lines)
    function lines(): void {
      if (linebtn === false) {
        linebtn = true
        canvas.on('mouse:down', start)
        canvas.on('mouse:move', move)
        canvas.on('mouse:up', stop)
        canvas.selection = false
      }
    }
    let line: any
    let arrowhead1: any
    let mousedown = false
  
    function start(o: any): void {
      //start the line
      mousedown = true
      let pointer = canvas.getPointer(o.e)
      line = new fabric.Line([pointer.x, pointer.y, pointer.x, pointer.y], {
        stroke: 'red',
        strokeWidth: 1,
      })
      //arrowhead style
      arrowhead1 = new fabric.Polygon([
        { x: 0, y: 0 },
        { x: -20, y: -10 },
        { x: -20, y: 10 }
      ], {
        stroke: 'blue',
        strokeWidth: 3,
        fill: 'blue',
        hasControls: false,
        selectable: false,
        top: pointer.y,
        left: pointer.x,
        originX: 'center',
        originY: 'center'
      })
      //adding line and arrow to canvas
      canvas.add(line, arrowhead1)
      canvas.requestRenderAll()
    }

    const stop = () => {
      //mouseup setting
      mousedown = false
      line.setCoords()
      this.arrowed = true
      if (this.arrowed == true) {
        this.dialog.open(InputboxComponent, {
          width: '50',
          height: '50',
          data: this.array[0]
        })
      }
    }
    function move(o: any) {
      //line drawing setting
      if (mousedown === true) {
        let pointer = canvas.getPointer(o.e)
        line.set({
          x2: pointer.x,
          y2: pointer.y
        })
        arrowhead1.set({
          left: pointer.x,
          top: pointer.y,
        })
        //arrowhead angle settings
        let x1 = line.x1
        let y1 = line.y1
        let x2 = pointer.x
        let y2 = pointer.y
        let vheigth = Math.abs(y2 - y1)
        let hwidth = Math.abs(x2 - x1)
        let tanratio = vheigth / hwidth
        let angle = Math.atan(tanratio) * 180 / Math.PI
        if (x2 > x1) {
          if (y2 < y1) {
            arrowhead1.set({
              angle: -angle
            })
          } else if (y2 === y1) {
            arrowhead1.set({
              angle: 0
            })
          } else if (y2 > y1) {
            arrowhead1.set({
              angle: angle
            })
          }
        }
        if (x2 < x1) {
          if (y2 > y1) {
            arrowhead1.set({
              angle: 180 - angle
            })
          } else if (y2 === y1) {
            arrowhead1.set({
              angle: 180
            })
          } else if (y2 < y1) {
            arrowhead1.set({
              angle: 180 + angle
            })
          }
        }
        canvas.requestRenderAll()
      }
    }
    function deactive() {
      //deactivating the function
      canvas.off('mouse:down', start)
      canvas.off('mouse:move', move)
      canvas.off('mouse:up', stop)
      linebtn = false
    }
  }
  pointers() {
    //navbar button
    this.styles = false
    this.arrows = false
    this.point = true
  }
}

