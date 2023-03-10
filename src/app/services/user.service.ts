import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment} from "../../environments/environment";
import {LoginRequest} from "../interfaces/login-request";
import {SignupRequest} from "../interfaces/signup-request";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private readonly http: HttpClient) { }
  logIn(request: LoginRequest): Observable<any> {
    return this.http.post(`${environment.apiUrl}login`,
      request,
      {
        responseType: 'json',
        headers: {'Content-Type': 'application/json;v=1.0'}
      }
    );
  }

  signUp(request: SignupRequest): Observable<any> {
    return this.http.post(`${environment.apiUrl}signup`,
      request,
      {
        responseType: 'json',
        headers: {'Content-Type': 'application/json;v=1.0'}
      }
    );
  }
}
