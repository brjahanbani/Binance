import { Injectable } from '@angular/core';
import {
  AbstractControl,
  AsyncValidator,
  ValidationErrors,
} from '@angular/forms';
import { Observable, of } from 'rxjs';
import { catchError, filter, map } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class UniqueUsernameService implements AsyncValidator {
  constructor(private authService: AuthService) {}

  validate(
    control: AbstractControl
  ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return this.authService.usernameAvailable(control.value).pipe(
      filter((response) => response.available),
      map((response) => {
        return null;
      }),
      catchError((error) => {
        if (error.error.username) {
          return of({ nonUniqueUsername: true });
        } else {
          return of({ unknownError: true });
        }
      })
    ); // {avilable : true} // {username: 'username is user'}
  }
}
