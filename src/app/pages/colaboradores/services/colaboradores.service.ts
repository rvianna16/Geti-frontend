import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
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

    return this.http.get<Colaborador[]>(url).pipe(
      map((response: any) => response.data)
    )
  }

  obterColaboradorEquipamentos(id: string): Observable<Colaborador>{
    const url = `${this.apiUrl}colaboradores/${id}/equipamentos`

    return this.http.get<Colaborador>(url).pipe(
      map((response: any) => response.data)
    )
  }

  salvarColaborador(colaborador: Colaborador): Observable<any> {
    const url = `${this.apiUrl}colaboradores`;

    return this.http.post(url, colaborador);
  }

  alterarColaborador(id: string, colaborador: Colaborador): Observable<any> {
    const url = `${this.apiUrl}colaboradores/${id}`

    return this.http.put(url, colaborador);
  }

  excluirColaborador(id: string): Observable<any> {
    const url = `${this.apiUrl}colaboradores/${id}`;

    return this.http.delete(url);
  }
}
