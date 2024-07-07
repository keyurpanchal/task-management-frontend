
import { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const headerInterceptor: HttpInterceptorFn = (req, next) => {

  const authService = inject(AuthService);
  const token = authService.getToken();
  
  const authReq = req.clone({
    setHeaders: {
      'auth-token': `${token}`
    }
  });

  return next(authReq);
};