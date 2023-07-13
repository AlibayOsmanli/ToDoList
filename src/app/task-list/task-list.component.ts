import { Component, OnInit } from '@angular/core';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tasks: string[] = [];
  taskBackgrounds: { [key: string]: string } = {};

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.taskService.taskAdded$.subscribe((task: string) => {
      this.tasks.push(task);
      this.saveTasks();
    });

    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      this.tasks = JSON.parse(savedTasks);
    }

    const savedTaskBackgrounds = localStorage.getItem('taskBackgrounds');
    if (savedTaskBackgrounds) {
      this.taskBackgrounds = JSON.parse(savedTaskBackgrounds);
    }
  }

  private saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
    localStorage.setItem('taskBackgrounds', JSON.stringify(this.taskBackgrounds));
  }

  removeTask(task: string) {
    const index = this.tasks.indexOf(task);
    if (index !== -1) {
      this.tasks.splice(index, 1);
      delete this.taskBackgrounds[task];
      this.saveTasks();
    }
  }

  markTaskAsDone(task: string) {
    if (this.taskBackgrounds[task] === 'green') {
      this.taskBackgrounds[task] = 'bisque';
    } else {
      this.taskBackgrounds[task] = 'green';
    }
    this.saveTasks();
  }

  clearAll() {
    this.tasks.splice(0);
    this.taskBackgrounds = {};
    this.saveTasks();
  }
}
