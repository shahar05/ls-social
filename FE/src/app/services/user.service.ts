import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from '../models';
import { AuthService } from './auth.service';
import { NetService } from './net.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {



  user: User;
  private user$: BehaviorSubject<User> = new BehaviorSubject<User>(null);
  constructor(private netService: NetService, private authService: AuthService, private router: Router) { }
  loginFromLocalStorage(): Observable<void> {
    return new Observable(o => {
      if (!this.authService.getToken()) {
        this.router.navigate([]);
        o.next();
        o.complete();
        return;
      }
      this.netService.getUser().subscribe((user: User) => {
        this.setUser(user);
        this.router.navigate(['/feed']);
        o.next();
        o.complete();
      }, (err) => {
        this.router.navigate([]);
        o.next();
        o.complete();
      });
    });
  }

  register(user: User): Observable<User>  {
    return new Observable(o => {
      this.netService.register(user).subscribe((response: { token: string; loggedUser: User; }) => {
        this.updateLoginDetails(response);
        o.next(response.loggedUser);
        o.complete();
      });
    });
  }

  private updateLoginDetails(response: { token: string; loggedUser: User; }): void {
    this.authService.setToken(response.token);
    this.setUser(response.loggedUser);
  }

  login(user: Partial<User>): Observable<User> {
    return new Observable(o => {
      this.netService.login(user).subscribe((response: { token: string; loggedUser: User; }) => {
        this.updateLoginDetails(response);
        o.next(response.loggedUser);
        o.complete();
      });
    });
  }
  logout(): void {
    this.authService.setIsAuth(false);
    this.setUser(null);
  }
  private setUser(user: User): void {
    this.user$.next(user);
  }

  getUserObserver(): Observable<User> {
    return this.user$;
  }

}

