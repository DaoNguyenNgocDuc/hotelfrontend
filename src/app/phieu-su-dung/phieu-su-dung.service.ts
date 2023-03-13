import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { environment } from 'src/environments/environment';
import { PhieuSuDung } from './phieu-su-dung';
@Injectable({
  providedIn: 'root'
})
export class PhieuSuDungService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getPhieuSuDungs(): Observable<PhieuSuDung[]> {
    return this.http.get<PhieuSuDung[]>(`${this.apiServerUrl}/phieusudung/all`);
  }

  public addPhieuSuDung(phieuSuDung: PhieuSuDung): Observable<PhieuSuDung> {
    return this.http.post<PhieuSuDung>(`${this.apiServerUrl}/phieusudung/add`, phieuSuDung);
  }

  public updatePhieuSuDung(phieuSuDung: PhieuSuDung): Observable<PhieuSuDung> {
    return this.http.put<PhieuSuDung>(`${this.apiServerUrl}/phieusudung/update`, phieuSuDung);
  }

  public deletePhieuSuDung(phieuSuDungId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/phieusudung/delete/${phieuSuDungId}`);
  }
}
