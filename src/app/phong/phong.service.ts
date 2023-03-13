import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { environment } from 'src/environments/environment';
import { Phong } from './phong';
@Injectable({
  providedIn: 'root'
})
export class PhongService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getPhongs(): Observable<Phong[]> {
    return this.http.get<Phong[]>(`${this.apiServerUrl}/phong/all`);
  }

  public addPhong(phong: Phong): Observable<Phong> {
    return this.http.post<Phong>(`${this.apiServerUrl}/phong/add`, phong);
  }

  public updatePhong(phong: Phong): Observable<Phong> {
    return this.http.put<Phong>(`${this.apiServerUrl}/phong/update`, phong);
  }

  public deletePhong(phongId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/phong/delete/${phongId}`);
  }
}
