import { Component, Inject, inject } from '@angular/core';
import {
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { NgFor } from '@angular/common';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { TaskService } from '../../../services/task.service';

@Component({
  selector: 'app-add-edit-task',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatSelectModule,
    MatDialogModule,
    MatButtonModule,
    NgFor,
  ],
  templateUrl: './add-edit-task.component.html',
  styleUrl: './add-edit-task.component.scss',
  providers: [provideNativeDateAdapter()],
})
export class AddEditTaskComponent {
  taskForm!: FormGroup;
  private fb = inject(NonNullableFormBuilder);
  private taskService = inject(TaskService);

  constructor(
    private _dialogRef: MatDialogRef<AddEditTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  priority = ['', 'Low', 'Medium', 'High'];
  status = ['', 'Pending', 'In Progress', 'Completed'];

  ngOnInit() {
    this.initForm();
    this.taskForm.patchValue(this.data);
  }

  initForm() {
    this.taskForm = this.fb.group({
      title: this.fb.control('', Validators.required),
      description: this.fb.control('', Validators.required),
      dueDate: this.fb.control('', Validators.required),
      priority: this.fb.control('', Validators.required),
      status: this.fb.control('', Validators.required),
    });
  }

  formSubmit() {
    if (this.taskForm.valid) {
      if (this.data) {
        this.taskService
          .updateTask(this.data.id, this.taskForm.value)
          .subscribe({
            next: (val: any) => {
              alert('Task updated!');
              this._dialogRef.close(true);
            },
            error: (err: any) => {
              console.error(err);
            },
          });
      } else {
        this.taskService.addTask(this.taskForm.value).subscribe({
          next: (val: any) => {
            alert('Task added!');
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          },
        });
      }
    }
  }
}
