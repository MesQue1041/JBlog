import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

export const authGuard: CanActivateFn = (route, state) => {
  const apiService = inject(ApiService);
  const router = inject(Router);

  return apiService.getAuthState().pipe(
    tap((value) => {
      if (!value) {
        router.navigateByUrl('/login').then();
        return false;
      } else {
        return true;
      }
    })
  );
};
