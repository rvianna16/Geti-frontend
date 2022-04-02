import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Usuario } from './usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  protected apiUrl = environment.apiUrl;

  constructor(public http: HttpClient) { }

  login(usuario: Usuario): Observable<any>{
    const url = `${this.apiUrl}login`

    return this.http.post<any>(url, usuario).pipe(
      map((response: any) => response.data)
    );
  }
}
