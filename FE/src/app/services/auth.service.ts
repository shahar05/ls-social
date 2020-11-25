import { Injectable } from '@angular/core';
import { LocalStorageKey } from '../enums';
import { PopUpService } from './pop-up.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token = '';
  constructor() { }

  setToken(token: string = ''): void {
    this.token = token;
    localStorage.setItem(LocalStorageKey.TOKEN, token);
  }

  getToken(): string {
    if (!this.token) {
      const lsToken = localStorage.getItem(LocalStorageKey.TOKEN);
      if (lsToken) {
        this.token = lsToken;
      }
    }
    return this.token;
  }

  setIsAuth(isAuth: boolean): void {
    if (!isAuth) {
      localStorage.removeItem(LocalStorageKey.TOKEN);
      this.token = '';
    }
  }

  getIsAuth(): boolean {
    return !!localStorage.getItem(LocalStorageKey.TOKEN);
  }

}
