import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {tap} from 'rxjs/operators';

@Injectable()
export class ErrorMessageInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      tap(() => { }, error => {
        // eslint-disable-next-line no-console
        console.error('Fehler aufgetreten!', error);
      })
    );
  }
}
