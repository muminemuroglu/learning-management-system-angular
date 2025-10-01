import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router } from "@angular/router";

@Injectable({ providedIn: 'root' })
export class RoleGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRole = route.data['expectedRole'];
    const userRole = localStorage.getItem('userRole');

    if (userRole === expectedRole) {
      return true;
    } else {
      //this.router.navigate(['/unauthorized']);
      return false;
    }
  }
}