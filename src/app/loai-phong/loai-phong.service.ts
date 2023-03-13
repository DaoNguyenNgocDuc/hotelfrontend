import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoaiPhong } from './loai-phong';

@Injectable({
  providedIn: 'root'
})
export class LoaiPhongService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getLoaiPhongs(): Observable<LoaiPhong[]> {
    return this.http.get<LoaiPhong[]>(`${this.apiServerUrl}/loaiphong/all`);
  }

  public addLoaiPhong(loaiPhong: LoaiPhong): Observable<LoaiPhong> {
    return this.http.post<LoaiPhong>(`${this.apiServerUrl}/loaiphong/add`, loaiPhong);
  }

  public updateLoaiPhong(loaiPhong: LoaiPhong): Observable<LoaiPhong> {
    return this.http.put<LoaiPhong>(`${this.apiServerUrl}/loaiphong/update`, loaiPhong);
  }

  public deleteLoaiPhong(loaiPhongId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/loaiphong/delete/${loaiPhongId}`);
  }
}
