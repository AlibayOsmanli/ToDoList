import { Component } from '@angular/core';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-task-input',
  templateUrl: './task-input.component.html',
  styleUrls: ['./task-input.component.css']
})
export class TaskInputComponent {
  newTask: string | undefined;

  constructor(private taskService: TaskService) {}

  addTask() {
    if (this.newTask) {
      this.taskService.addTask(this.newTask);
      this.newTask = '';
    }
  }
}
