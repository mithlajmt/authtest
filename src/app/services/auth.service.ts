import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private registerApi:string = 'https://testing.competitivecracker.com/api/v1/user/register'
  private loginApi:string = 'https://testing.competitivecracker.com/api/v1/user/login'


  constructor(
    private http: HttpClient,
  ) { }

  registerUser(user: any) {
    return this.http.post(this.registerApi, user);
  }
  userlogin(user:any){
    return this.http.post(this.loginApi,user);
  }
}
