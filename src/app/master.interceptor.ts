import { HttpInterceptor,
         HttpRequest,
         HttpHandler,
         HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()

export class MasterInterceptor implements HttpInterceptor
{
  constructor(){}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    debugger
    const token =  'bearer ' + localStorage.getItem('loginToken');
      req = req.clone({ headers: req.headers.set('Authorization', token) });
    return next.handle(req)
  }
  
}


