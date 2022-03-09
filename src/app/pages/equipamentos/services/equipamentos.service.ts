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

  obterEquipamentos(): Observable<Equipamento[]>{
    const url = `${this.apiUrl}equipamentos`;

    return this.http.get<Equipamento[]>(url).pipe(
      map((response: any) => response.data)
    )
  }

}
