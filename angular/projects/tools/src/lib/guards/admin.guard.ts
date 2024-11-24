import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { ApiService } from '../api.service';
import { map } from 'rxjs/operators';

export const adminGuard: CanActivateFn = (route, state) => {
  const apiService = inject(ApiService); // Injecting ApiService using inject()

  return apiService.getUserObservable().pipe(
    map(user => {
      return user.roles === 'Admin'; // Check if user has 'Admin' role
    })
  );
};
