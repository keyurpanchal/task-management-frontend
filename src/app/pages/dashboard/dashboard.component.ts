import { Component, inject, ViewChild } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { DatePipe } from '@angular/common';
import { AddEditTaskComponent } from '../../shared/components/add-edit-task/add-edit-task.component';
import { TaskService } from '../../services/task.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    DatePipe,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatPaginator, MatPaginatorModule,
    MatSort, MatSortModule,
    MatTableModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  private _dialog = inject(MatDialog);
  private taskService = inject(TaskService);
  private authService = inject(AuthService);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = [
    '_id',
    'title',
    'description',
    'dueDate',
    'priority',
    'status',
    'action'
  ];

  dataSource!: MatTableDataSource<any>;

  ngOnInit() {
    this.getTaskList();
  }

  openAddEditTaskForm() {
    const dialogRef = this._dialog.open(AddEditTaskComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getTaskList();
        }
      },
    });
  }

  getTaskList() {
    this.taskService.getTasks().subscribe({
      next: (res:any) => {
        this.dataSource = new MatTableDataSource(res.tasks);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: console.log,
    });
  }

  openEditForm(data: any) {
    console.log(data);

    const dialogRef = this._dialog.open(AddEditTaskComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getTaskList();
        }
      },
    });
  }

  deleteTask(id: number) {
    this.taskService.deleteTask(id).subscribe({
      next: (res) => {
        alert('Task deleted!');
        this.getTaskList();
      },
      error: console.log,
    });
  }

  logOut(){
    this.authService.logout();
  }
}
