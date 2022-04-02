import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  protected apiUrl = environment.apiUrl;

  constructor(public http: HttpClient) { }

  setToken(response: any) {
    localStorage.setItem('token', response.accessToken);
    localStorage.setItem('user', JSON.stringify(response.user));
  }

  removeToken(){
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  get token(){
    return localStorage.getItem('token');
  }

  get user(){
    const usuario = localStorage.getItem('user')
    return JSON.parse(`${usuario}`)
  }

  async tokenIsValid(){
    await firstValueFrom(this.checkTokenValidity()).then((isValid) => {
      return true
    }).catch(error => {
      this.removeToken();
      return false;
    });
  }

  checkTokenValidity(): Observable<boolean>{
    const url = `${this.apiUrl}check-token`

    return this.http.post<any>(url, []);
  }
}
