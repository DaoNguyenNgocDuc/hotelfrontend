import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { environment } from 'src/environments/environment';
import { ChucVu } from './chuc-vu';

@Injectable({
  providedIn: 'root'
})
export class ChucVuService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getChucVus(): Observable<ChucVu[]> {
    return this.http.get<ChucVu[]>(`${this.apiServerUrl}/chucvu/all`);
  }

  public addChucVu(chucVu: ChucVu): Observable<ChucVu> {
    return this.http.post<ChucVu>(`${this.apiServerUrl}/chucvu/add`, chucVu);
  }

  public updateChucVu(chucVu: ChucVu): Observable<ChucVu> {
    return this.http.put<ChucVu>(`${this.apiServerUrl}/chucvu/update`, chucVu);
  }

  public deleteChucVu(chucVuId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/chucvu/delete/${chucVuId}`);
  }
}
