import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { StorageService } from './storage.service';

export interface SignupCredentials {
  username: string;
  password: string;
  passwordConfirmation: string;
}

export interface SignupResponse {
  username: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface LoginResponse {
  username: string;
}
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'https://api.angular-email.com';
  public signedin$ = new BehaviorSubject<boolean>(false);
  username: string = '';
  constructor(private http: HttpClient, private storage: StorageService) {
    const isLoggedin = this.storage.getItem<boolean>('isLoggedin') ?? false;
    this.signedin$.next(isLoggedin);
    this.username = this.storage.getItem<string>('username') || '';
  }

  usernameAvailable(username: string) {
    return this.http.post<any>(this.baseUrl + '/auth/username', {
      username,
    });
  }
  signup(values: SignupCredentials) {
    return this.http
      .post<SignupResponse>(this.baseUrl + '/auth/signup/', values)
      .pipe(
        tap(() => {
          this.setUserInfo(values.username);
        })
      );
  }

  checkAuth() {
    return this.http.get(`${this.baseUrl}/auth/signedin`).pipe(
      tap((response: any) => {
        this.signedin$.next(response.authenticated);
        this.username = response.username;
      })
    );
  }

  signout() {
    return this.http.post(`${this.baseUrl}/auth/signout`, {}).pipe(
      tap(() => {
        this.setUserInfo('');
      })
    );
  }

  signin(loginCredentials: LoginCredentials) {
    return this.http
      .post<LoginResponse>(`${this.baseUrl}/auth/signin`, loginCredentials)
      .pipe(
        tap(() => {
          this.setUserInfo(loginCredentials.username);
        })
      );
  }

  private setUserInfo(username: string): void {
    const isLoggedin = username === '' ? false : true;
    this.username = username;
    this.signedin$.next(isLoggedin);
    this.storage.setItem<boolean>('isLoggedin', isLoggedin);
    this.storage.setItem<string>('username', username);
  }
}
