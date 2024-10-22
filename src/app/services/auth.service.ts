import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  registerApi:string = 'https://testing.competitivecracker.com/api/v1/user/register'

  constructor(
    private http: HttpClient,
  ) { }

  registerUser(user: any) {
    return this.http.post(this.registerApi, user);
  }
}
