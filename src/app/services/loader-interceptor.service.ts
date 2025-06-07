import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from 'rxjs';
import { LoaderService } from "./loader.service";
import { delay, finalize } from "rxjs/operators";

@Injectable()
export class LoaderInterceptorService implements HttpInterceptor {

  constructor(
    private loader: LoaderService,
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loader.startLoading();

    return next.handle(req).pipe(
      delay(1000),
      finalize(() => this.loader.stopLoading())
    );
  }
}
