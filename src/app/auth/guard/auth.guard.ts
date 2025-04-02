import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { map, skipWhile, take } from 'rxjs';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.signedIn$.pipe(
    skipWhile((value) => value === null),
    take(1),
    map((isSignedIn) => {
      if (isSignedIn) {
        return true;
      } else {
        router.navigateByUrl('/');
        return false;
      }
    })
  );
};
