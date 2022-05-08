import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { BaseResponse } from 'src/app/shared/models/base-response';
import { environment } from 'src/environments/environment';
import { Contagens } from '../models/contagens';

@Injectable({
  providedIn: 'root'
})
export class ContagensService {
  protected apiUrl = environment.apiUrl;

  constructor(public http: HttpClient) { }

  obterContagens(): Observable<Contagens>{
    const url = `${this.apiUrl}contagens`;

    return this.http.get<BaseResponse<Contagens>>(url).pipe(
      map((response: BaseResponse<Contagens>) => <Contagens>response.data)
    )
  }
}
