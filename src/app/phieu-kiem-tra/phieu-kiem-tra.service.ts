import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { environment } from 'src/environments/environment';
import { PhieuKiemTra } from './phieu-kiem-tra';

@Injectable({
  providedIn: 'root'
})
export class PhieuKiemTraService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getPhieuKiemTras(): Observable<PhieuKiemTra[]> {
    return this.http.get<PhieuKiemTra[]>(`${this.apiServerUrl}/phieukt/all`);
  }

  public addPhieuKiemTra(phieukt: PhieuKiemTra): Observable<PhieuKiemTra> {
    return this.http.post<PhieuKiemTra>(`${this.apiServerUrl}/phieukt/add`, phieukt);
  }

  public updatePhieuKiemTra(phieukt: PhieuKiemTra): Observable<PhieuKiemTra> {
    return this.http.put<PhieuKiemTra>(`${this.apiServerUrl}/phieukt/update`, phieukt);
  }

  public deletePhieuKiemTra(phieuktId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/phieukt/delete/${phieuktId}`);
  }
}
