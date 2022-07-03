import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { map, Observable, skipWhile, take } from 'rxjs';
import { AuthService } from '../layout/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AccessGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> {
    return this.authService.signedin$.pipe(
      take(1),
      map((signedin) => {
        if (signedin === false) {
          this.router.navigate(['/signin']);
        }
        return signedin;
      })
    );
  }
}
