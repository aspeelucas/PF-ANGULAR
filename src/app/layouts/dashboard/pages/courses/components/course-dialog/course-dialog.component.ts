import { Component, Inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ICourse } from '../../models/courses.models';
import { AlertService } from '../../../../../../core/services/alert.service';


@Component({
  selector: 'app-course-dialog',
  templateUrl: './course-dialog.component.html',
  styleUrl: './course-dialog.component.scss',
})
export class CourseDialogComponent {
  courseForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CourseDialogComponent>,
    private alertService: AlertService,
    @Inject(MAT_DIALOG_DATA) private editCourse?: ICourse
  ) {
    this.courseForm = this.fb.group({
      nameCourse: this.fb.control('', Validators.required),
      start: this.fb.control('', Validators.required),
      end: this.fb.control('', Validators.required),
      price: this.fb.control('', Validators.required),
    });

    if (editCourse) {
      this.courseForm.patchValue(editCourse);
    }
  }

  onSave() {
    if (this.courseForm.invalid) {
      this.courseForm.markAllAsTouched();
      this.alertService.showAlert({
        title: 'Error',
        text: 'Por favor, completa el formulario',
        icon: 'error',
        confirmButtonText: 'Aceptar',
      });
    } else {
      this.dialogRef.close(this.courseForm.value);
    }
  }

  getErrorMessage(field: string): ValidationErrors | null {
    return this.courseForm.get(field)?.errors || null;
  }
}
