import { Component } from '@angular/core';
import { CoursesService } from './courses.serivices';
import { ICourse } from './models/courses.models';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { CourseDialogComponent } from './components/course-dialog/course-dialog.component';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss',
})
export class CoursesComponent {
  displayedColumns: string[] = [
    'id',
    'nameCourse',
    'start',
    'end',
    'price',
    'actions',
  ];
  courses: ICourse[] = [];
  constructor(
    private coursesService: CoursesService,
    public dialog: MatDialog
  ) {
    this.coursesService.getCourses().subscribe({
      next: (courses) => {
        this.courses = courses;
      },
    });
  }

  onCreateCourse(): void {
    this.dialog
      .open(CourseDialogComponent)
      .afterClosed()
      .subscribe({
        next: (result) => {
          if (result) {
            this.coursesService
              .createCourse({ ...result, id: this.courses.length + 1 })
              .subscribe({
                next: (courses) => {
                  this.courses = courses;
                },
              });
          }
        },
      });
  }

  onEditCourse(course: ICourse): void {
    this.dialog
      .open(CourseDialogComponent, {
        data: course,
      })
      .afterClosed()
      .subscribe({
        next: (result) => {
          if (result) {
            this.coursesService.updateCourseById(course.id, result).subscribe({
              next: (courses) => {
                this.courses = courses;
              },
            });
          }
        },
      });
  }

  deleteCourse(id: number) {
    this.coursesService.deleteCourseById(id).subscribe({
      next: (courses) => {
        this.courses = courses;
      },
    });
  }

  showModalDeleted(ev: ICourse): void {
    Swal.fire({
      title: 'Estas seguro que deseas eliminar este curso?',
      text: 'Los cambios no se podran revertirse!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, estoy seguro!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteCourse(ev.id);
      }
    });
  }
}
