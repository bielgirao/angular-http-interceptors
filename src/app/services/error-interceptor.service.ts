import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable, throwError } from 'rxjs';
import { AlertService, DialogData } from "./alert.service";
import { catchError } from "rxjs/operators";
import { Router } from "@angular/router";

@Injectable()
export class ErrorInterceptorService implements HttpInterceptor {

  constructor(
    private alert: AlertService,
    private router: Router
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error) => this.handleError(error))
    );
  }

  private handleError(error: HttpErrorResponse) {
    if(error.status === 401) {
      const dialogData: DialogData = {
        status: error.status,
        statusText: error.statusText,
        message: "You need to authenticate first."
      }

      this.alert
        .showError(dialogData)
        .subscribe(() => this.router.navigate(['login']));
    }

    return throwError(error);
  }
}
