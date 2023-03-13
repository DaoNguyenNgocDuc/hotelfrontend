import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { environment } from 'src/environments/environment';
import { KhachHang } from './khach-hang';
@Injectable({
  providedIn: 'root'
})
export class KhachHangService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getKhachHangs(): Observable<KhachHang[]> {
    return this.http.get<KhachHang[]>(`${this.apiServerUrl}/khachhang/all`);
  }

  public addKhachHang(khachHang: KhachHang): Observable<KhachHang> {
    return this.http.post<KhachHang>(`${this.apiServerUrl}/khachhang/add`, khachHang);
  }

  public updateKhachHang(khachHang: KhachHang): Observable<KhachHang> {
    return this.http.put<KhachHang>(`${this.apiServerUrl}/khachhang/update`, khachHang);
  }

  public deleteKhachHang(khachHangId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/khachhang/delete/${khachHangId}`);
  }
}
