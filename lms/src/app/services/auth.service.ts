import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { userUrl } from '../utils/apiUrl';
import { IUser } from '../models/IUser';

import {  catchError, Observable, of } from 'rxjs';
import { baseURL } from '../utils/apiUrl';



@Injectable({
  providedIn: 'root'
})
export class AuthService {


  
  constructor(private http: HttpClient) {}

  loginUser(email: string, password: string): Observable<IUser[]> {
    return this.http.get<IUser[]>(userUrl.users, { params: { email, password }
    });
  }

  userRegister(name: string, email: string, password: string): Observable<IUser> {
    const sendObj = {
      name: name,
      email: email,
      password: password,
      role: 'student'
    };
    return this.http.post<IUser>(userUrl.users, sendObj);
  }
// ID’ye göre kullanıcı profili
  userProfileById(): Observable<IUser> {
    const userId = localStorage.getItem('userId') ?? '';
    const url = `${userUrl.users}/${userId}`; 
    return this.http.get<IUser>(url);}


// Kullanıcı profilini senkronize etme (hata durumunda null döner)
   userProfileSync(): Observable<IUser | null> {
    return this.userProfileById().pipe( 
      catchError(err => {
        console.error('User profile hatası:', err); 
        return of(null);
      })
    );
  }

  updateUser(id: string, data: Partial<IUser>): Observable<IUser> {
  return this.http.patch<IUser>(`${userUrl.users}/${id}`, data);
  }

  updatePassword(id: string, newPassword: string): Observable<any> {
  return this.http.patch(`${userUrl.users}/${id}`, { password: newPassword });
  }







/** userProfileSync(id: number): Observable<IUser> {
    const url = `${userUrl.users}/${id}`;
    return this.http.get<IUser>(url).pipe()
 }*/
  

}