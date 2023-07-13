import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private taskAddedSource = new Subject<string>();
  taskAdded$ = this.taskAddedSource.asObservable();

  addTask(task: string) {
    this.taskAddedSource.next(task);
  }
}
