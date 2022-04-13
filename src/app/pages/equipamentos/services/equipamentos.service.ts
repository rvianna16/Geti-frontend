import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { map, Observable } from 'rxjs';
import { BaseResponse } from 'src/app/shared/models/base-response';
import { environment } from 'src/environments/environment';
import { Comentario } from '../models/comentario';
import { Equipamento } from '../models/equipamento';
@Injectable({
  providedIn: 'root'
})
export class EquipamentosService {
  protected apiUrl = environment.apiUrl;

  constructor(public http: HttpClient) { }

  obterEquipamentos(filtro = ''): Observable<Equipamento[]>{
    const url = `${this.apiUrl}equipamentos?filtro=${filtro}`;

    return this.http.get<BaseResponse<Equipamento>>(url).pipe(
      map((response: BaseResponse<Equipamento>) => <Equipamento[]>response.data)
    )
  }

  obterEquipamentoDetalhes(id: string): Observable<Equipamento>{
    const url = `${this.apiUrl}equipamentos/${id}/detalhes`

    return this.http.get<BaseResponse<Equipamento>>(url).pipe(
      map((response: BaseResponse<Equipamento>) => <Equipamento>response.data)
    )
  }

  salvarEquipamento(equipamento: Equipamento): Observable<void> {
    const url = `${this.apiUrl}equipamentos`;

    return this.http.post<void>(url, equipamento);
  }

  alterarEquipamento(id: string, equipamento: Equipamento): Observable<void> {
    const url = `${this.apiUrl}equipamentos/${id}`;

    return this.http.put<void>(url, equipamento);
  }

  excluirEquipamento(id: string): Observable<void> {
    const url = `${this.apiUrl}equipamentos/${id}`;

    return this.http.delete<void>(url);
  }

  adicionarComentario(id: string, comentario: Comentario): Observable<void> {
    const url = `${this.apiUrl}equipamentos/${id}/comentario`

    return this.http.post<void>(url, comentario)
  }

  excluirComentario(id: string): Observable<void> {
    const url = `${this.apiUrl}equipamentos/comentario/${id}`

    return this.http.delete<void>(url);

  }
}
