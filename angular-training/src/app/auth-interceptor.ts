import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './auth-service';

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService);
  const authRequest = req.clone({
    setHeaders:{
      Authorization: `Bearer ${auth.getToken()}`
    }
  });

  return next(authRequest);
};
