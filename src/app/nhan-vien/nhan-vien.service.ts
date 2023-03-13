import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { environment } from 'src/environments/environment';
import { NhanVien } from './nhan-vien';
@Injectable({
  providedIn: 'root'
})
export class NhanVienService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getNhanViens(): Observable<NhanVien[]> {
    return this.http.get<NhanVien[]>(`${this.apiServerUrl}/nhanvien/all`);
  }

  public addNhanVien(nhanVien: NhanVien): Observable<NhanVien> {
    return this.http.post<NhanVien>(`${this.apiServerUrl}/nhanvien/add`, nhanVien);
  }

  public updateNhanVien(nhanVien: NhanVien): Observable<NhanVien> {
    return this.http.put<NhanVien>(`${this.apiServerUrl}/nhanvien/update`, nhanVien);
  }

  public deleteNhanVien(nhanVienId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/nhanvien/delete/${nhanVienId}`);
  }
}
