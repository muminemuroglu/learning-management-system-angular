import { Injectable } from '@angular/core';

import { userUrl } from '../utils/apiUrl';
import { HttpClient } from '@angular/common/http';
import { ICourse } from '../models/ICourses';
import { Observable } from 'rxjs';
import { ILesson } from '../models/ILessons';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  
 
  constructor(private http: HttpClient) { }

                          /**Kurslar Metodları */
//Tüm kursları getirme
  getCourses(page: number, per_page: number) {
  const params = {
    _page: page,
    _limit: per_page
  };

  return this.http.get<ICourse[]>(userUrl.courses, { params });
}

//Belirli bir kursu ID'sine göre getirme
courseById(id:string): Observable<ICourse> {
  const url=`${userUrl.courses}/${id}`;
  return this.http.get<ICourse>(url);
}

//Belirli bir eğitmenin kurslarını getirme
getCourserByInstructor(instructorId:number): Observable<ICourse[]> {
   const url=`${userUrl.courses}?instructorId=${instructorId}`;
  return this.http.get<ICourse[]>(url);
}

//Yeni kurs ekleme
addCourse(courseData: Omit<ICourse, 'id'>): Observable<ICourse> {
  return this.http.post<ICourse>(userUrl.courses, courseData);
}

//Kurs silme
deleteCourse(courseId:number|string):Observable<any>{
  const url=`${userUrl.courses}/${courseId}`;
  return this.http.delete(url);
}

                            /**Dersler Metodları */


//Bu fonksiyon şimdilik dursun
getLessons(page: number, per_page: number) {
   const params = {
    _page: page,
    _limit: per_page
  };
  return this.http.get<ILesson[]>(userUrl.lessons, { params });
}
//Belirli bir kursa ait dersleri getirme
 getLessonsByCourse(courseId: number|string): Observable<ILesson[]> {
  return this.http.get<ILesson[]>(`${userUrl.lessons}?courseId=${courseId}`);
}

//Yeni ders ekleme
addLesson(lessonData:ILesson):Observable<ILesson>{
  return this.http.post<ILesson>(userUrl.lessons,lessonData);

}
//Ders silme
deleteLesson(lessonId:number):Observable<any>{
  const url=`${userUrl.lessons}/${lessonId}`;
  return this.http.delete(url);


}

}

  
