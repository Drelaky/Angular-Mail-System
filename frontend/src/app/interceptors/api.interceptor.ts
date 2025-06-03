import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { UtilsService } from '../services/utils.service';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';

export const apiInterceptor: HttpInterceptorFn = (req, next) => {
  const utils = inject(UtilsService);
  const router = inject(Router);
  const apiUrl = utils.isBrowser() ? 'http://localhost:3000/api' : 'http://localhost:3000/api';

  req = req.clone({
    url: `${apiUrl}/${req.url}`,
  });

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        router.navigate(['/']);
      }
      return throwError(() => {
        error;
      });
    })
  );
};
