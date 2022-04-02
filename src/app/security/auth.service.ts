import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { NotificacoesService } from '../shared/services/notificacoes.service';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  protected apiUrl = environment.apiUrl;

  constructor(
    public http: HttpClient,
    private notificacoesService: NotificacoesService
    ) { }

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
    const tokenIsValid = await firstValueFrom(this.checkTokenValidity()).catch(error => {
      this.notificacoesService.notificarErro('Algo de errado aconteceu. Tente novamente mais tarde');
    });

    return tokenIsValid;
  }

  checkTokenValidity(): Observable<boolean>{
    const url = `${this.apiUrl}check-token`

    return this.http.post<any>(url, []);
  }
}
