import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from './services/auth.service';
import { lastValueFrom } from 'rxjs';

export const notauthGuard: CanActivateFn = async (route, state) => {
  const authService = inject(AuthService);
  const stToken = localStorage.getItem('token');

  if (stToken) {
    try {
      const res = await lastValueFrom(authService.userProfileSync());
      if (res) {
        window.location.replace('/home');
        return false;
      }
    } catch (error) {
      localStorage.removeItem('token'); // token'ı siler
      localStorage.removeItem('userId'); // userId'yi siler
      localStorage.removeItem('role');   // role'u siler
      window.location.reload();          // sayfayı yeniden yükler
      return true;
    }
  }
  return true;
};
