import { Injectable } from '@angular/core';
import { AsyncValidator, AbstractControl } from '@angular/forms';
import { catchError, of, map } from 'rxjs';
import { AuthService } from '../../service/auth.service';

@Injectable({
  providedIn: 'root',
})
export class UniqueEmail implements AsyncValidator {
  constructor(private authService: AuthService) {}
  validate(control: AbstractControl): any {
    const { value } = control;
    console.log(value);
    console.log(this.authService?.emailAvailable(value).pipe());

    return this.authService.emailAvailable(value).pipe(
      map((response) => {
        if (response.isAvailable) {
          return of({ isAvailable: true });
        } else {
          return of({ isAvailable: false });
        }
      })
    );
  }
}
