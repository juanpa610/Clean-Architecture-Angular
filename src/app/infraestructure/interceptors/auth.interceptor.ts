import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const targetUrl = '';
    
    if (req.url === targetUrl) {
      const token = sessionStorage.getItem('current_session_token');
      const authReq = req.clone({
        setHeaders: {
          'Content-Type': 'application/json',
          'Authorization': token ? `Bearer ${token}` : ''
        }
      });
      return next.handle(authReq);
    }
    return next.handle(req);
  }
}