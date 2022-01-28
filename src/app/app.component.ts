import { Component } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from "@angular/forms";
import {v4 as uuidv4} from 'uuid';
import {Todo} from "./todo";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Angular_toDo';
  form: FormGroup;
  tomorrow = new Date();
  toDosValues: Todo[] = [];
  priorities = ["low", "medium", "high"]
  done:boolean = false;
  editTaskId: string = ''
  indexToEdit: number=0
  editMode: boolean = false
  taskListNotEmpty:boolean= false



  taskFormControl = new FormControl('', [Validators.required, Validators.minLength(3)])
  priorityFormControl = new FormControl('', [Validators.required])
  dueDateFormControl = new FormControl('', [Validators.required])
  constructor(private fb: FormBuilder){
    this.tomorrow.setDate(this.tomorrow.getDate()+1)
    this.form = this.fb.group({
      task:this.taskFormControl,
      priority: this.priorityFormControl,
      dueDate: this.dueDateFormControl
    })
  }
  addToDo(){
    console.log("Add toDo")
    let taskId = uuidv4()
    let SingleToDo = new Todo(
      this.form.value.task,
      this.form.value.priority,
      this.form.value.dueDate,
      //formdirective is reset on HTML itself
      taskId
    )

    this.toDosValues.push(SingleToDo)
    this.taskListNotEmpty =true
    // this.form.get("task")?.reset();
    // this.form.get("priority")?.reset();
    // this.form.get("dueDate")?.reset();
    this.taskFormControl.reset();
    this.priorityFormControl.reset();
    this.dueDateFormControl.reset();
    this.form.reset()
    this.form.clearValidators()
    this.form.updateValueAndValidity()
    localStorage.setItem(taskId, JSON.stringify(SingleToDo));
  }

  deleteTask(t:Todo){
    let taskIndex = this.toDosValues.indexOf(t);
    this.toDosValues.splice(taskIndex,1);
    localStorage.removeItem(t.taskId);
  }

  editTask(t:Todo){
    this.editMode = true
    this.indexToEdit = this.toDosValues.indexOf(t)
    let editObject = JSON.parse(localStorage.getItem(t.taskId)!);
    this.editTaskId = t.taskId;
    this.form.setValue({
      task: editObject.task,
      priority: editObject.priority,
      dueDate: editObject.dueDate
    })

  }

  updateTask(form: FormGroupDirective){

  let updateObject = new Todo(
    form.value.task,form.value.priority,form.value.dueDate,this.editTaskId
  )
  this.toDosValues.splice(this.indexToEdit,1,updateObject)
    localStorage.setItem(this.editTaskId, JSON.stringify(updateObject))

    this.taskFormControl.reset();
    this.priorityFormControl.reset();
    this.dueDateFormControl.reset();
    this.editMode= false
  }

}
