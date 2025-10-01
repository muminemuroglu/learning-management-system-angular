import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CoursesService } from '../../services/courses.service';
import { ICourse } from '../../models/ICourses';
import { ILesson } from '../../models/ILessons';

@Component({
  selector: 'app-course-detail',
  imports: [],
  templateUrl: './course-detail.component.html',
  styleUrl: './course-detail.component.css'
})
export class CourseDetailComponent {

  course: ICourse | null = null;
  lessons: ILesson[] = [];
  role: string | null = null

  constructor(private route: ActivatedRoute, private coursesService: CoursesService, private router: Router) { 

    this.route.params.subscribe(params => {
      const id = Number(params['id']);

      if (!Number.isNaN(id) && id > 0) {
        this.coursesService.courseById(id).subscribe({
          next: value => {
            this.course = value;
            this.role = localStorage.getItem('userRole');

            // Dersleri çek
            this.coursesService.getLessonsByCourse(value.id).subscribe({
              next: value => {
                this.lessons = value;
              },
              error: err => {
                console.error('Lessons not found:', err);
              }
            });

          },
          error: err => {
            alert("Course not found " + id);
            this.router.navigate(['/home']);
          }
        });
      } else {
        alert("Not found course " + params['id']);
        this.router.navigate(['/home']);
      }

    });

  }

}