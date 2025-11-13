import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {LoginUser} from '../models/LoginUser.model';
import {BehaviorSubject, catchError, Observable, tap, throwError} from 'rxjs';
import {AuthenticationResponse} from '../models/AuthenticationResponse .model';

const BASE_URL = "https://localhost:7018/api/v1/Users";
const headers = new HttpHeaders({'Content-Type': 'application/json'});

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpClient: HttpClient) {}

  private currentUserSubject = new BehaviorSubject<AuthenticationResponse | any>(null);

  currentUser$ = this.currentUserSubject.asObservable();

  // https://localhost:7018/api/v1/Users/login
  public PostLogin(loginUser: LoginUser): Observable<AuthenticationResponse> {
    return this.httpClient.post<AuthenticationResponse>(`${BASE_URL}/login`, loginUser, {headers}).pipe(
      tap((response) => {
        this.saveTokens(response);
        this.currentUserSubject.next(response);
      })
    )
  }
  refreshToken() {
    const token = localStorage.getItem('token');
    const refreshToken = localStorage.getItem('refreshToken');

    return this.httpClient.post<any>(`${BASE_URL}/generate-new-access-token`, {token, refreshToken,}, {headers})
      .pipe(
      tap(response => this.saveTokens(response)),
      catchError(err => {
        this.logout();
        return throwError(() => err);
      })
    );
  }

  saveTokens(data:AuthenticationResponse) {
    localStorage.setItem('token', data.token);
    localStorage.setItem('refreshToken', data.refreshToken);
    localStorage.setItem('tokenExpiration', data.expiration);
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('tokenExpiration');
    this.currentUserSubject.next(null);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
