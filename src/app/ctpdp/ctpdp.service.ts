import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { environment } from 'src/environments/environment';
import { CTPDP } from './ctpdp';
@Injectable({
  providedIn: 'root'
})
export class CtpdpService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getCtpdps(): Observable<CTPDP[]> {
    return this.http.get<CTPDP[]>(`${this.apiServerUrl}/ctpdp/all`);
  }

  public addCtpdp(ctpdp: CTPDP): Observable<CTPDP> {
    return this.http.post<CTPDP>(`${this.apiServerUrl}/ctpdp/add`, ctpdp);
  }

  // public updateCtpdp(ctpdp: CTPDP): Observable<CTPDP> {
  //   return this.http.put<CTPDP>(`${this.apiServerUrl}/ctpdp/update`, ctpdp);
  // }

  public deleteCtpdp(id_pdp: number,id_p: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/ctpdp/delete/${id_pdp}/${id_p}`);
  }
}
