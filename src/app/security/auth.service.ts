import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  setToken(response: any) {
    localStorage.setItem('token', response.accessToken);
    localStorage.setItem('user', JSON.stringify(response.user));
  }

  get token(){
    return localStorage.getItem('token');
  }

  get user(){
    const usuario = localStorage.getItem('user')
    return JSON.parse(`${usuario}`)
  }
}
