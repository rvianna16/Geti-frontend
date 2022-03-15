import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Licenca } from '../models/licencas';

@Injectable({
  providedIn: 'root'
})

export class LicencasService {
  protected apiUrl = environment.apiUrl;

  constructor(public http: HttpClient) { }

  obterLicencas(): Observable<Licenca[]>{
    const url = `${this.apiUrl}licencas`;

    return this.http.get<Licenca[]>(url).pipe(
      map((response: any) => response.data)
    )
  }

  obterLicencaDetalhes(id: string): Observable<Licenca>{
    const url = `${this.apiUrl}licencas/${id}/detalhes`

    return this.http.get<Licenca>(url).pipe(
      map((response: any) => response.data)
    )
  }

  salvarLicenca(licenca: Licenca): Observable<any> {
    const url = `${this.apiUrl}licencas`;

    return this.http.post(url, licenca);
  }

  vincularLicenca(dados: any): Observable<any> {
    const url = `${this.apiUrl}licencas/vincular/equipamento`

    return this.http.post(url, dados);
  }

  desvincularLicenca(id: string): Observable<any> {
    const url = `${this.apiUrl}licencas/desvincular/equipamento/${id}`

    return this.http.delete(url);
  }

  alterarLicenca(id: string, licenca: Licenca): Observable<any> {
    const url = `${this.apiUrl}licencas/${id}`;

    return this.http.put(url, licenca);
  }

  excluirLicenca(id: string): Observable<any> {
    const url = `${this.apiUrl}licencas/${id}`;

    return this.http.delete(url);
  }

}
