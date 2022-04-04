import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { BaseResponse } from 'src/app/shared/models/base-response';
import { environment } from 'src/environments/environment';
import { Colaborador } from '../models/colaborador';

@Injectable({
  providedIn: 'root'
})
export class ColaboradoresService {
  protected apiUrl = environment.apiUrl;

  constructor(public http: HttpClient) { }

  obterColaboradores(filtro = ''): Observable<Colaborador[]>{
    const url = `${this.apiUrl}colaboradores?filtro=${filtro}`;

    return this.http.get<BaseResponse<Colaborador>>(url).pipe(
      map((response: BaseResponse<Colaborador>) => <Colaborador[]>response.data)
    )
  }

  obterColaboradorEquipamentos(id: string): Observable<Colaborador>{
    const url = `${this.apiUrl}colaboradores/${id}/equipamentos`

    return this.http.get<BaseResponse<Colaborador>>(url).pipe(
      map((response: BaseResponse<Colaborador>) => <Colaborador>response.data)
    )
  }

  salvarColaborador(colaborador: Colaborador): Observable<void> {
    const url = `${this.apiUrl}colaboradores`;

    return this.http.post<void>(url, colaborador);
  }

  alterarColaborador(id: string, colaborador: Colaborador): Observable<void> {
    const url = `${this.apiUrl}colaboradores/${id}`

    return this.http.put<void>(url, colaborador);
  }

  excluirColaborador(id: string): Observable<void> {
    const url = `${this.apiUrl}colaboradores/${id}`;

    return this.http.delete<void>(url);
  }
}
