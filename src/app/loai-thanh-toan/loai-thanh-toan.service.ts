import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { environment } from 'src/environments/environment';
import { LoaiThanhToan } from './loai-thanh-toan';

@Injectable({
  providedIn: 'root'
})
export class LoaiThanhToanService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getLoaiThanhToans(): Observable<LoaiThanhToan[]> {
    return this.http.get<LoaiThanhToan[]>(`${this.apiServerUrl}/loaithanhtoan/all`);
  }

  public addLoaiThanhToan(loaiThanhToan: LoaiThanhToan): Observable<LoaiThanhToan> {
    return this.http.post<LoaiThanhToan>(`${this.apiServerUrl}/loaithanhtoan/add`, loaiThanhToan);
  }

  public updateLoaiThanhToan(loaiThanhToan: LoaiThanhToan): Observable<LoaiThanhToan> {
    return this.http.put<LoaiThanhToan>(`${this.apiServerUrl}/loaithanhtoan/update`, loaiThanhToan);
  }

  public deleteLoaiThanhToan(loaiThanhToanId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/loaithanhtoan/delete/${loaiThanhToanId}`);
  }
}
