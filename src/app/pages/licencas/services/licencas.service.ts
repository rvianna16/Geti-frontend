import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { BaseResponse } from 'src/app/shared/models/base-response';

import { environment } from 'src/environments/environment';
import { Licenca } from '../models/licencas';

@Injectable({
  providedIn: 'root'
})

export class LicencasService {
  protected apiUrl = environment.apiUrl;

  constructor(public http: HttpClient) { }

  obterLicencas(filtro = ''): Observable<Licenca[]>{
    const url = `${this.apiUrl}licencas?filtro=${filtro}`;

    return this.http.get<BaseResponse<Licenca>>(url).pipe(
      map((response: BaseResponse<Licenca>) => <Licenca[]>response.data)
    )
  }

  obterLicencaDetalhes(id: string): Observable<Licenca>{
    const url = `${this.apiUrl}licencas/${id}/detalhes`

    return this.http.get<BaseResponse<Licenca>>(url).pipe(
      map((response: BaseResponse<Licenca>) => <Licenca>response.data)
    )
  }

  salvarLicenca(licenca: Licenca): Observable<void> {
    const url = `${this.apiUrl}licencas`;

    return this.http.post<void>(url, licenca);
  }

  vincularLicenca(dados: any): Observable<void> {
    const url = `${this.apiUrl}licencas/vincular/equipamento`

    return this.http.post<void>(url, dados);
  }

  desvincularLicenca(id: string): Observable<void> {
    const url = `${this.apiUrl}licencas/desvincular/equipamento/${id}`

    return this.http.delete<void>(url);
  }

  alterarLicenca(id: string, licenca: Licenca): Observable<void> {
    const url = `${this.apiUrl}licencas/${id}`;

    return this.http.put<void>(url, licenca);
  }

  excluirLicenca(id: string): Observable<void> {
    const url = `${this.apiUrl}licencas/${id}`;

    return this.http.delete<void>(url);
  }

}
