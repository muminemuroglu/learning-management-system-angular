import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CoursesService } from '../../services/courses.service';
import { ICourse, Pagination } from '../../models/ICourses';
import { CourseItemComponent } from '../../components/course-item/course-item.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CourseItemComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  coursesArr: ICourse[] = [];
  pageInfo: Pagination = {
    page: 1,
    per_page: 10,
    total_items: 0,
    total_pages: 0
  };
  pages: number[] = [];
  current_page = 1;

  constructor(
    private coursesService: CoursesService,
    private cdr: ChangeDetectorRef,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    const stToken = localStorage.getItem('token');
    if (!stToken) {
      window.location.replace('/');
    }
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      const page = +params['page'] || 1;
      this.current_page = page;
      this.pullData();
    });
  }

  pullData(): void {
  this.coursesService.getAllCourses().subscribe({
    next: (allCourses) => {
      this.pageInfo.total_items = allCourses.length;
      this.pageInfo.total_pages = Math.ceil(this.pageInfo.total_items / this.pageInfo.per_page);
      this.pages = Array.from({ length: this.pageInfo.total_pages }, (_, i) => i + 1);

      const start = (this.current_page - 1) * this.pageInfo.per_page;
      const end = this.current_page * this.pageInfo.per_page;
      this.coursesArr = allCourses.slice(start, end);
    },
    error: (err) => console.error(err),
    complete: () => this.cdr.detectChanges()
  });
}

  goToPage(page: number): void {
    this.current_page = page;
    this.pullData();
    this.router.navigate([], {
      queryParams: { page },
      queryParamsHandling: 'merge'
    });
  }
}
