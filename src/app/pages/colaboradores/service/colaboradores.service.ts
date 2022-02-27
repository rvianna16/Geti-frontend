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

  obterColaboradores(): Observable<Colaborador[]>{
    const url = `${this.apiUrl}colaboradores`;

    return this.http.get<Colaborador[]>(url).pipe(
      map((response: any) => response.data)
    )
  }
}