import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from "@angular/common/http";
import { AuthenticationService } from "app/services/authentication.service";
import { Observable, of } from "rxjs";
import { catchError } from "rxjs/operators";
import { Router } from "@angular/router";

@Injectable()
export class JwtTokenInterceptor implements HttpInterceptor {

  constructor(public authentication: AuthenticationService, private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let interceptedRequest = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.authentication.getToken()}`
      }
    });
    return next.handle(interceptedRequest).pipe(catchError(x => this.handleUnauthorizedError(x)));
  }
  private handleUnauthorizedError(err: HttpErrorResponse): Observable<any> {
    if (err.status === 401) {
      this.router.navigate(["/"]);
      return of(err.message);
  }}
}
