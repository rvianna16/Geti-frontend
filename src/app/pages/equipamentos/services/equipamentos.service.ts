import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Equipamento } from '../models/equipamento';

@Injectable({
  providedIn: 'root'
})
export class EquipamentosService {
  protected apiUrl = environment.apiUrl;

  constructor(public http: HttpClient) { }

  obterEquipamentos(filtro = ''): Observable<Equipamento[]>{
    const url = `${this.apiUrl}equipamentos?filtro=${filtro}`;

    return this.http.get<Equipamento[]>(url).pipe(
      map((response: any) => response.data)
    )
  }

  obterEquipamentoDetalhes(id: string): Observable<Equipamento>{
    const url = `${this.apiUrl}equipamentos/${id}/detalhes`

    return this.http.get<Equipamento>(url).pipe(
      map((response: any) => response.data)
    )
  }

  salvarEquipamento(equipamento: Equipamento): Observable<any> {
    const url = `${this.apiUrl}equipamentos`;

    return this.http.post(url, equipamento);
  }

  alterarEquipamento(id: string, equipamento: Equipamento): Observable<any> {
    const url = `${this.apiUrl}equipamentos/${id}`;

    return this.http.put(url, equipamento);
  }

  excluirEquipamento(id: string): Observable<any> {
    const url = `${this.apiUrl}equipamentos/${id}`;

    return this.http.delete(url);
  }
}
