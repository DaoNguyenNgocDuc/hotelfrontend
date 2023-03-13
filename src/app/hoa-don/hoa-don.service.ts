import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { environment } from 'src/environments/environment';
import { HoaDon } from './hoa-don';
@Injectable({
  providedIn: 'root'
})
export class HoaDonService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getHoaDons(): Observable<HoaDon[]> {
    return this.http.get<HoaDon[]>(`${this.apiServerUrl}/hoadon/all`);
  }

  public addHoaDon(hoaDon: HoaDon): Observable<HoaDon> {
    return this.http.post<HoaDon>(`${this.apiServerUrl}/hoadon/add`, hoaDon);
  }

  public updateHoaDon(hoaDon: HoaDon): Observable<HoaDon> {
    return this.http.put<HoaDon>(`${this.apiServerUrl}/hoadon/update`, hoaDon);
  }

  public deleteHoaDon(hoaDonId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/hoadon/delete/${hoaDonId}`);
  }
}
