import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { BaseResponse } from 'src/app/shared/models/base-response';
import { environment } from 'src/environments/environment';
import { Software } from '../models/software';

@Injectable({
  providedIn: 'root'
})
export class SoftwaresService {
  protected apiUrl = environment.apiUrl;

  constructor(public http: HttpClient) { }

  obterSoftwares(filtro = ''): Observable<Software[]> {
    const url = `${this.apiUrl}softwares?filtro=${filtro}`;

    return this.http.get<BaseResponse<Software>>(url).pipe(
      map((response: BaseResponse<Software>) => <Software[]>response.data)
    )
  }

  obterSoftwareLicencas(id: string): Observable<Software>{
    const url = `${this.apiUrl}softwares/${id}/detalhes`

    return this.http.get<BaseResponse<Software>>(url).pipe(
      map((response: BaseResponse<Software>) => <Software>response.data)
    )
  }

  salvarSoftware(software: Software): Observable<void> {
    const url = `${this.apiUrl}softwares`;

    return this.http.post<void>(url, software);
  }

  alterarSoftware(id: string, software: Software): Observable<void> {
    const url = `${this.apiUrl}softwares/${id}`;

    return this.http.put<void>(url, software);
  }

  excluirSoftware(id: string): Observable<void> {
    const url = `${this.apiUrl}softwares/${id}`;

    return this.http.delete<void>(url);
  }
}
