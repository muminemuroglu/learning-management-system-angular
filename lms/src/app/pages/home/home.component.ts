import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../../services/courses.service';
import { ICourse } from '../../models/ICourses';
import { CourseItemComponent } from '../../components/course-item/course-item.component';

@Component({
  selector: 'app-home',
  imports: [CourseItemComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})


export class HomeComponent implements OnInit {

coursesArr: ICourse[] = [];

  constructor(private coursesService: CoursesService) { 
    const stToken = localStorage.getItem('token');
    if(!stToken){
      window.location.replace('/')
    }
  }

  ngOnInit(): void {
    this.coursesService.getCourses(1, 20).subscribe({
      next: (value) => {
        this.coursesArr = value;
        console.log(value);
      },
      error: (err) => {
        console.error(err);
      }
    });

}
}
