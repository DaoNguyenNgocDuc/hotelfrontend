import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DichVu } from './dich-vu';

@Injectable({
  providedIn: 'root'
})
export class DichVuService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getDichVus(): Observable<DichVu[]> {
    return this.http.get<DichVu[]>(`${this.apiServerUrl}/dichvu/all`);
  }

  public addDichVu(dichVu: DichVu): Observable<DichVu> {
    return this.http.post<DichVu>(`${this.apiServerUrl}/dichvu/add`, dichVu);
  }

  public updateDichVu(dichVu: DichVu): Observable<DichVu> {
    return this.http.put<DichVu>(`${this.apiServerUrl}/dichvu/update`, dichVu);
  }

  public deleteDichVu(dichVuId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/dichvu/delete/${dichVuId}`);
  }
}
