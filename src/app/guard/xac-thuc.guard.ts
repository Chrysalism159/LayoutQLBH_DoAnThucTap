import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { XacThucService } from '../service/xacthuc.service';

@Injectable({
  providedIn: 'root'
})
export class XacThucGuard implements CanActivate {

  constructor(private router: Router, private service: XacThucService) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> {
    return this.service.getRole().pipe(
      map((role: string) => {
        if (role === 'quanly') {
          // Allow access
          return true;
        } else {
          // Redirect to login or another route
          return this.router.createUrlTree(['/chan-truy-cap']);
        }
      })
    );
  }
}
