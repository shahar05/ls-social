import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    constructor(private authService: AuthService, private router: Router) { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        request = request.clone({
            setHeaders: {
                Authorization: `Bearer ${this.authService.getToken()}`
            }
        });
        return next.handle(request).pipe(
            tap(() => {

            }, (err: HttpErrorResponse) => {
                if (err.status === 401) {
                    this.router.navigate([]);
                    this.authService.setIsAuth(false);
                }

            })
        );
    }
}
