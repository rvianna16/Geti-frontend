import { HttpErrorResponse, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, throwError } from "rxjs";

import { AuthService } from "./auth.service";

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    const headers = new HttpHeaders({
      'accept': 'application/json',
      'Authorization': `Bearer ${this.authService.token}`
    });

    const newRequest = request.clone({ headers });
    return next.handle(newRequest);
  }
}
