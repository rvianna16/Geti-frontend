import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Software } from '../models/software';

@Injectable({
  providedIn: 'root'
})
export class SoftwaresService {
  protected apiUrl = environment.apiUrl;

  constructor(public http: HttpClient) { }

  obterSoftwares(): Observable<Software[]> {
    const url = `${this.apiUrl}softwares`;

    return this.http.get<Software[]>(url).pipe(
      map((response: any) => response.data)
    )
  }

  obterSoftwareLicencas(id: string): Observable<Software>{
    const url = `${this.apiUrl}softwares/${id}/detalhes`

    return this.http.get<Software>(url).pipe(
      map((response: any) => response.data)
    )
  }

  salvarSoftware(software: Software): Observable<any> {
    const url = `${this.apiUrl}softwares`;

    return this.http.post(url, software);
  }

  alterarSoftware(id: string, software: Software): Observable<any> {
    const url = `${this.apiUrl}softwares/${id}`;

    return this.http.put(url, software);
  }

  excluirSoftware(id: string): Observable<any> {
    const url = `${this.apiUrl}softwares/${id}`;

    return this.http.delete(url);
  }
}
