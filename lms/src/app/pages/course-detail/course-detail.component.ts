import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule, LOCATION_INITIALIZED } from '@angular/common';

import { CoursesService } from '../../services/courses.service';
import { EnrollmentsService } from '../../services/enrollments.service';

import { ICourse } from '../../models/ICourses';
import { ILesson } from '../../models/ILessons';

@Component({
  selector: 'app-course-detail',
  imports: [FormsModule, CommonModule],
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css']
})
export class CourseDetailComponent implements OnInit {
  course: ICourse | null = null;
  lessons: ILesson[] = [];
  role: string | null = null;
  newLessonTitle: string = '';
  newLessonContent: string = '';
  showDropdown = false;
  instructor: { name: string } | null = null;

  editingLesson: ILesson | null = null;
  editedLessonTitle: string = '';
  editedLessonContent: string = '';

  isEnrolled: boolean = false;
  canAddLesson: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private coursesService: CoursesService,
    private enrollmentsService: EnrollmentsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const courseId : string = params['id'];
      if (!courseId) {
        alert("Invalid course ID provided.");
        this.router.navigate(['/home']);
        return;
      }

      this.loadCourseDetails(courseId);
    });
  }

  private loadCourseDetails(courseId: string): void {
    this.coursesService.courseById(courseId).subscribe({
      next: course => {
        this.course = course;
        this.role = localStorage.getItem('userRole');

         // 🔹 Eğitmenin kendi kursu mu kontrol et
            const currentUserId = localStorage.getItem('userId') ?? '';
            this.canAddLesson = (course.instructorId.toString() === currentUserId);

        // Öğrenci kayıt kontrolü
          this.enrollmentsService.isStudentEnrolled(currentUserId, course.id).subscribe({
            next: enrolled => this.isEnrolled = enrolled,
            error: err => console.error('Kayıt kontrolü hatası:', err)
          });

        this.coursesService.getLessonsByCourse(course.id).subscribe({
          next: lessons => 
            this.lessons = lessons,
          error: err => 
            console.error('Lessons not found:', err)
        });
      },
      error: err => {
        alert("Course not found: " + courseId);
        this.router.navigate(['/home']);
      }
    });
  }

  addLesson(): void {
    if (!this.newLessonTitle.trim() || !this.course) return;

    const newLesson: Omit<ILesson, 'id'> = {
      courseId: this.course.id,
      title: this.newLessonTitle,
      content: this.newLessonContent
    };

    this.coursesService.addLesson(newLesson).subscribe({
      next: createdLesson => {
        this.lessons.push(createdLesson);
        this.newLessonTitle = '';
        this.newLessonContent = '';
        this.showDropdown = false;
      },
      error: err => console.error('Ders eklenirken hata oluştu:', err)
    });
  }

  deleteLesson(lessonId: string): void {
    if (!confirm('Bu dersi silmek istediğinize emin misiniz?')) return;

    this.coursesService.deleteLesson(lessonId).subscribe({
      next: () => {
        this.lessons = this.lessons.filter(lesson => lesson.id !== lessonId);
      },
      error: err => console.error('Ders silinirken hata oluştu:', err)
    });
  }

  startEditing(lesson: ILesson): void {
    this.editingLesson = lesson;
    this.editedLessonTitle = lesson.title;
    this.editedLessonContent = lesson.content;
  }

  cancelEditing(): void {
    this.editingLesson = null;
    this.editedLessonTitle = '';
    this.editedLessonContent = '';
  }

  saveEdits(): void {
    if (!this.editingLesson) return;

    const updatedLesson: ILesson = {
      ...this.editingLesson,
      title: this.editedLessonTitle,
      content: this.editedLessonContent
    };

    this.coursesService.updateLesson(updatedLesson).subscribe({
      next: lesson => {
        const index = this.lessons.findIndex(l => l.id === lesson.id);
        if (index !== -1) this.lessons[index] = lesson;
        this.cancelEditing();
      },
      error: err => console.error('Ders güncellenirken hata oluştu:', err)
    });
  }
 
  joinCourse():void{
    if(!this.course)return;

    const userId=localStorage.getItem('userId') ?? '';
    const courseId: string = this.course.id;

    this.enrollmentsService.enrollInCourse(userId,courseId).subscribe({
      next:()=>{
        this.isEnrolled=true;
        alert('Kursa başarıyla katldınız!')
      },
      error:err=>{
        console.error('Kursa kayıt olurken hata:' ,err)
        alert('Kursa kayıt başarısız oldu.')
      }
    })
  }

}
