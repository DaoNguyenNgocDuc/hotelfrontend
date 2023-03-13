import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { environment } from 'src/environments/environment';
import { CTHD } from './cthd';
@Injectable({
  providedIn: 'root'
})
export class CthdService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getCthds(): Observable<CTHD[]> {
    return this.http.get<CTHD[]>(`${this.apiServerUrl}/cthd/all`);
  }

  public addCthd(cthd: CTHD): Observable<CTHD> {
    return this.http.post<CTHD>(`${this.apiServerUrl}/cthd/add`, cthd);
  }

  // public updateCthd(cthd: CTHD): Observable<CTHD> {
  //   return this.http.put<CTHD>(`${this.apiServerUrl}/cthd/update`, cthd);
  // }

  public deleteCthd(id_hd: number, id_pdp: number, id_p: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/cthd/delete/${id_hd}/${id_pdp}/${id_p}`);
  }
}
