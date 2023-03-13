import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { environment } from 'src/environments/environment';
import { PhieuDenBu } from './phieu-den-bu';

@Injectable({
  providedIn: 'root'
})
export class PhieuDenBuService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getPhieuDenBus(): Observable<PhieuDenBu[]> {
    return this.http.get<PhieuDenBu[]>(`${this.apiServerUrl}/phieudenbu/all`);
  }

  public addPhieuDenBu(phieuDenBu: PhieuDenBu): Observable<PhieuDenBu> {
    return this.http.post<PhieuDenBu>(`${this.apiServerUrl}/phieudenbu/add`, phieuDenBu);
  }

  public updatePhieuDenBu(phieuDenBu: PhieuDenBu): Observable<PhieuDenBu> {
    return this.http.put<PhieuDenBu>(`${this.apiServerUrl}/phieudenbu/update`, phieuDenBu);
  }

  public deletePhieuDenBu(phieuDenBuId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/phieudenbu/delete/${phieuDenBuId}`);
  }
}
