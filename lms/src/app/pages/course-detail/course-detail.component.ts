import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CoursesService } from '../../services/courses.service';
import { ICourse } from '../../models/ICourses';
import { ILesson } from '../../models/ILessons';
import { FormsModule } from '@angular/forms';
import { Util } from '../../utils/util';

@Component({
  selector: 'app-course-detail',
  imports: [FormsModule],
  templateUrl: './course-detail.component.html',
  styleUrl: './course-detail.component.css'
})
export class CourseDetailComponent {

  course: ICourse | null = null;
  lessons: ILesson[] = [];
  role: string | null = null;
  newLessonTitle: string = '';
  newLessonContent: string = '';
  showDropdown = false;
  

  constructor(private route: ActivatedRoute, private coursesService: CoursesService, private router: Router) { 

    this.route.params.subscribe(params => {
      
      // ID'yi direkt string olarak alıyoruz (örneğin '1' veya 'a131')
      const courseId = params['id'];
      if (courseId) {
        this.coursesService.courseById(courseId).subscribe({
          next: value => {
            this.course = value;
            this.role = localStorage.getItem('userRole');
            

            // Dersleri çek
            this.coursesService.getLessonsByCourse(value.id).subscribe({
              next: lessonValue => {
                this.lessons = lessonValue;
              },
              error: err => {
                console.error('Lessons not found:', err);
              }
            });

          },
          error: err => {
            // Kurs bulunamazsa hata mesajı verilir ve yönlendirme yapılır
            alert("Course not found: " + courseId);
            this.router.navigate(['/home']);
          }
        });
      } else {
        // Parametrede ID yoksa
        alert("Invalid course ID provided.");
        this.router.navigate(['/home']);
      }
    });
  }

  addLesson() {
    if (!this.newLessonTitle.trim() || !this.course) return;

    const newLesson: Omit<ILesson, 'id'> = { // id yok, JSON-server atıyor
      courseId: this.course.id,
      title: this.newLessonTitle,
      content: this.newLessonContent
    };

    this.coursesService.addLesson(newLesson).subscribe({
      next: (createdLesson) => {
        this.lessons.push(createdLesson); // id artık number
        this.newLessonTitle = '';
        this.newLessonContent = '';
        this.showDropdown = false;
      },
      error: (err) => console.error('Ders eklenirken hata oluştu:', err)
    }); 
}
}