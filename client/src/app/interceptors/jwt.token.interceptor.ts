import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { AuthenticationService } from "app/services/authentication.service";
import { Observable } from "rxjs";

@Injectable()
export class JwtTokenInterceptor implements HttpInterceptor {
  constructor(public authentication: AuthenticationService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let interceptedRequest = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.authentication.getToken()}`
      }
    });
    return next.handle(interceptedRequest);
  }
}
