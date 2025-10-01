import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { userUrl } from '../utils/apiUrl';
import { IEnrollment } from '../models/IEnrollment';
import { forkJoin, Observable, switchMap } from 'rxjs';
import { ICourse } from '../models/ICourses';

@Injectable({
  providedIn: 'root'
})
export class EnrollmentsService {
  

  constructor(private http: HttpClient) { }


 
getCoursesByStudentId(studentId: string): Observable<ICourse[]> {
  return this.http.get<IEnrollment[]>(`${userUrl.enrollments}`).pipe(
    switchMap((enrollments: IEnrollment[]) => {
      const filtered = enrollments.filter(enroll => String(enroll.userId) === studentId);
      const courseRequests = filtered.map(enroll =>
        this.http.get<ICourse>(`${userUrl.courses}/${enroll.courseId}`)
      );
      return forkJoin(courseRequests);
    })
  );
}



}
