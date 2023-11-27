import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent
} from '@angular/common/http';
import {finalize, Observable} from 'rxjs';
import {AppStateService} from "./app-state.service";

@Injectable()
export class HttpInterceptor implements HttpInterceptor {

  constructor(private appStateService : AppStateService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.appStateService.setProductsState({
      status : "LOADING"
    })
    return next.handle(request).pipe(
      finalize(() => {
        this.appStateService.setProductsState({
          status : "DONE"
        });
      })
    );
  }
}
