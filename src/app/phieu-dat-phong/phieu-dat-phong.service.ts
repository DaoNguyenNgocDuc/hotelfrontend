import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PhieuDatPhong } from './phieu-dat-phong';
@Injectable({
  providedIn: 'root'
})
export class PhieuDatPhongService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getPhieuDatPhongs(): Observable<PhieuDatPhong[]> {
    return this.http.get<PhieuDatPhong[]>(`${this.apiServerUrl}/phieudat/all`);
  }

  public addPhieuDatPhong(phieuDatPhong: PhieuDatPhong): Observable<PhieuDatPhong> {
    return this.http.post<PhieuDatPhong>(`${this.apiServerUrl}/phieudat/add`, phieuDatPhong);
  }

  public updatePhieuDatPhong(phieuDatPhong: PhieuDatPhong): Observable<PhieuDatPhong> {
    return this.http.put<PhieuDatPhong>(`${this.apiServerUrl}/phieudat/update`, phieuDatPhong);
  }

  public deletePhieuDatPhong(phieuDatPhongId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/phieudat/delete/${phieuDatPhongId}`);
  }
}
