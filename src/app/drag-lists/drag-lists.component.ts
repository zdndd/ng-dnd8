import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import * as _ from 'lodash';
@Component({
  selector: 'app-drag-lists',
  templateUrl: './drag-lists.component.html',
  styleUrls: ['./drag-lists.component.less']
})
export class DragListsComponent implements OnInit {

  leftData = {
    "0": [
      {
        "id": 1,
        "title": "知识点1",
        "type": 1
      },
      {
        "id": 6,
        "title": "---技能点1",
        "type": 2
      },
      {
        "id": 7,
        "title": "---技能点2",
        "type": 2
      }
    ],
    "1": [
      {
        "id": 2,
        "title": "知识点2",
        "type": 1
      },
      {
        "id": 8,
        "title": "--技能点33",
        "type": 2
      }
    ],
    "2": [
      {
        "id": 3,
        "title": "知识点3",
        "type": 1
      }
    ],
    "3": [
      {
        "id": 4,
        "title": "知识点4",
        "type": 1
      },
      {
        "id": 9,
        "title": "--技能点44",
        "type": 2
      }
    ],
    "4": [
      {
        "id": 5,
        "title": "知识点5",
        "type": 1
      }
    ],
    "5": [
      {
        "id": 10,
        "title": "--技能点55",
        "type": 2
      },
      {
        "id": 12,
        "title": "--技能点66",
        "type": 2
      }
    ]
  }

  rightData = {
    "topologyTreeTitle": "从入门到精通——新员工Excel图表入门",
    "modules": [
      {
        "id": "12",
        "title": "模块1",
        "goal": "",
        "skills": []
      },
      {
        "id": "13",
        "title": "模块2",
        "goal": "模块目标内容：内容详情内容详情内容详情...",
        "skills": []
      },
      {
        "id": "17",
        "title": "模块3",
        "goal": "",
        "skills": []
      }
    ]
  }

  isModuleDesign = true
  lock: Boolean = true;
  initData: any = []
  lockData = []
  unlockData = []
  demoData = []


  constructor(

  ) { }

  ngOnInit() {
    let _arr = Object.values(this.leftData)
    this.initData = _.cloneDeep(_arr)
    this.demoData = _arr
    this.getLockData()
    this.rightDeleData()
  }

  getLockData() {
    this.lockData = this.demoData
    this.getUnLockData()
  }

  drop(event: CdkDragDrop<string[]>, module?) {
    if (event.previousContainer === event.container) {
      if (module) {
        moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      }

    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
      module.skills = this.flat(module.skills)
      //非锁定状态
      if (!this.lock) {
        this.deleteList(event.item.data.id, this.demoData)
      }
    }

  }

  onLock(e) {
    this.lock = !this.lock
    //非锁定状态后重新获取unlock数据
    if (!this.lock) {
      this.getUnLockData()
    }
  }

  getUnLockData() {
    let _data = _.cloneDeep(this.demoData)
    this.unlockData = this.flat(_data)
  }

  flat(arr) {
    let res = [],
      flatMap = (arr) => {
        arr.map((element, index, array) => {
          if (Object.prototype.toString.call(element).slice(8, -1) === 'Array') {
            flatMap(element);
          } else {
            res.push(element);
          }
        })
      };
    flatMap(arr);
    return res;
  }

  deleteList(id: any, arr) {
    let _data = arr
    _data.forEach((element: any) => {
      element.forEach((mm, index: any) => {
        if (mm.id == id) {
          element.splice(index, 1)
        }
      });
    })
    this.demoData = _data
  }


  skillDelete(currentModule: any, item: any) {

    currentModule.skills.forEach((m, index) => {
      if (m.id == item.id) {

        currentModule.skills.splice(index, 1)
      }
    })
    this.rightDeleData()
  }


  moduleDelete(module, i) {
    this.rightData.modules.splice(i, 1)
    this.rightDeleData()
  }

  rightDeleData() {
    let template: any = []
    this.rightData.modules.forEach(m => {
      template.push(...m.skills)
    })
    if (template.length > 0) {
      let _initData = _.cloneDeep(this.initData)
      template.forEach(m => {
        this.deleteList(m.id, _initData)
      })
    } else {
      this.demoData = _.cloneDeep(this.initData)
    }
    this.getLockData()
  }




}
